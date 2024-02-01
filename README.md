# react-blog

A full-stack blog application built with React, Bootstrap, and a backend API running on Node.js and Express with MongoDB. The project enables users to register, create, edit, delete posts, and recover passwords through email. The frontend fetches data from the backend API to deliver a seamless blogging experience.

## Features

- **User Authentication:** Register and log in securely. Password recovery is also implemented using email verification.

- **CRUD Operations:** Create, read, update, and delete blog posts. Users can manage their own posts.

- **Responsive Design:** The React frontend, built with Bootstrap, ensures a responsive and user-friendly experience on various devices.

## Install

To install all the dependencies, run:

```
yarn
```

Create a `.env` file in the `backend` folder. Example:

```
MONGODB_URI=mongodb://127.0.0.1:27017/exampleDB
SECRET_KEY=yoursecretkey
PORT=4000
FROM_ADDRESS=example@email.com
EMAIL_PASSWORD=password
SMTP_HOST=smtp.example.com
FRONTEND_URL=http://localhost:3000/
```

If you don't set the PORT for the backend in the .env file, it will use port 4000 as the default and the FRONTEND_URL will default to localhost:3000, which is used for creating the password reset link.

## Run

```
yarn start
```

## Backend API Endpoints

You can use the backend API with any frontend language. Below are the available endpoints:

### `/register` (POST)

Creates a user and returns a token and userId.

### `/password/forgot` (POST)

Sends a password reset email to the provided address.

### `/password/reset` (PATCH)

Changes the password in the database using the provided token.

### `/login` (POST)

Logs in the user and returns a token and userId.

### `/posts` (GET)

Returns all blog posts in the database.

### `/posts/:id` (GET)

Returns the post with the given ID.

### `/admin/posts` (GET)

Returns all posts by the logged-in user.

### `/new` (POST)

Creates a new blog post.

### `/edit/:id` (PATCH)

Updates the post with the given ID.

### `/delete/:id` (DELETE)

Deletes the post with the given ID.
