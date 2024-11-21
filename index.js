const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

// MongoDB URI (replace with your actual MongoDB Atlas URI)
const uri = "mongodb+srv://root:strongpassword@cluster0.g8j0k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Mongoose model setup (SQL table equivalent)
const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  gender: String,
});

const User = mongoose.model('User', userSchema);

// Connect to MongoDB using mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established");
});

// **API Endpoints**

/** 1. SELECT Operation (Fetch all users) */
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Error fetching users");
  }
});

/** 2. SELECT Operation with condition (Fetch user by id) */
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ id: id });  // Fetch a specific user by id
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).send("Error fetching user");
  }
});

/** 3. INSERT Operation (Create a new user) */
app.post("/users", async (req, res) => {
  const { id, name, gender } = req.body;
  try {
    const newUser = new User({ id, name, gender });
    await newUser.save();  // Save the new user to the database
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).send("Error adding user");
  }
});

/** 4. UPDATE Operation (Update user by id) */
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, gender } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { id },
      { name, gender },
      { new: true }  // Return the updated document
    );
    if (!updatedUser) return res.status(404).send("User not found");
    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).send("Error updating user");
  }
});

/** 5. DELETE Operation (Delete user by id) */
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findOneAndDelete({ id });
    if (!deletedUser) return res.status(404).send("User not found");
    res.json(deletedUser);
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).send("Error deleting user");
  }
});

// Start server
app.listen(8080, () => {
  console.log(`Server is running on http://localhost:8080`);
});
