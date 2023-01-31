from app.models import Like
from flask_wtf import FlaskForm
from wtforms import BooleanField, IntegerField
from wtforms.validators import DataRequired

class LikeForm(FlaskForm):
    isLiked = BooleanField('isLiked')
    tweet_id = IntegerField('tweet_id')
    user_id = IntegerField('user_id')
