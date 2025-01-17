const express = require('express');
const router = express.Router();
const { fetchAllUsers } = require('../controllers/userController');

// Define routes
router.get('/all', fetchAllUsers); // GET /api/users/all

module.exports = router;
