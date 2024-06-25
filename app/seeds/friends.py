from app.models import db, Friend, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_friends():
    users = db.session.query(User).all()
    demoId = users[0].id
    marnieId = users[1].id
    bobbieId = users[2].id
    print('Hello from Hazel Friends seed')


    friendship1 = Friend(
        user_id=demoId,
        friend_id=marnieId,

    )
    friendship2 = Friend(
        user_id=demoId,
        friend_id=bobbieId,

    )
    friendship3 = Friend(
        user_id=marnieId,
        friend_id=bobbieId    )

    friendships = [friendship1, friendship2, friendship3]
    for friendship in friendships:
        db.session.add(friendship)
    db.session.commit()



def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM friends"))

    db.session.commit()
