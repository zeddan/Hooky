from flask import Flask, jsonify, request, redirect, url_for, flash, abort, \
        json, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from oauth import OAuthSignIn
from flask_login import LoginManager, UserMixin, login_user, logout_user, \
        current_user
from werkzeug.security import generate_password_hash, \
        check_password_hash
from flask_cors import CORS
from werkzeug.utils import secure_filename
from datetime import datetime
import os
import time

app = Flask(__name__)
app.config.from_pyfile('config.py')
db = SQLAlchemy(app)
lm = LoginManager(app)
lm.login_view = 'index'
CORS(app)

url = 'http://localhost:5000'
hooky_url = 'http://localhost:8080'


@lm.user_loader
def load_user(u_id):
    return User.query.get(int(u_id))


@app.after_request
def apply_caching(response):
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response


users_products = db.Table('likes', db.Column('user_id', db.Integer, db.ForeignKey('users.id')), db.Column('product_id', db.Integer, db.ForeignKey('product.id')))


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    social_id = db.Column(db.String(64), unique=True)
    name = db.Column(db.String(64))
    company = db.Column(db.String(64))
    delivers_to = db.Column(db.String(100))
    email = db.Column(db.String(80))
    about = db.Column(db.String(500))
    zipcode = db.Column(db.String(10))
    admin = db.Column(db.Boolean)
    pw_hash = db.Column(db.String(200))
    added_products = db.relationship(
        'Product',
        back_populates="added_by")
    products = db.relationship(
        'Product',
        secondary=users_products,
        lazy='joined',
        back_populates="users")

    def __init__(self, name, email, admin=False, social_id=None):
        self.social_id = social_id
        self.name = name
        self.email = email
        self.admin = admin

    def __repr__(self):
        return str(self.serialize())

    def set_password(self, password):
        self.pw_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.pw_hash, password)

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return unicode(self.id)

    def serialize(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    added_by = db.relationship('User',
                               uselist=False,back_populates='added_products')
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    name = db.Column(db.String(30))
    image = db.Column(db.String(80))
    description = db.Column(db.String(200))
    supplier = db.Column(db.String(30))
    supplier_description = db.Column(db.String(500))
    webpage = db.Column(db.String(80))
    phone = db.Column(db.String(40))
    email = db.Column(db.String(80))
    address = db.Column(db.String(100))
    published = db.Column(db.Boolean, default=False)
    pub_date = db.Column(db.DateTime)
    users = db.relationship(
        'User',
        secondary=users_products,
        lazy='joined',
        back_populates="products")

    def __init__(self, user_id, name, image, description, supplier,
                 supplier_description, webpage,
                 phone, email, address, published, pub_date=None):
        self.user_id = user_id
        self.name = name
        self.image = image
        self.description = description
        self.supplier_description = supplier_description
        self.supplier = supplier
        self.webpage = webpage
        self.phone = phone
        self.email = email
        self.address = address
        self.published = published
        if pub_date is None:
            pub_date = datetime.utcnow()
        self.pub_date = pub_date

    def __repr__(self):
        return str(self.serialize())

    def serialize(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


@app.route('/like/', methods=['POST', 'DELETE'])
def like():
    if not current_user.is_authenticated:
        abort(401)
    if request.method == 'POST':
        data = json.loads(request.data)
        user_id = current_user.__getattr__('id')
        product_id = data['product_id']
        user = User.query.filter_by(id=user_id).first()
        product = Product.query.filter_by(id=product_id).first()
        if not (user or product):
            flash('User or product could not be found')
            abort(401)
        product.users.append(user)
        db.session.add(product)
        db.session.commit()
        likes = []
        [likes.append({'user':u.serialize()}) for u in product.users]
        product = product.serialize()
        product['likes'] = likes
        return jsonify({'product': product}), 201
    if request.method == 'DELETE':
        data = json.loads(request.data)
        product_id = data['product_id']
        product = Product.query.filter_by(id=product_id).first()
        user_id = current_user.__getattr__('id')
        user = User.query.filter_by(id=user_id).first()
        if not (user or product):
            flash('User or product could not be found')
            abort(401)
        product.users.remove(user)
        db.session.commit()
        likes = []
        [likes.append({'user':u.serialize()}) for u in product.users]
        product = product.serialize()
        product['likes'] = likes
        return jsonify({'product': product}), 201


@app.route('/users/', methods=['GET'])
def get_users():
    users = []
    for p in User.query.all():
        users.append(p.serialize())
    return jsonify({'users': users})

@app.route('/users/<int:id>/', methods=['GET', 'PUT'])
def get_put_user(id):
    if request.method == 'GET':
        return jsonify({'user': User.query.get(id).serialize()})
    if request.method == 'PUT':
        user = User.query.get(id)
        user.name = request.json.get('name', user.name)
        user.company = request.json.get('company', user.company)
        user.delivers_to = request.json.get('delivers_to', user.delivers_to)
        user.admin = request.json.get('admin', user.admin)
        user.zipcode = request.json.get('zipcode', user.zipcode)
        user.about = request.json.get('about', user.about)
        db.session.commit()
        return jsonify({'user':user.serialize()}), 201

def append_time(filename):
    name, ext = os.path.splitext(filename)
    return "{name}_{time}{ext}".format(name=name, time=time.strftime("%Y%m%d-%H%M%S"), ext=ext)


def get_image_url(files):
    # check if the post request has the file part
    if 'file' not in files:
        flash('No file part')
        return ''
    image = files['file']
    # if user does not select file, browser also
    # submit a empty part without filename
    if image.filename == '':
        flash('No selected file')
        return ''
    if image and allowed_file(image.filename):
        filename = secure_filename(image.filename)
        filename = append_time(filename)
        image.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        print(filename)
        return url + url_for('uploaded_file', filename=filename)


def allowed_file(filename):
    return '.' in filename and \
            filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

@app.route('/images/', methods=['POST'])
def upload_file():
    return jsonify({'image': get_image_url(request.files)}), 201

@app.route('/images/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/products/', methods=['GET', 'POST'])
def get_post_products():
    if request.method == 'GET':
        products = []
        for p in Product.query.all():
            likes = []
            [likes.append({'user':u.serialize()}) for u in p.users]
            product = p.serialize()
            product['added_by'] = p.added_by.serialize()
            product['likes'] = likes
            products.append(product)
        return jsonify({'products': products})
    if request.method == 'POST':
        if not current_user.is_authenticated:
                    abort(401)
        image = get_image_url(request.files)
        user_id = current_user.__getattr__('id')
        user = User.query.filter_by(id=user_id).first()
        prod = Product(1, request.form['name'], image, \
                       request.form['description'], request.form['supplier'],\
                       request.form['supplier_description'], request.form['webpage'], request.form['phone'],\
                       request.form['email'], request.form['address'], False)
        prod.added_by = user
        db.session.add(prod)
        db.session.commit()
        return jsonify({'product': prod.serialize()}), 201


@app.route('/products/<p_id>/', methods=['GET', 'DELETE', 'PUT'])
def get_del_put_product(p_id):
    if request.method == 'GET':
        prod = Product.query.get(p_id)
        likes = []
        [likes.append({'user':u.serialize()}) for u in prod.users]
        product = prod.serialize()
        product['likes'] = likes
        product['added_by'] = prod.added_by.serialize() 
        return jsonify({'product': product})
    if request.method == 'DELETE':
        db.session.delete(Product.query.get(p_id))
        db.session.commit()
        return jsonify({'result': True})
    if request.method == 'PUT':
        prod = Product.query.get(p_id)
        prod.name = request.json.get('name','')
        prod.image = request.json.get('image','')
        prod.description = request.json.get('description','')
        prod.supplier = request.json.get('supplier','')
        prod.supplier_description = request.json.get('supplier_description','')
        prod.webpage = request.json.get('webpage','')
        prod.phone = request.json.get('phone','')
        prod.email = request.json.get('email','')
        prod.address = request.json.get('address','')
        prod.published = request.json.get('published')
        db.session.commit()
        return jsonify({'product': prod.serialize()})


@app.route('/')
def index():
    return "it worksss"


@app.route('/me')
def me():
    if not current_user.is_authenticated:
        return jsonify({'user': {}})
    user = {
        'name': current_user.__getattr__('name'),
        'company': current_user.__getattr__('company'),
        'delivers_to': current_user.__getattr__('delivers_to'),
        'social_id': current_user.__getattr__('social_id'),
        'id': current_user.__getattr__('id'),
        'email': current_user.__getattr__('email'),
        'admin': current_user.__getattr__('admin'),
        'zipcode': current_user.__getattr__('zipcode'),
        'about': current_user.__getattr__('about')
    }
    return jsonify({'user': user})


@app.route('/logout')
def logout():
    logout_user()
    return jsonify({'user_id': {}})


@app.route('/register', methods=['POST'])
def register():
    # user = User.query.filter_by(id=1).first()
    # return jsonify({'user': user.serialize()})
    data = json.loads(request.data)
    email = data['email']
    password = data['password']
    name = data['name']
    if email is None or password is None:
        abort(400)
    if User.query.filter_by(email=email).first() is not None:
        abort(403)
    user = User(name, email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    login_user(user, True)
    return jsonify({'user': user.serialize()})


@app.route('/login', methods=['POST'])
def login():
    data = json.loads(request.data)
    mail = data['email']
    password = data['password']
    user = User.query.filter_by(email=mail).first()
    if user and user.check_password(password):
        login_user(user, True)
        return jsonify({'user': user.serialize()})
    abort(401)


@app.route('/authorize/<provider>')
def oauth_authorize(provider):
    if not current_user.is_anonymous:
        return redirect(hooky_url)
    oauth = OAuthSignIn.get_provider(provider)
    return oauth.authorize()


@app.route('/callback/<provider>')
def oauth_callback(provider):
    if not current_user.is_anonymous:
        return redirect(hooky_url)
    oauth = OAuthSignIn.get_provider(provider)
    social_id, name, email = oauth.callback()
    if social_id is None:
        flash('Authentication failed.')
        return redirect(hooky_url)
    user = User.query.filter_by(social_id=social_id).first()
    if not user:
        user = User(social_id=social_id, name=name, email=email)
        db.session.add(user)
        db.session.commit()
    login_user(user, True)
    if user.admin is True:
        return redirect('http://localhost:8080/admin')
    return redirect('http://localhost:8080')


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True, threaded=True)
