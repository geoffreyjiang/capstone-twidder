from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', firstName='demo', lastName="user", profile_pic='https://images.unsplash.com/photo-1675789652706-0f2a7a8fc5ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60', bio='yooo', background='https://cdn.pixabay.com/photo/2023/02/05/17/25/leaves-7770035__340.jpg')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', firstName='marnie', lastName="user", profile_pic='https://images.unsplash.com/photo-1675789652706-0f2a7a8fc5ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60', bio='sup', background='https://cdn.pixabay.com/photo/2023/01/21/13/39/night-sky-7733876__340.jpg')
    bobbie = User(
        username='elonmusk', email='bobbie@aa.io', password='password', firstName='Elon', lastName="user", profile_pic='https://cdn.pixabay.com/photo/2022/11/12/03/34/elon-reeve-musk-7586152__340.jpg', bio='aye', background='https://cdn.pixabay.com/photo/2022/06/30/20/10/lake-7294456__340.jpg')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()

    # joey = User(
    #     username='joey', email='joey@aa.io', password='password', firstName='joey', lastName="joey", profile_pic='https://cdn.pixabay.com/photo/2023/01/31/05/59/zebra-7757193_640.jpg', bio='aye', background='https://cdn.pixabay.com/photo/2022/06/30/20/10/lake-7294456__340.jpg', followed=[demo, marnie, bobbie])
    # db.session.add(joey)
    # db.session.commit()
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
