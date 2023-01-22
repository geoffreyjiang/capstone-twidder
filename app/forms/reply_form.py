from app.models import Reply
from flask_wtf import FlaskForm
from wtforms import TextAreaField, StringField
from wtforms.validators import DataRequired

class ReplyForm(FlaskForm):
    body = TextAreaField('body', validators=[DataRequired()])
    image = StringField("image")
