from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField
from wtforms.validators import Optional

class SearchForm(FlaskForm):
    name = StringField('Business Name', validators=[Optional()])
    category = SelectField('Category',
                            choices=[
                                ('', 'All Categories'),
                                ('Restaurant', 'Restaurant'),
                                ('Coffee', 'Coffee'),
                                ('Gym', 'Gym'),
                                ('Salon', 'Salon')],
                            validators=[Optional()])
    price_level = SelectField('Price Level',
                            choices=[
                            ('', 'Any Price'),
                            ('1', '$'),
                            ('2', '$$'),
                            ('3', '$$$'),
                            ('4', '$$$$')],
                            validators=[Optional()])
    submit = SubmitField('Search')
