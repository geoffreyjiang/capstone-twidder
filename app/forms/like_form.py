from app.models import Like
from flask_wtf import FlaskForm
from wtforms import BooleanField
from wtforms.validators import DataRequired

class LikeForm(FlaskForm):
    isLiked = BooleanField('isLiked')
