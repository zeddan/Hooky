<<<<<<< 5c6ec6b242626ed68beabf1f3a334978a624356c
from flask import Flask, jsonify, abort, request
from flask_sqlalchemy import SQLAlchemy
import json

app = Flask(__name__)
app.config.from_pyfile('config.py')
db = SQLAlchemy(app)
=======
from flask import Flask, redirect, url_for, flash

from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user,\
     current_user
from oauth import OAuthSignIn

app = Flask(__name__)
app.config['SECRET_KEY'] = 'top secret!'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['OAUTH_CREDENTIALS'] = {
    'linkedin': {
        'id': '',
        'secret': ''
    }
}

db = SQLAlchemy(app)
lm = LoginManager(app)
lm.login_view = 'index'


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    social_id = db.Column(db.String(64), nullable=False, unique=True)
    nickname = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(64), nullable=True)


@lm.user_loader
def load_user(id):
    return User.query.get(int(id))
>>>>>>> Add basic LinkedIn login functionality

class User(db.Model):
    __tablename__='users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    email = db.Column(db.String(80))
    admin = db.Column(db.Boolean)

    def __init__(self, name, email, admin):
        self.name = name
        self.email = email
        self.admin = admin

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
                'id':self.id,
                'name':self.name,
                'image':self.image,
                'description':self.description,
                'published':self.published,
        }

db.create_all()

@app.route('/users/', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        return jsonify({'users':User.query.all()})

@app.route('/users/<int:id>/')
def get_user(id):
    return jsonify({'user':User.query.get(id)})

@app.route('/products/', methods=['GET', 'POST'])
def products():
    if request.method == 'GET':
        prods = {}
        pb = []
        print(Product.query.all())
        for p in Product.query.all():
            pb.append(p.serialize())
        return jsonify({'products': pb}) 
    if request.method == 'POST':
        prod = Product(request.json.get('name',''), request.json.get('image',''), request.json.get('description',''), request.json.get('published',''))
        db.session.add(prod)
        db.session.commit()
        return jsonify( { 'product': prod.serialize() }), 201

@app.route('/products/<int:id>/', methods=['GET', 'DELETE', 'PUT'])
def product(id):
    if request.method == 'GET':
        return jsonify({'product': Product.query.get(id).serialize()})

    if request.method == 'DELETE':
        db.session.delete(Product.query.get(id))
        db.session.commit()
        return jsonify( {'result' : True} )

    if request.method == 'PUT':
        prod = Product.query.get(id)
        prod.name = request.json.get('name', prod.name)
        prod.image = request.json.get('image', prod.image)
        prod.description = request.json.get('description', prod.description)
        prod.published = request.json.get('published', prod.published)
        db.session.commit()
        return jsonify( {'product': prod.serialize() })

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
    social_id, username, email = oauth.callback()
    if social_id is None:
        flash('Authentication failed.')
        return redirect(url_for('index'))
    user = User.query.filter_by(social_id=social_id).first()
    if not user:
        user = User(social_id=social_id, nickname=username, email=email)
        db.session.add(user)
        db.session.commit()
    login_user(user, True)
    return redirect(url_for('index'))


if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)

