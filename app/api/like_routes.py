from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import  db, Reply, Like
from app.forms import  LikeForm
from ..utils import Print

like_route = Blueprint('like', __name__, )



@like_route.route('/<int:id>')
def get_like_by_id(id):

    like = Like.query.get(id)

    return like.to_dict()


@like_route.route('/<int:id>', methods=['DELETE'])
def delete_like(id):
    current_user_id = int(current_user.get_id())
    like = Like.query.filter(Like.user_id == current_user_id, Like.id == id).first()
    db.session.delete(like)
    db.session.commit()
    return {"message": "deleted"}

