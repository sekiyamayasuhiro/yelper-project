from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo, Length
from app.models import User


def user_exists(form, field):
    if form.errors.get('email'):
        return  # If email already has errors (like invalid format), skip this validator

    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    if form.errors.get('username'):
        return  # If email already has errors (like invalid format), skip this validator

    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    username = StringField(
        'username', validators=[DataRequired(), username_exists, Length(min=4, message="Username must be at least 4 characters")])
    email = StringField('email', validators=[DataRequired(), user_exists, Email(message="Please enter a valid email")])
    password = StringField('password', validators=[DataRequired(), Length(min=4, message="Password must be at least 4 characters")])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password', message="Passwords do not match. Please re-enter your password.")])
