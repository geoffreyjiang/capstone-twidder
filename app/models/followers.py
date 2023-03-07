from .db import db, environment, SCHEMA, add_prefix_for_prod


if environment == "production":
    __table_args__ = {'schema': SCHEMA}

following = db.Table(
    'following',
    db.Column('main_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('followed_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
)



