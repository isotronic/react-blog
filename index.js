import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { body, param, validationResult } from "express-validator";

const app = express();
const PORT = 4000;

// Connect to MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/blogDB", { useNewUrlParser: true });

// Define the Post schema and model for MongoDB
const postSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Please specify a title."] },
  content: { type: String, required: [true, "The post content cannot be empty."] },
  imageURL: { type: String, required: [true, "Please provide an image url."] },
  author: { type: String },
  date: { type: Date, default: () => Date.now(), immutable: true },
});

const Post = mongoose.model("Post", postSchema);

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

// Retrieve all posts (HTTP GET request)
app.get("/posts", async (req, res) => {
  const allPosts = await Post.find().sort({ date: -1 });

  res.status(201).json(allPosts);
});

// Retrieve a specific post by ID (HTTP GET request)
app.get("/posts/:id", param("id").trim().notEmpty().isMongoId(), async (req, res) => {
  const result = validationResult(req).isEmpty();
  if (!result) {
    return res.status(422).json({ title: "Invalid request.", message: "ID is not a valid ObjectId." });
  }

  const postId = req.params.id;
  const selectedPost = await Post.findById(postId).exec();

  res.status(201).json(selectedPost);
});

// Create a new post (HTTP POST request)
app.post(
  "/new",
  body("title").trim().notEmpty().isString(),
  body("content").trim().notEmpty().isString(),
  body("imageURL").trim().notEmpty().isString().isURL(),
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
      author: req.body.author,
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
  async (req, res) => {
    const result = validationResult(req).isEmpty();
    if (!result) {
      const errors = validationResult(req).mapped();
      return res.status(422).json(errors);
    }

    const postId = req.params.id;
    const selectedPost = await Post.findById(postId).exec();

    if (req.body.title) selectedPost.title = req.body.title;
    if (req.body.content) selectedPost.content = req.body.content;
    if (req.body.imageURL) selectedPost.imageURL = req.body.imageURL;
    if (req.body.author) selectedPost.author = req.body.author;

    await selectedPost.save();

    res.status(201).json({ message: "Post updated.", selectedPost });
  }
);

// Delete a post (HTTP DELETE request)
app.delete("/delete/:id", param("id").trim().notEmpty().isMongoId(), async (req, res) => {
  const result = validationResult(req).isEmpty();
  if (!result) {
    return res.status(422).json({ title: "Invalid request.", message: "ID is not a valid ObjectId." });
  }

  const postId = req.params.id;
  const selectedPost = await Post.deleteOne({ _id: postId });

  res.status(201).json({ message: "Post deleted.", selectedPost });
});

// Start the Express app and listen on the specified port
app.listen(PORT, () => console.log(`App is listening on port: ${PORT}.`));
