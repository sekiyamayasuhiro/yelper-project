# Yelper

Yelper is a clone of the popular Yelp platform, developed as a group project. It replicates core functionalities, including user authentication, business listings, and review systems. Built with Flask, React, and SQLAlchemy, Yelper offers a comprehensive solution for discovering and reviewing local businesses, demonstrating our proficiency in creating feature-rich, interactive applications.

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



