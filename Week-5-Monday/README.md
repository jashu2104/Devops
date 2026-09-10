# Online Shopping Application

A Node.js backend starter for an online shopping application. The current service uses Express and connects to MongoDB through Mongoose.

## Requirements

- Node.js 18 or newer
- npm
- A running MongoDB instance or MongoDB Atlas connection

## Setup

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/online_shopping
   ```

   Replace the value with your MongoDB connection string when using a hosted database.

3. Start the server:

   ```bash
   npm start
   ```

The server listens on `http://localhost:3000`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Starts the Express server with Node.js |
| `npm test` | Placeholder test script; tests are not configured yet |

## Current Functionality

- Loads configuration from `.env` using `dotenv`.
- Parses incoming JSON request bodies.
- Connects to MongoDB using the `MONGO_URI` environment variable.
- Starts an Express server on port `3000`.

Application routes and data models can be added as the project develops.

## Project Structure

```text
.
├── package.json      # Project metadata, scripts, and dependencies
├── package-lock.json # Locked dependency versions
└── server.js         # Express server and MongoDB connection
```

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `MONGO_URI` | Yes | MongoDB connection string used by Mongoose |

Do not commit `.env` files or database credentials to version control.

# Devops_Week-5-monday
