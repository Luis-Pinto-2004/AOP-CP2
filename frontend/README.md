# Movie App Frontend

## Description
This is a simple React application that communicates with a Node.js backend to display a list of movies and their details. Users can click on a movie to see its details and associated comments.

## Prerequisites
- Node.js
- MongoDB

## Instructions for Running the Project Locally on Windows

1. Ensure you have Node.js and MongoDB installed on your machine.
2. Clone the repository or create the directory structure as shown above.
3. Navigate to the backend directory and create a `.env` file with your MongoDB connection string (e.g., `MONGODB_URI=mongodb://<username>:<password>@localhost:27017/sample-mllix`).
4. Run `npm install` in the backend directory to install backend dependencies.
5. Run `npm start` in the backend directory to start the backend server.
6. Navigate to the frontend directory and run `npm install` to install frontend dependencies.
7. Run `npm start` in the frontend directory to start the React application.
8. Open your browser and go to `http://localhost:3000` to view the application.

## Project Structure
- **public/**: Contains the main HTML file for the React application.
- **src/**: Contains the source code for the React application, including components and services.

## Components
- **MovieList**: Fetches and displays a list of movies from the backend.
- **MovieDetails**: Fetches and displays the details of a selected movie along with its associated comments.

## API Endpoints
The frontend communicates with the following backend API endpoints:
- `GET /api/movies`: Fetch all movies.
- `GET /api/movies/:id`: Fetch a specific movie by ID.
- `GET /api/movies/:id/comments`: Fetch comments associated with a specific movie.

## License
This project is open-source and available for use and modification.