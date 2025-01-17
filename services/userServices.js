const User = require('../models/User');

// Service to fetch all users with pagination and optional search
const getAllUsers = async (page, limit, search) => {
  const query = {};
  if (search) {
    query.$or = [
      { username: { $regex: search, $options: 'i' } }, // Case-insensitive search
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;
  const parsedLimit = parseInt(limit);

  // Fetch users and count total documents
  const [users, totalUsers] = await Promise.all([
    User.find(query)
      .select('-password') // Exclude sensitive data
      .skip(skip)
      .limit(parsedLimit),
    User.countDocuments(query),
  ]);

  return {
    users,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    },
  };
};

module.exports = { getAllUsers };
