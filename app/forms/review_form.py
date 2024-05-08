from flask_wtf import FlaskForm
from wtforms import SelectField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Length

class ReviewForm(FlaskForm):
    rating = SelectField('Rating',
                        choices=[
                            ('1', '1 - Run away!'),
                            ('2', '2 - Just okay!'),
                            ('3', '3 - Average!'),
                            ('4', '4 - Good!'),
                            ('5', '5 - Amazing!')],
                        validators=[DataRequired()],
                        coerce=int)  # This is used here so that the data returned is an integer
    review_text = TextAreaField('Review Text', validators=[DataRequired(), Length(min=100, max=255, message='Review must be between 100 and 255 characters')])
    submit = SubmitField('Submit Review')
