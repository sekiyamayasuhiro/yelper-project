from app.models import db, Image, Business, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_images():
    users = db.session.query(User).all()
    businesses = db.session.query(Business).all()

    # Define the image data
    image_data = [
        {
            'user_id': users[0].id,
            'business_id': businesses[0].id,
            'url': 'https://cdn10.phillymag.com/wp-content/uploads/sites/3/2021/10/fit-academy-900x600-1.jpg'
        },
        {
            'user_id': users[0].id,
            'business_id': businesses[0].id,
            'url': '/seed-images/fill_1.jpg'
        },
        {
            'user_id': users[0].id,
            'business_id': businesses[0].id,
            'url': '/seed-images/fill_2.jpg'
        },
        {
            'user_id': users[0].id,
            'business_id': businesses[0].id,
            'url': '/seed-images/fill_3.jpg'
        },
        {
            'user_id': users[0].id,
            'business_id': businesses[0].id,
            'url': '/seed-images/fill_4.jpg'
        },
        {
            'user_id': users[0].id,
            'business_id': businesses[0].id,
            'url': '/seed-images/fill_5.jpg'
        },
        {
            'user_id': users[1].id,
            'business_id': businesses[1].id,
            'url': 'https://d1ppz47dg1ugzu.cloudfront.net/ramen/ramen-1.png'
        },
        {
            'user_id': users[1].id,
            'business_id': businesses[1].id,
            'url': '/seed-images/maru_1.jpg'
        },
        {
            'user_id': users[1].id,
            'business_id': businesses[1].id,
            'url': '/seed-images/maru_2.jpg'
        },
        {
            'user_id': users[1].id,
            'business_id': businesses[1].id,
            'url': '/seed-images/maru_3.jpg'
        },
        {
            'user_id': users[1].id,
            'business_id': businesses[1].id,
            'url': '/seed-images/maru_4.jpg'
        },
        {
            'user_id': users[1].id,
            'business_id': businesses[1].id,
            'url': '/seed-images/maru_5.jpg'
        },
        {
            'user_id': users[1].id,
            'business_id': businesses[1].id,
            'url': '/seed-images/maru_6.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[2].id,
            'url': 'https://s3-media0.fl.yelpcdn.com/bphoto/N0E23K_H8KHYC-XMBXE9_Q/348s.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[2].id,
            'url': '/seed-images/blue_1'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[2].id,
            'url': '/seed-images/blue_2'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[2].id,
            'url': '/seed-images/blue_3'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[2].id,
            'url': '/seed-images/blue_4'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[2].id,
            'url': '/seed-images/blue_5'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[2].id,
            'url': '/seed-images/blue_6'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[3].id,
            'url': '/seed-images/orens_1.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[3].id,
            'url': '/seed-images/orens_2.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[3].id,
            'url': '/seed-images/orens_3.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[3].id,
            'url': '/seed-images/orens_4.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[3].id,
            'url': '/seed-images/orens_5.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[3].id,
            'url': '/seed-images/orens_6.png'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[4].id,
            'url': '/seed-images/kajiken_1.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[4].id,
            'url': '/seed-images/kajiken_2.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[4].id,
            'url': '/seed-images/kajiken_3.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[4].id,
            'url': '/seed-images/kajiken_4.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[4].id,
            'url': '/seed-images/kajiken_5.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[4].id,
            'url': '/seed-images/kajiken_6.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[5].id,
            'url': '/seed-images/philz_1.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[5].id,
            'url': '/seed-images/philz_2.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[5].id,
            'url': '/seed-images/philz_3.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[5].id,
            'url': '/seed-images/philz_4.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[5].id,
            'url': '/seed-images/philz_5.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[5].id,
            'url': '/seed-images/philz_6.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[6].id,
            'url': '/seed-images/momo_1.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[6].id,
            'url': '/seed-images/momo_2.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[6].id,
            'url': '/seed-images/momo_3.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[6].id,
            'url': '/seed-images/momo_4.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[6].id,
            'url': '/seed-images/momo_5.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[6].id,
            'url': '/seed-images/momo_6.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[7].id,
            'url': '/seed-images/equinox_1.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[7].id,
            'url': '/seed-images/equinox_2.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[7].id,
            'url': '/seed-images/equinox_3.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[7].id,
            'url': '/seed-images/equinox_4.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[7].id,
            'url': '/seed-images/equinox_5.jpg'
        },
        {
            'user_id': users[2].id,
            'business_id': businesses[7].id,
            'url': '/seed-images/equinox_6.jpg'
        },


    ]

    # Create Image objects
    images = [Image(**data) for data in image_data]

    # Add all images to the session and commit
    db.session.add_all(images)
    db.session.commit()



def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
