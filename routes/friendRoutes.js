const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

// Import controllers
const fetchFriendsList = require('../controllers/fetchFriendsList');
const fetchFriendRequests = require('../controllers/fetchFriendRequests');
const createFriendRequest = require('../controllers/createFriendRequest');
const acceptRequest = require('../controllers/acceptRequest');
const fetchMutualFriends = require('../controllers/fetchMutualFriends');
// const sendFriendRequest = require('../controllers/sendFriendList')

// Routes
router.get('/list', protect,fetchFriendsList); // working Get the list of friends
router.get('/requests', protect,fetchFriendRequests); // Get incoming friend requests - working
router.post('/request', protect, createFriendRequest); // workung
router.post('/accept', protect, acceptRequest);// workung
router.get('/mutual/:id',protect, fetchMutualFriends); // Get mutual friends with a user
// router.post('/send')

module.exports = router;
