## [Frontend Live Link](https://todos56.netlify.app/)


## Overview
This is the backend for the Task Management Application, built using Express.js and MongoDB. It handles user authentication, task storage, and real-time synchronization using WebSockets.

## Features
- User authentication with Firebase
- CRUD operations for tasks
- WebSockets for real-time task updates
- MongoDB for persistent storage
- RESTful API endpoints

## Tech Stack
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** Firebase Admin SDK
- **Real-Time Updates:** WebSockets (Socket.io)
- **Environment Variables:** dotenv

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- Node.js (latest LTS version)
- MongoDB (local or Atlas)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/task-manager-backend.git
   cd task-manager-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_CLIENT_EMAIL=your_firebase_client_email
   FIREBASE_PRIVATE_KEY=your_firebase_private_key
   ```
4. Start the development server:
   ```sh
   npm start
   # or
   yarn start
   ```

## API Endpoints
| Method | Endpoint       | Description                        |
|--------|---------------|------------------------------------|
| POST   | /tasks        | Create a new task                 |
| GET    | /tasks        | Get all tasks for the user        |
| PUT    | /tasks/:id    | Update a task                     |
| DELETE | /tasks/:id    | Delete a task                     |

## Deployment
Deploy the backend using services like Heroku, Render, or DigitalOcean.