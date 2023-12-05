# react-blog

A blog built with React and Bootstrap that fetches data from a backend API running on NodeJS and Express with MongoDB. You can register and create new posts, see, edit and delete the posts you created, and recover your password using your email address. To read all the posts you don't need to be logged in.

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

## Backend API endpoints

If you dislike using React, you can create your frontend with any language you like and only use the backend API.

#### /register (POST)

Accepts a name, email address and password, the user is created and logged in, and you get a token and the userId as the response.

#### /password/forgot (POST)

Accepts an email address and sends an email with a password reset link to that address.

#### /password/reset (PATCH)

Accepts a password and changes it in the database using the token as verification for that user.

#### /login (POST)

Accepts an email address and password, the user is logged in, and you get a token and the userId as the response.

#### /posts (GET)

Responds with all the blog posts in the database.

#### /posts/:id (GET)

Responds with the post with the given ID.

#### /admin/posts (GET)

Responds with all the posts by the logged in user.

#### /new (POST)

Requires a title, imageURL and content and creates the blog post.

#### /edit/:id (PATCH)

The title, imageURL and content fields are optional in this case and it will update every populated field of the post with the given ID.

#### /delete/:id (DELETE)

The post with the given ID will be deleted.
