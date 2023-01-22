from .db import db, environment, SCHEMA, add_prefix_for_prod

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    sending_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    receiving_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    body = db.Column(db.String, nullable=False)





    def __repr__(self):
        return f"<Reply id: {self.id}, body: {self.body}, sending_user_id: {self.sending_user_id}, receiving_user_id: {self.receiving_user_id}>"


    def to_dict(self):
        return {
            "id": self.id,
            "body": self.body,
            "sending_user_id": self.sending_user_id,
            "receiving_user_id": self.receiving_user_id,
        }
