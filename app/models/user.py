from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .followers import following
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    firstName =  db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    profile_pic = db.Column(db.String(99999), nullable=True)
    bio = db.Column(db.String(140), nullable=True)
    background = db.Column(db.String(99999), nullable=True)


    tweet = db.relationship('Tweet', back_populates='tweet_owner', cascade='all, delete')
    reply = db.relationship('Reply', back_populates='reply_owner', cascade='all, delete')
    like = db.relationship('Like', back_populates='liked_user', cascade='all, delete')
    follows = db.relationship('User',
                            secondary=following,
                            primaryjoin=(following.c.main_id == id),
                            secondaryjoin=(following.c.followed_id == id),
                            backref=db.backref('following', lazy='dynamic'),
                            lazy='dynamic'
                            )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


    def to_dict_follower(self):
        return {
            "id": self.id,
            'username': self.username,
        }


    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'profile_pic': self.profile_pic,
            'bio': self.bio,
            'background': self.background,
            'follower': [users.to_dict_follower() for users in self.follows],
            'following': [users.to_dict_follower() for users in self.following]

        }
