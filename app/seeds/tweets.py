from app.models import db, Tweet, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    one = Tweet(
        body='First tweet!', image='null', user_id=2)
    two = Tweet(
        body='Second tweet!', image='null', user_id=3)
    three = Tweet(
        body='Third tweet!', image='null', user_id=1)

    db.session.add(one)
    db.session.add(two)
    db.session.add(three)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tweets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tweets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tweets")

    db.session.commit()
