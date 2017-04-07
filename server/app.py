from flask import Flask, jsonify, request, redirect, url_for, flash
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


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    social_id = db.Column(db.String(64), unique=True)
    name = db.Column(db.String(64))
    email = db.Column(db.String(80))
    admin = db.Column(db.Boolean)

    def __init__(self, name, email, social_id=None, admin=False):
        self.social_id = social_id
        self.name = name
        self.email = email
        self.admin = admin

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
    name = db.Column(db.String(30))
    image = db.Column(db.String(80))
    description = db.Column(db.String(200))
    published = db.Column(db.Boolean)

    def __init__(self, name, image, description, published):
        self.name = name
        self.image = image
        self.description = description
        self.published = published

    def serialize(self):
        return {
            'id': self.id,
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
        prod = Product(request.json.get('name',''), request.json.get('image',''), request.json.get('description',''), request.json.get('published',''))
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
