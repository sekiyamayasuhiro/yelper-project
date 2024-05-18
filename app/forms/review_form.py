from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    user_id = IntegerField('User ID', validators=[DataRequired()])
    business_id = IntegerField('Business ID', validators=[DataRequired()])
    rating = IntegerField('Rating', validators=[DataRequired()])
    review_text = StringField('Review Text', validators=[DataRequired()])
    submit = SubmitField('Submit')
