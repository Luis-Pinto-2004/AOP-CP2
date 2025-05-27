# Movie App

This project is a simple movie application built with React for the frontend and Node.js with Express for the backend. It connects to a MongoDB database to store and retrieve movie data and associated comments.

## Project Structure

The project is organized into two main directories: `backend` and `frontend`.

- **backend**: Contains the Node.js server, API routes, controllers, and MongoDB models.
- **frontend**: Contains the React application that interacts with the backend API.

## Instructions for Running the Project Locally on Windows

1. Ensure you have Node.js and MongoDB installed on your machine.
2. Clone the repository or create the directory structure as shown above.
3. Navigate to the `backend` directory and create a `.env` file with your MongoDB connection string (e.g., `MONGODB_URI=mongodb://<username>:<password>@localhost:27017/sample-movie-app`).
4. Run `npm install` in the `backend` directory to install backend dependencies.
5. Run `npm start` in the `backend` directory to start the backend server.
6. Navigate to the `frontend` directory and run `npm install` to install frontend dependencies.
7. Run `npm start` in the `frontend` directory to start the React application.
8. Open your browser and go to `http://localhost:3000` to view the application.

## Features

- Display a list of movies fetched from the backend.
- Click on a movie to view its details and associated comments.
- Add comments to movies (functionality to be implemented).

## Technologies Used

- React
- Node.js
- Express
- MongoDB
- Mongoose

## License

This project is open-source and available under the MIT License.