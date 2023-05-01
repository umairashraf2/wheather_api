from flask import Blueprint,request, jsonify
from wheather_api.models import db
from flask_login import login_required, current_user

api = Blueprint('api', __name__, url_prefix='/api')

