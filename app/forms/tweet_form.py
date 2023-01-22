from app.models import Tweet
from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField
from wtforms.validators import DataRequired

class TweetForm(FlaskForm):
    body = TextAreaField('body', validators=[DataRequired()])
    image = StringField("image")
