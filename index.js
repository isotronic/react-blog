const express = require("express");
const bodyParser = require("body-parser");
const { v4: generateId } = require("uuid");
const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

let DUMMY_POSTS = [
  {
    id: "1",
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: "2",
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: "3",
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

app.get("/posts", (req, res) => {
  res.json(DUMMY_POSTS);
});

app.get("/posts/:id", (req, res) => {
  const postId = req.params.id;
  const selectedPost = DUMMY_POSTS.find((post) => post.id === postId);

  if (!selectedPost) {
    return res.status(404).json({ message: "Post not found." });
  }

  res.json(selectedPost);
});

app.post("/posts", (req, res) => {
  const currentDate = new Date().toJSON();
  const newPost = {
    id: generateId(),
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: currentDate,
  };
  DUMMY_POSTS.push(newPost);
  res.status(200).json({ message: "Post created.", newPost });
});

app.patch("/posts/:id", (req, res) => {
  const postId = req.params.id;
  const selectedPost = DUMMY_POSTS.find((post) => post.id === postId);

  if (!selectedPost) {
    return res.status(404).json({ message: "Post not found." });
  }

  if (req.body.title) selectedPost.title = req.body.title;
  if (req.body.content) selectedPost.content = req.body.content;
  if (req.body.author) selectedPost.author = req.body.author;

  res.status(200).json({ message: "Post updated." });
});

app.delete("/posts/:id", (req, res) => {
  const postId = req.params.id;
  const postIndex = DUMMY_POSTS.findIndex((post) => post.id === postId);

  if (!postIndex) {
    return res.status(404).json({ message: "Post not found.", index: postIndex });
  }

  DUMMY_POSTS.splice(postIndex, 1);
  res.status(200).json({ message: "Post deleted.", index: postIndex });
});

app.listen(PORT, () => console.log(`App is listening on port: ${PORT}.`));
