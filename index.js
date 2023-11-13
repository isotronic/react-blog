import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import { body, param, validationResult } from "express-validator";
import { connectDB, Post } from "./db.js";
import { authenticate, login, register } from "./auth.js";

const app = express();
const { PORT = 4000 } = process.env;
connectDB();

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// Retrieve all posts (HTTP GET request)
app.get("/posts", async (req, res) => {
  const allPosts = await Post.find().populate("author").sort({ date: -1 });

  res.status(201).json(allPosts);
});

// Retrieve a specific post by ID (HTTP GET request)
app.get("/posts/:id", param("id").trim().notEmpty().isMongoId(), async (req, res) => {
  const result = validationResult(req).isEmpty();
  if (!result) {
    return res
      .status(422)
      .json({ title: "Invalid request", message: "ID is not a valid ObjectId" });
  }

  const postId = req.params.id;
  const selectedPost = await Post.findById(postId).populate("author").exec();

  if (!selectedPost) {
    return res.status(404).json({ message: "Post doesn't exist" });
  }

  res.status(201).json(selectedPost);
});

// Create a new post (HTTP POST request)
app.post(
  "/new",
  body("title").trim().notEmpty().isString(),
  body("content").trim().notEmpty().isString(),
  body("imageURL").trim().notEmpty().isString().isURL(),
  authenticate,
  async (req, res) => {
    const result = validationResult(req).isEmpty();
    if (!result) {
      const errors = validationResult(req).mapped();
      return res.status(422).json(errors);
    }

    const currentDate = new Date().toJSON();
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      imageURL: req.body.imageURL,
      author: req.user._id,
      date: currentDate,
    });

    res.status(201).json(newPost);
  }
);

// Update a post (HTTP PATCH request)
app.patch(
  "/edit/:id",
  param("id").trim().notEmpty().isMongoId(),
  body("title").trim().notEmpty().isString(),
  body("content").trim().notEmpty().isString(),
  body("imageURL").trim().notEmpty().isString().isURL(),
  authenticate,
  async (req, res) => {
    const result = validationResult(req).isEmpty();
    if (!result) {
      const errors = validationResult(req).mapped();
      return res.status(422).json(errors);
    }

    const postId = req.params.id;
    const selectedPost = await Post.findById(postId).exec();

    if (!selectedPost) {
      return res.status(404).json({ message: "Post doesn't exist" });
    }
    console.log(req.user);
    if (selectedPost.author.equals(req.user._id)) {
      if (req.body.title) selectedPost.title = req.body.title;
      if (req.body.content) selectedPost.content = req.body.content;
      if (req.body.imageURL) selectedPost.imageURL = req.body.imageURL;

      await selectedPost.save();

      res.status(201).json({ message: "Post updated", selectedPost });
    } else {
      return res.status(401).json({ message: "You are not authorized to edit this post" });
    }
  }
);

// Delete a post (HTTP DELETE request)
app.delete(
  "/delete/:id",
  param("id").trim().notEmpty().isMongoId(),
  authenticate,
  async (req, res) => {
    const result = validationResult(req).isEmpty();
    if (!result) {
      return res
        .status(422)
        .json({ title: "Invalid request", message: "ID is not a valid ObjectId" });
    }

    const postId = req.params.id;
    const selectedPost = await Post.findById(postId).exec();

    if (!selectedPost) {
      return res.status(404).json({ message: "Post doesn't exist" });
    }

    if (selectedPost.author.equals(req.user._id)) {
      await Post.deleteOne({ _id: postId });

      res.status(201).json({ message: "Post deleted", selectedPost });
    } else {
      return res.status(401).json({ message: "You are not authorized to delete this post" });
    }
  }
);

// Start the Express app and listen on the specified port
app.listen(PORT, () => console.log(`App is listening on port: ${PORT}.`));
