from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    if form.errors.get('email'):
        return  # If email already has errors (like invalid format), skip this validator

    email = field.data
    user = User.query.filter_by(email=email).first()

    if not user:
        raise ValidationError('Email provided not found.')

    # Store the user in the form for later use
    form.user = user


def password_matches(form, field):
    user = getattr(form, 'user', None)
    password = field.data

    if user and not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email(message='Invalid email address.'), user_exists])
    password = StringField('Password', validators=[DataRequired(), password_matches])
