const { getAllUsers } = require('../services/userServices');

// Controller to handle fetching all users
const fetchAllUsers = async (req, res) => {
  const { page = 1, limit = 8, search } = req.query;

  try {
    const result = await getAllUsers(page, limit, search); // Call service function
    res.status(200).json({
      message: 'Users fetched successfully',
      data: result.users,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      message: 'Error fetching users',
      error: error.message,
    });
  }
};

module.exports = { fetchAllUsers };
