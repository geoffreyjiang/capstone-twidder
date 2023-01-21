from .db import db, environment, SCHEMA, add_prefix_for_prod

class Tweet(db.Model):
    __tablename__ = 'tweets'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=True)
    reply_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('replies.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    tweet_owner = db.relationship("User", back_populates="tweet", cascade='all, delete')
    tweet_liked = db.relationship("Like", back_populates='liked_tweet', cascade='all, delete')


    def __repr__(self):
        return f"<Tweet id: {self.id}, body: {self.body}, image: {self.image}, reply_id: {self.reply_id}, user_id: {self.user_id}>"


    def to_dict(self):
        return {
            "id": self.id,
            "body": self.body,
            "image": self.image,
            "reply_id": self.reply_id,
            "user_id": self.user_id,
        }
