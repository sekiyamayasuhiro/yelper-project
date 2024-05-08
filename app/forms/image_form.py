from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, URL

class ImageForm(FlaskForm):
    image_url = StringField('Image URL', validators=[DataRequired(), URL(message='Please enter a valid URL')])
    submit = SubmitField('Submit Image')
