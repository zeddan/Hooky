from flask import Flask, jsonify, json, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from oauth import OAuthSignIn
from flask_login import LoginManager, UserMixin, login_user, logout_user,\
     current_user
from werkzeug.security import generate_password_hash, \
     check_password_hash
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config.from_pyfile('config.py')
db = SQLAlchemy(app)
lm = LoginManager(app)
lm.login_view = 'index'
CORS(app)

@lm.user_loader
def load_user(id):
    return User.query.get(int(id))


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    social_id = db.Column(db.String(64), unique=True)
    name = db.Column(db.String(64))
    email = db.Column(db.String(80))
    admin = db.Column(db.Boolean)
    pw_hash = db.Column(db.String(200))

    def __init__(self, name, email, admin=False, social_id=None):
        self.social_id = social_id
        self.name = name
        self.email = email
        self.admin = admin

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
        return {
            'id': self.id,
            'social_id': self.social_id,
            'name': self.name,
            'email': self.email,
            'admin': self.admin
        }


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    name = db.Column(db.String(30))
    image = db.Column(db.String(80))
    description = db.Column(db.String(200))
    published = db.Column(db.Boolean, default=False)


    def __init__(self, user_id, name, image, description, published=False):
        self.user_id = user_id
        self.name = name
        self.image = image
        self.description = description
        self.published = published

    def serialize(self):
        return {
            'id': self.id,
            'user_id':self.user_id,
            'name': self.name,
            'image': self.image,
            'description': self.description,
            'published': self.published,
        }


@app.route('/users/', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        pb = []
        for p in User.query.all():
            pb.append(p.serialize())
        return jsonify({'users': pb})


@app.route('/users/<int:id>/')
def get_user(id):
    return jsonify({'user': User.query.get(id)})


@app.route('/products/', methods=['GET', 'POST'])
def products():
    if request.method == 'GET':
        pb = []
        print(Product.query.all())
        for p in Product.query.all():
            pb.append(p.serialize())
        return jsonify({'products': pb})
    if request.method == 'POST':
        data = json.loads(request.data)
        prod = Product(data['user_id'],data['name'], data['image'],
                       data['description'])
        db.session.add(prod)
        db.session.commit()
        return jsonify({'product': prod.serialize()}), 201


@app.route('/products/<int:id>/', methods=['GET', 'DELETE', 'PUT'])
def product(id):
    if request.method == 'GET':
        return jsonify({'product': Product.query.get(id).serialize()})

    if request.method == 'DELETE':
        db.session.delete(Product.query.get(id))
        db.session.commit()
        return jsonify({'result': True})

    if request.method == 'PUT':
        data = json.loads(request.data)
        user = User.query.get(data['user_id'])
        if user.admin == True:
            prod = Product.query.get(id)
            prod.name = data['name']
            prod.image = data['image']
            prod.description = data['description']
            prod.published = data['published']
            db.session.commit()
            return jsonify({'product': prod.serialize()})
        flash("NOt allowed")
        return redirect(url_for('index'))


@app.route('/')
def index():
    return "it worksss"


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/register', methods=['POST'])
def register():
    data = json.loads(request.data)
    email = data['email']
    password = data['password']
    name = data['name']
    if email is None or password is None:
        abort(400)
    if User.query.filter_by(email = email).first() is not None:
        abort(403)
    user = User(name, email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return redirect(url_for('index'))

@app.route('/login', methods=['POST'])
def login():
    data = json.loads(request.data)
    mail = data['email']
    password = data['password']
    user = User.query.filter_by(email=mail).first()
    if user is None:
        print('Authentication failed')
        return redirect(url_for('index'))
    if user.check_password(password):
        login_user(user, True)
        print("Logged in: " + user.name)
        return redirect('http://localhost:8080')
    flash('Bad password')
    return redirect(url_for('index'))

@app.route('/authorize/<provider>')
def oauth_authorize(provider):
    if not current_user.is_anonymous:
        return redirect(url_for('index'))
    oauth = OAuthSignIn.get_provider(provider)
    return oauth.authorize()


@app.route('/callback/<provider>')
def oauth_callback(provider):
    if not current_user.is_anonymous:
        return redirect(url_for('index'))
    oauth = OAuthSignIn.get_provider(provider)
    social_id, name, email = oauth.callback()
    if social_id is None:
        flash('Authentication failed.')
        return redirect(url_for('index'))
    user = User.query.filter_by(social_id=social_id).first()
    if not user:
        user = User(social_id=social_id, name=name, email=email)
        db.session.add(user)
        db.session.commit()
    login_user(user, True)
    return redirect('http://localhost:8080')


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
