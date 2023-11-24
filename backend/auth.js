import jwt from "jsonwebtoken";
import "dotenv/config";
import { validationResult } from "express-validator";
import { User } from "./db.js";

const { SECRET_KEY } = process.env;

// Register a new user
export async function register(req, res, next) {
  const result = validationResult(req).isEmpty();
  if (!result) {
    const errors = validationResult(req).mapped();
    return res.status(422).json(errors);
  }

  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1 hour" });
    res.json({ token, userId: user._id });
  } catch (error) {
    next(error);
  }
}

// Login with an existing user
export async function login(req, res, next) {
  const result = validationResult(req).isEmpty();
  if (!result) {
    const errors = validationResult(req).mapped();
    return res.status(422).json(errors);
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1 hour" });
    res.json({ token });
  } catch (error) {
    next(error);
  }
}

// Authenticates the user to access restricted route
export async function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ _id: decodedToken.userId });
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is invalid" });
  }
}
