from flask import Flask, jsonify, request, redirect, url_for, flash, abort
from flask_sqlalchemy import SQLAlchemy
from oauth import OAuthSignIn
from flask_login import LoginManager, UserMixin, login_user, logout_user,\
     current_user


app = Flask(__name__)
app.config.from_pyfile('config.py')
db = SQLAlchemy(app)
lm = LoginManager(app)
lm.login_view = 'index'


@lm.user_loader
def load_user(id):
    return User.query.get(int(id))


likes = db.Table('likes',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('product_id', db.Integer, db.ForeignKey('product.id'))
)


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    social_id = db.Column(db.String(64), unique=True)
    name = db.Column(db.String(64))
    email = db.Column(db.String(80))
    admin = db.Column(db.Boolean)
    products = db.relationship(
                'Product',
                secondary=likes,
                lazy='joined',
                back_populates="users")

    def __init__(self, name, email, social_id=None, admin=False):
        self.social_id = social_id
        self.name = name
        self.email = email
        self.admin = admin

    def __repr__(self):
        return str(self.serialize())

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
    name = db.Column(db.String(30))
    image = db.Column(db.String(80))
    description = db.Column(db.String(200))
    published = db.Column(db.Boolean)
    users = db.relationship(
                'User',
                secondary=likes,
                lazy='joined',
                back_populates="products")

    def __init__(self, name, image, description, published):
        self.name = name
        self.image = image
        self.description = description
        self.published = published

    def __repr__(self):
        return str(self.serialize())

    def serialize(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


@app.route('/like/', methods=['POST'])
def like():
    user_id = request.json['user_id']
    product_id = request.json['product_id']
    user = User.query.filter_by(id=user_id).first()
    product = Product.query.filter_by(id=product_id).first()
    print user
    print product
    if not (user or product):
        flash('User or product could not be found')
        abort(401)
    product.users.append(user)
    db.session.add(product)
    db.session.commit()
    return jsonify({'user': user.serialize()}), 201


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
        products = []
        for p in Product.query.all():
            likes = []
            [likes.append(u.id) for u in p.users]
            product = p.serialize()
            product['likes'] = likes
            products.append(product)
        return jsonify({'products': products})
    if request.method == 'POST':
        prod = Product(request.json.get('name',''), request.json.get('image',''), request.json.get('description',''), request.json.get('published',''))
        db.session.add(prod)
        db.session.commit()
        return jsonify({'product': prod.serialize()}), 201


@app.route('/products/<int:id>/', methods=['GET', 'DELETE', 'PUT'])
def product(id):
    if request.method == 'GET':
        product = Product.query.get(id)
        likes = []
        [likes.append(u.id) for u in product.users]
        product = product.serialize()
        product['likes'] = likes
        return jsonify({'product': product})

    if request.method == 'DELETE':
        db.session.delete(Product.query.get(id))
        db.session.commit()
        return jsonify({'result': True})

    if request.method == 'PUT':
        prod = Product.query.get(id)
        prod.name = request.json.get('name', prod.name)
        prod.image = request.json.get('image', prod.image)
        prod.description = request.json.get('description', prod.description)
        prod.published = request.json.get('published', prod.published)
        db.session.commit()
        return jsonify({'product': prod.serialize()})


@app.route('/')
def index():
    return "it worksss"


@app.route('/logout')
def logout():
    logout_user()
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
    return redirect(url_for('index'))


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
