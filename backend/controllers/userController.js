const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  // create token!!!!
  // first argument : object(=payload we create) -> nothing sensitive
  // second argument : secret part (save in .env first because it should be secret)
  // third argument : options (here, token expire in 3days)
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// login user
const loginUser = async (req, res) => {
  // grab email and pw from request
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    // when it succeed, set status as 200 and json data(which are email and user)
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // the model that i created
    const user = await User.signup(email, password);

    const token = createToken(user._id);

    // when it succeed, set status as 200 and json data(which are email and user)
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
