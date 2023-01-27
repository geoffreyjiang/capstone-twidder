from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import  db, Reply, Like
from app.forms import  LikeForm


like_route = Blueprint('like', __name__, )


@like_route.route('/<int:id>', methods=['PUT'])
@login_required
def edit_like(id):
    like = Like.query.get(id)
    form = LikeForm()

    like.isLiked = form.data['isLiked']

    db.session.commit()

    return like.to_dict()
