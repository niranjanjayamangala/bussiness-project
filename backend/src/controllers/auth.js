const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/authmodel"); // Adjust the path as necessary
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // For token generation
const  router = express.Router();



// User Registration
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser  = await User.findOne({ email });
    if (existingUser ) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const newUser  = new User({ email, password });
    await newUser .save();
    res.status(201).json({ message: "User  registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate a token (you can customize the payload and expiration)
    const token = jwt.sign({ id: user._id }, "niranjan", { expiresIn: "1d" });

    res.status(200).json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
