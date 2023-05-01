from flask import Blueprint, render_template, url_for, redirect, request, jsonify, flash
from wheather_api.models import db,User
from flask_login import login_user, logout_user, login_required, current_user
import requests

site = Blueprint('site', __name__, template_folder='site_templates')



@site.route('/')
@login_required
def home():
    return render_template('home.html')


@site.route('/profile')
@login_required
def profile():
    return render_template('profile.html')