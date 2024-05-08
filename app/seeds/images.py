from app.models import db, Image, Business, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    users = db.session.query(User).all()
    businesses = db.session.query(Business).all()

    image1 = Image(
        user_id=users[0].id,
        business_id=businesses[0].id,
        url='https://cdn10.phillymag.com/wp-content/uploads/sites/3/2021/10/fit-academy-900x600-1.jpg',
    )
    image2 = Image(
        user_id=users[1].id,
        business_id=businesses[1].id,
        url='https://d1ppz47dg1ugzu.cloudfront.net/ramen/ramen-1.png',
    )
    image3 = Image(
        user_id=users[2].id,
        business_id=businesses[2].id,
        url='https://s3-media0.fl.yelpcdn.com/bphoto/N0E23K_H8KHYC-XMBXE9_Q/348s.jpg',
    )


    images = [image1, image2, image3]
    for image in images:
        db.session.add(image)
    db.session.commit()


def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
