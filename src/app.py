"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from api.models import db, User, Product, OrderItems, Order
from itsdangerous import URLSafeTimedSerializer
from flask_mail import Mail, Message
from dotenv import load_dotenv
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

load_dotenv()
app = Flask(__name__)
CORS(app)
# MailTrap---------------------------------------------------------------------------------
# Configurar Flask-Mail
app.config['MAIL_SERVER']='live.smtp.mailtrap.io'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'api'
app.config['MAIL_PASSWORD'] = '952a491111751199c627448800f4231d'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

mail = Mail(app)

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')


app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Cambia esto por una clave secreta segura
jwt = JWTManager(app)

app.url_map.strict_slashes = False

db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "#"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

MIGRATE = Migrate(app, db)
db.init_app(app)


setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response
# Send-Mail------------------------------------------------------------
@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()
    msg = Message(subject='Hello from Mailtrap',
                  sender='eduloreto242@gmail.com',
                  recipients=[data['email']])
    msg.body = f'This is a test email sent from a Flask app using Mailtrap.'

    try:
        mail.send(msg)
        return jsonify({"msg": "Email sent successfully"}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500
# ResetPassword ------------------------------------------------------------
 # Initialize the serializer
serializer = URLSafeTimedSerializer(app.config['JWT_SECRET_KEY'])

def generate_reset_token(email):
    return serializer.dumps(email, salt='password-reset-salt')

def confirm_reset_token(token, expiration=3600):
    try:
        email = serializer.loads(token, salt='password-reset-salt', max_age=expiration)
    except:
        return False
    return email

def send_reset_email(email, token):
    reset_url = os.getenv('FRONTEND_URL') + '/reset-password?token=' + token
    msg = Message(subject='Baxter Shop - Password Reset Request',
                  sender='mailtrap@demomailtrap.com',
                  recipients=[email])
    msg.body = f'Your password reset link is {reset_url}'
    mail.send(msg)

@app.route('/request-reset', methods=['POST'])
def request_reset():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if user:
        token = generate_reset_token(user.email)
        send_reset_email(user.email, token)

    return jsonify({"message": "If the email is registered, you will receive a password reset email shortly."}), 200

@app.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    email = confirm_reset_token(data['token'])
    if not email:
        return jsonify({"message": "The token is invalid or expired."}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        user.password = generate_password_hash(data['password'])
        db.session.commit()
        return jsonify({"message": "Password reset successfully."}), 200
    return jsonify({"message": "User not found."}), 404

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)