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


@lm.user_loader
def load_user(u_id):
	return User.query.get(int(u_id))


users_products = db.Table('likes', db.Column('user_id', db.Integer, db.ForeignKey('users.id')), db.Column('product_id', db.Integer, db.ForeignKey('product.id')))


class User(UserMixin, db.Model):
	__tablename__ = 'users'
	id = db.Column(db.Integer, primary_key=True)
	social_id = db.Column(db.String(64), unique=True)
	name = db.Column(db.String(64))
	email = db.Column(db.String(80))
	admin = db.Column(db.Boolean)
	pw_hash = db.Column(db.String(200))
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
	user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
	name = db.Column(db.String(30))
	image = db.Column(db.String(80))
	description = db.Column(db.String(200))
	supplier = db.Column(db.String(30))
	published = db.Column(db.Boolean, default=False)
	pub_date = db.Column(db.DateTime)
	users = db.relationship(
		'User',
		secondary=users_products,
		lazy='joined',
		back_populates="products")

	def __init__(self, user_id, name, image, description, supplier, published=False, pub_date=None):
		self.user_id = user_id
		self.name = name
		self.image = image
		self.description = description
		self.supplier = supplier
		self.published = published
		if pub_date is None:
			pub_date = datetime.utcnow()
		self.pub_date = pub_date

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
	if not (user or product):
		flash('User or product could not be found')
		abort(401)
	product.users.append(user)
	db.session.add(product)
	db.session.commit()
	product = Product.query.get(product_id)
	likes = []
	[likes.append(u.id) for u in product.users]
	product = product.serialize()
	product['likes'] = likes
	return jsonify({'product': product}), 201


@app.route('/users/', methods=['GET'])
def get_users():
	users = []
	for p in User.query.all():
		users.append(p.serialize())
	return jsonify({'users': users})

@app.route('/users/<int:id>/')
def get_user(id):
	return jsonify({'user': User.query.get(id).serialize()})

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


@app.route('/images/<filename>')
def uploaded_file(filename):
	return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


@app.route('/products/', methods=['GET', 'POST'])
def get_post_products():
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
		image = get_image_url(request.files)
		prod = Product(1, request.form['name'], image, request.form['description'], request.form['supplier'])
		db.session.add(prod)
		db.session.commit()
		return jsonify({'product': prod.serialize()}), 201


@app.route('/products/<p_id>/', methods=['GET', 'DELETE', 'PUT'])
def get_del_put_product(p_id):
	if request.method == 'GET':
		products = []
        for p in Product.query.all():
            likes = []
            [likes.append(u.id) for u in p.users]
            product = p.serialize()
            product['likes'] = likes
            products.append(product)
        return jsonify({'products': products})
	if request.method == 'DELETE':
		db.session.delete(Product.query.get(p_id))
		db.session.commit()
		return jsonify({'result': True})

	if request.method == 'PUT':
		data = json.loads(request.data)
		user = User.query.get(data['user_id'])
		if user.admin:
			prod = Product.query.get(p_id)
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


@app.route('/me')
def me():
	if not current_user.is_authenticated:
		return jsonify({'user': {}})
	user = {
		'name': current_user.__getattr__('name'),
		'social_id': current_user.__getattr__('social_id'),
		'id': current_user.__getattr__('id'),
		'email': current_user.__getattr__('email')
	}
	return jsonify({'user': user})


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
	if User.query.filter_by(email=email).first() is not None:
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
		return jsonify({'user':user.serialize()})
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
	app.run(debug=True, threaded=True)
