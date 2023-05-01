from datetime import datetime
from flask_login import UserMixin,LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import uuid


db = SQLAlchemy()
ma = Marshmallow()
login_manager = LoginManager()

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

class User(UserMixin, db.Model):
    id = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()))
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    token = db.Column(db.String(128), unique=True, nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
