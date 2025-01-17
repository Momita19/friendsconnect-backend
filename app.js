const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes")
const friendRoutes = require('./routes/friendRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/friends', friendRoutes);

module.exports = app;