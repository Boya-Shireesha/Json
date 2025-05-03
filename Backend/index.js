// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const path = require('path');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const SECRET_KEY = "mysecretkey"; // Use a secure key in production
// const users = [{ username: "user1", password: "pass123" }]; // Sample user

// // ✅ Content-Security-Policy Middleware
// app.use((req, res, next) => {
//   res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' http://localhost:5000");
//   next();
// });

// // ✅ Serve Favicon Correctly
// app.get('/favicon.ico', (req, res) => {
//   res.sendFile(path.join(__dirname, 'favicon.ico')); // Ensure favicon.ico exists
// });

// // ✅ Handle Root Route (Prevent 404)
// app.get('/', (req, res) => {
//   res.send("Welcome to the Backend Server");
// });

// // ✅ JWT Login Route
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(u => u.username === username && u.password === password);

//   if (user) {
//     const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
//     res.send({ message: "Login successful", token });
//   } else {
//     res.status(401).send({ message: "Invalid credentials" });
//   }
// });

// // ✅ Protected Route
// app.get('/protected', (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) return res.status(403).send({ message: "No token provided" });

//   jwt.verify(token, SECRET_KEY, (err, decoded) => {
//     if (err) return res.status(403).send({ message: "Token invalid or expired" });

//     res.send({ message: "Access granted", user: decoded.username });
//   });
// });

// // ✅ Start Server
// app.listen(5000, () => console.log("Server running on http://localhost:5000"));





// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const path = require('path');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const SECRET_KEY = "mysecretkey"; // Use a secure key in production
// const users = [{ username: "user1", password: "pass123" }]; // Sample user


// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
//   next();
// });

// // ✅ Middleware for Content-Security-Policy
// app.use((req, res, next) => {
//   res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' http://localhost:5000");
//   next();
// });

// // ✅ Middleware for Error Handling
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send({ message: "Something went wrong!" });
// });

// // ✅ Serve Favicon Correctly
// app.get('/favicon.ico', (req, res) => {
//   res.sendFile(path.join(__dirname, 'favicon.ico')); // Ensure favicon.ico exists
// });

// // ✅ Handle Root Route (Prevent 404)
// app.get('/', (req, res) => {
//   res.send("Welcome to the Backend Server");
// });

// // ✅ JWT Login Route
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(u => u.username === username && u.password === password);

//   if (user) {
//     const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
//     res.send({ message: "Login successful", token });
//   } else {
//     res.status(401).send({ message: "Invalid credentials" });
//   }
// });

// // ✅ Protected Route
// app.get('/protected', (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) return res.status(403).send({ message: "No token provided" });

//   jwt.verify(token, SECRET_KEY, (err, decoded) => {
//     if (err) return res.status(403).send({ message: "Token invalid or expired" });

//     res.send({ message: "Access granted", user: decoded.username });
//   });
// });

// // ✅ Start Server
// app.listen(5000, () => console.log("Server running on http://localhost:5000"));



// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import bodyParser from "body-parser";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const PORT = 5000;
// const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Store this in .env file

// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB Connection
// mongoose
//   .connect("mongodb://127.0.0.1:27017/authDB", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// // User Schema & Model
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model("User", userSchema);

// // 🔹 Register User (Signup)
// app.post("/register", async (req, res) => {
//   const { email, password } = req.body;

//   // Check if user already exists
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return res.status(400).json({ success: false, message: "User already exists" });
//   }

//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new User({ email, password: hashedPassword });

//   await newUser.save();
//   res.status(201).json({ success: true, message: "User registered successfully" });
// });

// // 🔹 Login User & Generate JWT
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(401).json({ success: false, message: "User not found" });
//   }

//   // Verify password
//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   if (!isPasswordValid) {
//     return res.status(401).json({ success: false, message: "Invalid credentials" });
//   }

//   // Generate JWT Token
//   const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1h" });

//   res.json({ success: true, token, message: "Login successful" });
// });

// // 🔹 Protected Route (Requires JWT)
// app.get("/protected", async (req, res) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(403).json({ success: false, message: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, SECRET_KEY);
//     res.json({ success: true, message: "Access granted", user: decoded });
//   } catch (err) {
//     res.status(401).json({ success: false, message: "Invalid token" });
//   }
// });

// // Start Server
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));



//token based Authentication code

// import express from 'express';
// import jwt from 'jsonwebtoken';
// import bodyParser from 'body-parser';

// const app = express();
// app.use(bodyParser.json());

// const SECRET_KEY = 'mysecretkey';
// const users = [{ username: 'siri', password: 'siri@123' }];

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(u => u.username === username && u.password === password);
//   if (user) {
//     const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
//     res.json({ token });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// });

// app.get('/protected', (req, res) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (token) {
//     jwt.verify(token, SECRET_KEY, (err, decoded) => {
//       if (err) return res.sendStatus(403);
//       res.json({ message: 'Protected content', user: decoded.username });
//     });
//   } else {
//     res.sendStatus(401);
//   }
// });

// app.listen(5000, () => console.log('Server running on port 5000'));



// import express from 'express';
// import jwt from 'jsonwebtoken';
// import bodyParser from 'body-parser';

// const app = express();
// app.use(bodyParser.json());

// const SECRET_KEY = 'mysecretkey';
// const users = [{ username: 'siri', password: 'siri@123' }];

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find(u => u.username === username && u.password === password);
//   if (user) {
//     // Include password in the token (NOT RECOMMENDED)
//     const token = jwt.sign({ username, password }, SECRET_KEY, { expiresIn: '1h' });
//     res.json({ token });
//   } else {
//     res.status(401).json({ message: 'Invalid credential'});
//   }
// });

// app.get('/protected', (req, res) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (token) {
//     jwt.verify(token, SECRET_KEY, (err, decoded) => {
//       if (err) return res.sendStatus(403);
//       // Decoded now contains the password
//       res.json({ message: 'Protected content', user: decoded });
//     });
//   } else {
//     res.sendStatus(401);
//   }
// });

// app.listen(5000, () => console.log('Server running on port 5000'));

// Token based Authentication code


import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors'

import bodyParser from 'body-parser';

const app = express();
dotenv.config();

app.use(cors({
  origin:"http://localhost:5173"
}))
app.use(bodyParser.json());

const SECRET_KEY = 'mysecretkey';
const users = [{ username: 'siri', password: 'siri@123' }];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log("req body", req.body)
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    // Include password in the token (NOT RECOMMENDED)
    const token = jwt.sign({ username, password }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credential'});
  }
});

app.get('/protected', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.sendStatus(403);
      // Decoded now contains the password
      res.json({ message: 'Protected content', user: decoded });
    });
  } else {
    res.sendStatus(401);
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
console.log('Connected to Mongodb');