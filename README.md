# Yelper

Yelper is a clone of the popular Yelp platform, developed as a group project. It replicates core functionalities, including user authentication, business listings, and review systems. Built with Flask, React, and SQLAlchemy, Yelper offers a comprehensive solution for discovering and reviewing local businesses, demonstrating our proficiency in creating feature-rich, interactive applications.

## Features

### 1. Business Listings
- **Overview**: Manage business listings with Create, Read, Update, and Delete capabilities.
- **Functionality**:
  - **Create**: 
    - **Add New Business**: Authenticated users can submit a form to create a new business listing.
  - **Read**: 
    - **View Listings**: Users can view a list of reviews for a particular business.
    - **Business Details**: Users can click on a business to view detailed information, including reviews.
  - **Update**: 
    - **Edit Business**: Authenticated users can update existing business information.
  - **Delete**: 
    - **Remove Business**: Authorized users can delete a business listing, which will remove it from the list and database.

### 2. Reviews
- **Overview**: Manage reviews with Create, Read, Update, and Delete capabilities.
- **Functionality**:
  - **Create**:
    - **Post Review**: Authenticated users can write and submit reviews for businesses.
  - **Read**:
    - **View Reviews**: Users can view a list of reviews for a particular business.
  - **Update**:
    - **Edit Review**: Authorized users can modify their reviews, changing the text or rating.
  - **Delete**:
    - **Remove Review**: Authorized users can delete their reviews from the business listing.

### 3. Upload and Manage Images
- **Overview**: Authenticated users can manage images associated with businesses.
- **Functionality**:
  - **Upload Images**: Authenticated users can upload new images to businesses. 
  - **View Images**: Users can view existing images linked to businesses.
  - **Delete Images**: Authorized users can remove images from businesses.

### 4. Google Maps Integration
- **Overview**: Integrates Google Maps for location visualization.
- **Functionality**:
  - **Map Display**: Show business locations on a Google Map.

### 5. Search, Sort, and Filter
- **Overview**: Provides advanced functionalities to find, organize, and refine business listings and reviews.
- **Functionality**:
  - **Search**:
    - **Search Input**: Users can enter keywords to search for businesses based on their name, category, and address.
    - **Search Results**: Displays a list of businesses that match the search criteria.
  - **Sort**:
    - **Review sorting**: Users can sort reviews by date and by rating.
  - **Filter**:
    - **Review Filtering**: Users can filter reviews by rating to view reviews with specific ratings.
    - **Business Filtering**: Users can filter businesses by price find options that meet their criteria.


## Live Site

- [Visit Yelper](https://little-trio-yumspot-project.onrender.com/)

## Screenshots

#### Home Page

![image](https://github.com/user-attachments/assets/9b6d9b17-f0a5-484d-9dff-b5e1b5c9583e)

#### Listing Page
![image](https://github.com/user-attachments/assets/c5697271-a8de-480d-bd82-44e43b7e91bb)

## Technologies Used

- **Front-End:** React, CSS
- **State Management:** Redux
- **Back-End:** Flask
- **Database:** SQLAlchemy
- **Cloud Storage:** AWS S3
- **Maps Integration:** Google Maps

## Installation

To get a local copy up and running, follow these steps:

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/sekiyamayasuhiro/yelper-project.git
   ```

2. **Navigate to the Project Directory:**

   ```sh
   cd yelper-project
   ```

3. **Activate the virtual environment:**

   ```sh
   pipenv shell
   ```
4. **Install Dependencies:**

    ```sh
   pipenv install -r requirements.txt
   ```
5. **Set Up Environment Variables:**
   - Create `.env` file in the root directory of the project and add the following environment variables:

      ```sh
      # Secret key for Flask
      SECRET_KEY=your-secret-key

      # Database connection details
      DATABASE_URL=sqlite:///dev.db
      DATABASE_SCHEMA=your-database-schema

      # AWS S3 credentials
      AWS_ACCESS_KEY_ID=your-access-key-id
      AWS_SECRET_ACCESS_KEY=your-secret-access-key
      S3_BUCKET_NAME=your-s3-bucket-name
      ```

   - Create a `.flaskenv` file in the root directory of the project and add the following environment variables:

      ```sh
      FLASK_APP=app
      FLASK_DEBUG=true
      FLASK_RUN_PORT=8000
      ```
6. **Run Migrations:**

   ```sh
   flask db upgrade
   ```

7. **Seed the database:**

   ```sh
   flask seed all
   ```

8. **Set Up React Front-end:**
   - Navigate to the React front-end directory and install dependancies:

      ```sh
      cd react-vite
      npm install
      ```

   - Start the React development server:

      ```sh
      npm run dev
      ```
9. **Start the Development Server:**
   - Open a new terminal, navigate to the root directory, and run:

      ```sh
      flask run
      ```

10. **Access the Application:**
    - Open your browser and go to `http://127.0.0.1:8000` for the Flask backend and `http://localhost:5173/` for the React front-end.
   
## Yelper Team

- **Yasuhiro Sekiyama** - Full Stack Developer   
  [GitHub Profile](https://github.com/sekiyamayasuhiro)

- **Hazel Caling** - Full Stack Developer  
  [GitHub Profile](https://github.com/hazelcaling)



