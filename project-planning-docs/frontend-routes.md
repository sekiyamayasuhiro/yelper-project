# User-facing routes

ㅤ
## `/`
### Landing Page
* Display all businesses
   * `GET /api/businesses`
* Display a Search Bar
* Display Navigation Bar
* Display a `Create a New Business` link (Link to `/businesses/new`)


ㅤ
## `/businesses/business_id`
### Business Details Page
* Display the details for this specific Business
    * `GET /api/businesses/:business_id`
* Display a `Write a Review` button (Link to `/reviews/new`)
* Display all reviews that belong to this business
    * `GET /api/businesses/:business_id/reviews`
    * Every Review comes with `Update` button (Using `UpdateReviewModalForm`)
        * `PUT /api/reviews/:review_id`
    * Every Review comes with `Delete` button (Using `DeleteReviewModal`)
        * `DELETE /api/reviews/:review_id`

* Display a `View all Images` button that shows all the images that belong to this business (Using `ViewAllImagesModal`)
    * `GET /api/businesses/:business_id/images`

* Display an `Add more Images` button (Using `CreateImageFormModal`)
    * `POST /api/businesses/:business_id/images`
    * Every image comes with `Delete` button (Using `DeleteImageModal`)
        * `DELETE /api/business-images/:image_id`


ㅤ
## `/reviews/new`
### Create a New Review
`POST /api/businesses/:business_id/reviews`


ㅤ
## `/businesses/new`
### Create a New Business
* `POST /api/businesses`


ㅤ
## `/businesses/current`
### Manage Business
* Display all the businesses that belong to the current user
    * `GET /api/businesses/current`
* Update the business that belongs to the current user (Link to `/businesses/business_id/edit`)
    * `PUT /api/businesses/:business_id`
* Delete the business that belongs to the current user (Using `DeleteBusinessModal`)
    * `DELETE /api/businesses/:business_id`


ㅤ
## `/reviews/current`
### Manage Reviews
* Get all the reviews that belong to the current user
    * `GET /api/reviews/current`
* Update the review that belongs to the current user (Using `UpdateReviewModalForm`)
    * `PUT /api/reviews/:review_id`
* Delete the review that belongs to the current user (Using `DeleteReviewModal`)
    * `DELETE /api/reviews/:review_id`
