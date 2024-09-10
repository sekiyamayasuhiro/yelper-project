from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, URL
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class ImageForm(FlaskForm):
    # image_url = StringField('Image URL', validators=[DataRequired(), URL(message='Please enter a valid URL')])
    # submit = SubmitField('Submit Image')
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Submit Image")
