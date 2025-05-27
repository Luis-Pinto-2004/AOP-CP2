# Movie App Backend

## Overview
This is the backend for the Movie App, which communicates with a MongoDB database to manage movies and their associated comments. The backend is built using Node.js and Express.

## Instructions for Running the Project Locally on Windows

1. Ensure you have Node.js and MongoDB installed on your machine.
2. Clone the repository or create the directory structure as shown above.
3. Navigate to the `backend` directory and create a `.env` file with your MongoDB connection string (e.g., `MONGODB_URI=mongodb://<username>:<password>@localhost:27017/sample-movie-app`).
4. Run `npm install` in the `backend` directory to install backend dependencies.
5. Run `npm start` in the `backend` directory to start the backend server.
6. Navigate to the `frontend` directory and run `npm install` to install frontend dependencies.
7. Run `npm start` in the `frontend` directory to start the React application.
8. Open your browser and go to `http://localhost:3000` to view the application.

## Project Structure
- **src/**: Contains the source code for the backend.
  - **app.js**: Entry point of the application.
  - **controllers/**: Contains the logic for handling requests.
    - **movieController.js**: Handles movie-related requests.
    - **commentController.js**: Handles comment-related requests.
  - **models/**: Contains the Mongoose models.
    - **movie.js**: Defines the Movie schema.
    - **comment.js**: Defines the Comment schema.
  - **routes/**: Contains the route definitions.
    - **movieRoutes.js**: Routes for movie-related endpoints.
    - **commentRoutes.js**: Routes for comment-related endpoints.
  - **config/**: Contains configuration files.
    - **db.js**: MongoDB connection logic.

## Dependencies
- Express
- Mongoose
- dotenv (for environment variables)

## Scripts
- `npm start`: Starts the backend server.