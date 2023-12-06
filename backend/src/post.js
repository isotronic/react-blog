import { validationResult } from "express-validator";
import { Post } from "./db.js";

export async function getAllPosts(req, res, next) {
  const allPosts = await Post.find().populate("author").sort({ date: -1 });

  res.status(200).json(allPosts);
  next();
}

export async function getPostById(req, res, next) {
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

  res.status(200).json(selectedPost);
  next();
}

export async function getPostsByUser(req, res, next) {
  const authorId = req.user._id;
  const allPosts = await Post.find({ author: authorId }).populate("author").sort({ date: -1 });

  if (allPosts.length < 1) {
    return res.status(404).json({ message: "You don't have any posts" });
  }

  res.status(200).json(allPosts);
  next();
}

export async function createPost(req, res, next) {
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
  next();
}

export async function editPost(req, res, next) {
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

  if (selectedPost.author.equals(req.user._id)) {
    if (req.body.title) selectedPost.title = req.body.title;
    if (req.body.content) selectedPost.content = req.body.content;
    if (req.body.imageURL) selectedPost.imageURL = req.body.imageURL;

    await selectedPost.save();

    res.status(201).json({ message: "Post updated", selectedPost });
  } else {
    return res.status(401).json({ message: "You are not authorized to edit this post" });
  }
  next();
}

export async function deletePost(req, res, next) {
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

    res.status(200).json({ message: "Post deleted", selectedPost });
  } else {
    return res.status(401).json({ message: "You are not authorized to delete this post" });
  }
  next();
}
