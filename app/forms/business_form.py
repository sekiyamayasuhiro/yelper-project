from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, TextAreaField, SelectField, SubmitField
from wtforms.validators import DataRequired, Length, Optional, NumberRange, URL

class BusinessForm(FlaskForm):
    name = StringField('Business Name', validators=[DataRequired()])
    address = StringField('Address', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    country = StringField('Country', validators=[DataRequired()])
    postal_code = StringField('Postal Code', validators=[DataRequired(), Length(min=5, max=5, message='Postal code must be 5 digits')])
    # lat = DecimalField('Latitude', places=6, validators=[Optional(), NumberRange(min=-90.0, max=90.0)])
    # lng = DecimalField('Longitude', places=6, validators=[Optional(), NumberRange(min=-180.0, max=180.0)])
    category = SelectField('Category',
                            choices=[
                                ('', 'All Categories'),
                                ('Restaurant', 'Restaurant'),
                                ('Coffee', 'Coffee'),
                                ('Gym', 'Gym'),
                                ('Salon', 'Salon')],
                            validators=[Optional()])
    phone_number = StringField('Phone Number', validators=[DataRequired(), Length(min=10, max=10, message='Phone number must be 10 digits')])
    website = StringField('Website', validators=[DataRequired(), URL(message='Please provide a valid URL.')])
    description = TextAreaField('Description', validators=[DataRequired(), Length(max=1000)])
    price = SelectField('Price Level',
                        choices=[
                            ('1', '$'),
                            ('2', '$$'),
                            ('3', '$$$'),
                            ('4', '$$$$')],
                        validators=[DataRequired()])
    submit = SubmitField('Submit')
