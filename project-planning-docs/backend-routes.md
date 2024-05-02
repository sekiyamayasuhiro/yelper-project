# LITTLE TRIO YUMSPOT
## Database Schema Design

![Little Trio YumSpot Database Schema Design]()

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION


## BUSINESSES

### Get all Businesses
Returns all the businesses

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/businesses
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

### Get details of a Business by id
Returns the details of a business specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/businesses/:business_id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

### Create a Business
Creates and returns a new business

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/businesses
  * Headers:
    * Content-Type: application/json
  * Body:

  * Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

  * Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

### Add an Image to a Business based on the Business' id
Create and return a new image for a business specified by id.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/businesses/:business_id/images
  * Headers:
    * Content-Type: application/json
  * Body:

  * Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  * Error response: Couldn't find a Spot with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

### Edit a Business
Updates and returns an existing business

* Require Authentication: true
* Require proper authorization: Business must belong to the current user
* Request
  * Method: PUT
  * URL: /api/businesses/:business_id
  * Headers:
    * Content-Type: application/json
  * Body:

  * Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

  * Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

  * Error response: Couldn't find a Business with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Business couldn't be found"
    }



### Delete a Business
Deletes an existing business

* Require Authentication: true
* Require proper authorization: Business must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/businesses/:business_id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Business with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Business couldn't be found"
    }
    ```


## REVIEWS

### Get all Reviews of the Current User
Returns all the reviews written by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/reviews/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

### Get all Reviews by a Business' id
Returns all the reviews that belong to a business specified by id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/businesses/:business_id/reviews
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

* Error response: Couldn't find a Business with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Business couldn't be found"
    }
    ```


### Create a Review for a Business based on the Business' id
Create and return a new review for a business specified by id.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/businesses/:business_id/reviews
  * Headers:
    * Content-Type: application/json
  * Body:

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

* Error response: Couldn't find a Business with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Business couldn't be found"
    }
    ```

* Error response: Review from the current user already exists for the Business
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already has a review for this business"
    }

### Add an Image to a Review based on the Review's id
Create and return a new image for a review specified by id.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: POST
  * URL: /api/reviews/:review_id/images
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "url": "image url"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "url": "image url"
    }
    ```

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found"
    }
    ```

### Edit a Review
Update and return an existing review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: PUT
  * URL: /api/reviews/:review_id
  * Headers:
    * Content-Type: application/json
  * Body:

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found"
    }
    ```

### Delete a Review
Delete an existing review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/reviews/:review_id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found"
    }
    ```


## IMAGES

### Get all Images by a Business' id
Return all images belong to a specific business
* Request
    * Method: GET
    * URL: /api/businesses/:business_id/images
    * Body: None

### Delete a Business Image
Delete an existing image for a Business

* Require Authentication: true
* Require proper authorization: Business must belong to the current user, or the current user has visited this business
* Request
  * Method: DELETE
  * URL: /api/business-images/:image_id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Business Image with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Business Image couldn't be found"
    }
    ```

### Delete a Review Image
Delete an existing image for a Review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/review-images/:image_id
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Review Image with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review Image couldn't be found"
    }
    ```

## SEARCH/ FILTER

### Add Query Filters to Search Business by Name
Return business filtered by query parameters.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/businesses
  * Query Parameters
    *
    *
* Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

* Error Response: Query parameter validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:


### Add Query Filters to Search Business by Category
Return business filtered by category

### Add Query Filters to Search Business by Price
Return business filtered by price
