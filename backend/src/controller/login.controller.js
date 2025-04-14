// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/usermodel'); 


const JWT_SECRET = '123456'; 

exports.UserLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
 
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
 
    const isMatch = user.password ==  password
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }
 
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
 
    user.status = 'online';
    await user.save();
 
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        status: user.status
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};
