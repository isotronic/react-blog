import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import { body, param } from "express-validator";
import { connectDB } from "./db.js";
import {
  authenticate,
  login,
  register,
  sendResetToken,
  resetPassword,
  deleteUser,
} from "./user.js";
import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getPostById,
  getPostsByUser,
} from "./post.js";

const app = express();
const { PORT = 4000 } = process.env;
connectDB();

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  try {
    await next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// CORS headers to allow cross-origin requests
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

// Register a new user (HTTP POST request)
app.post(
  "/register",
  body("name").trim().notEmpty().isString(),
  body("email").trim().notEmpty().isString().isEmail(),
  body("password").trim().notEmpty().isString(),
  register
);

// Login the user (HTTP POST request)
app.post(
  "/login",
  body("email").trim().notEmpty().isString().isEmail(),
  body("password").trim().notEmpty().isString(),
  login
);

// Request a password reset link (HTTP POST request)
app.post("/password/forgot", body("email").trim().notEmpty().isString().isEmail(), sendResetToken);

// Reset the user's password (HTTP PATCH request)
app.patch("/password/reset", body("password").trim().notEmpty().isString(), resetPassword);

// Retrieve all posts (HTTP GET request)
app.get("/posts", getAllPosts);

// Retrieve a specific post by ID (HTTP GET request)
app.get("/posts/:id", param("id").trim().notEmpty().isMongoId(), getPostById);

// Retrieve all posts by author (HTTP GET request)
app.get("/admin/posts", authenticate, getPostsByUser);

// Create a new post (HTTP POST request)
app.post(
  "/new",
  body("title").trim().notEmpty().isString(),
  body("content").trim().notEmpty().isString(),
  body("imageURL").trim().notEmpty().isString().isURL(),
  authenticate,
  createPost
);

// Update a post (HTTP PATCH request)
app.patch(
  "/edit/:id",
  param("id").trim().notEmpty().isMongoId(),
  body("title").trim().notEmpty().isString(),
  body("content").trim().notEmpty().isString(),
  body("imageURL").trim().notEmpty().isString().isURL(),
  authenticate,
  editPost
);

// Delete a post (HTTP DELETE request)
app.delete("/delete/:id", param("id").trim().notEmpty().isMongoId(), authenticate, deletePost);

// Delete the logged in user (HTTP DELETE request)
app.delete("/delete-user", authenticate, deleteUser);

// Start the Express app and listen on the specified port
app.listen(PORT, () => console.log(`App is listening on port: ${PORT}.`));
