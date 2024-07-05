from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helper import ALLOWED_EXTENSIONS

class ImageUploadForm(FlaskForm):
    image = FileField('Upload Image', validators=[
        FileRequired(message='File cannot be empty'),
        FileAllowed(ALLOWED_EXTENSIONS, 'Only images are allowed!')
    ])
