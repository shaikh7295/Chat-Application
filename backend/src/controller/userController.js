const User = require('../model/usermodel');

exports.GetAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username email status'); // only fetch selected fields

    res.status(200).json({
      message: 'User list fetched successfully',
      users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
