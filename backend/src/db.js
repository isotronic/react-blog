import mongoose from "mongoose";
import bcrypt from "bcrypt";
import "dotenv/config";

const { MONGODB_URI } = process.env;

// Connect to MongoDB database
export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
}

// Define the Post schema and model for MongoDB
const postSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Please specify a title."] },
  content: { type: String, required: [true, "The post content cannot be empty."] },
  imageURL: { type: String, required: [true, "Please provide an image url."] },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: () => Date.now(), immutable: true },
});

export const Post = mongoose.model("Post", postSchema);

// Define the User schema for MongoDB
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "You need to have a name."] },
  email: { type: String, required: [true, "Email cannot be empty."], unique: true },
  password: { type: String, required: [true, "Password cannot be empty."] },
  registerDate: { type: Date, default: () => Date.now(), immutable: true },
});

// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

// Compare the provided password with the hashed password in the database
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Create the User model
export const User = mongoose.model("User", userSchema);
