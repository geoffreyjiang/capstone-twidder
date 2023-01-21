from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user_id.id')), nullable=False)
    tweet_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tweets.id')))

    liked_tweet = db.relationship("Tweet", back_populates='tweet_liked')
    liked_user = db.relationship("User", back_populates='like')

    def __repr__(self):
        return f"<Reply id: {self.id}, user_id: {self.user_id}, tweet_id: {self.tweet_id}, reply_id:{self.reply_id}>"


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "tweet_id": self.tweet_id,
            "reply_id": self.reply_id
        }
