from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Tweet, db, Reply, Like
from app.forms import TweetForm, ReplyForm


reply_route = Blueprint('reply', __name__, )


@reply_route.route('/<int:id>', methods=['PUT'])
@login_required
def edit_reply(id):
    reply = Reply.query.get(id)
    form = ReplyForm()

    reply.body = form.data['body']
    reply.image = form.data['image']

    db.session.commit()

    return reply.to_dict()

@reply_route.route('/<int:id>', methods=['DELETE'])
def deleteReview(id):
    reply_delete = Reply.query.get(id)
    db.session.delete(reply_delete)
    db.session.commit()
    return {"message": "deleted successfully"}

@reply_route.route('/<int:id>')
def get_reply_by_id(id):

    tweet = Reply.query.get(id)

    return tweet.to_dict()
