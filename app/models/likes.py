from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    tweet_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tweets.id')), nullable=False)
    isLiked = db.Column(db.Boolean, default=False)

    liked_tweet = db.relationship("Tweet", back_populates='tweet_liked')
    liked_user = db.relationship("User", back_populates='like')

    def __repr__(self):
        return f"<user_id: {self.user_id}, tweet_id: {self.tweet_id}, isLiked: {self.isLiked}>"


    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "tweet_id": self.tweet_id,
            "isLiked": self.isLiked
        }
