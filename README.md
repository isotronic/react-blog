# react-blog

A blog built with React and Bootstrap that fetches data from a backend API running on NodeJS and Express with MongoDB.


## Install

To install all the dependencies, run:
```
yarn
```
Then, you need to create a .env file in the backend folder.

### Example .env

```
MONGODB_URI=mongodb://127.0.0.1:27017/exampleDB
SECRET_KEY=yoursecretkey
PORT=8080
```
If you don't set the port for the backend in the .env file, it will use port 4000 as the default.

## Run

```
yarn start
```

## Backend API endpoints

If you dislike using React, you can create your frontend with any language you like and only use the backend API.

#### /register (POST)

Accepts a name, email address and password, the user is created and logged in, and you get a token and the userId as the response.

#### /login (POST)

Accepts an email address and password, the user is logged in, and you get a token and the userId as the response.

#### /posts (GET)

Responds with all the blog posts in the database.

#### /posts/:id (GET)

Responds with the post with the given ID.

#### /posts/author/:id (GET)

Responds with all the posts by the author with the given ID.

#### /new (POST)

Requires a title, imageURL and content and creates the blog post.

#### /edit/:id (PATCH)

The title, imageURL and content fields are optional in this case and it will update every populated field of the post with the given ID.

#### /delete/:id (DELETE)

The post with the given ID will be deleted.
