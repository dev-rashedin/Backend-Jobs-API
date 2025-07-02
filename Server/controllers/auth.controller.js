require('dotenv').config();
const {
  StatusCodes,
  getStatusMessage,
  BengaliStatusMessages,
} = require('http-status-toolkit-beta');
const User = require('../models/Users.model');
const { BadRequestError, UnauthenticatedError } = require('../errors');

// console.log(BengaliStatusMessages);

console.log('bengali', getStatusMessage(StatusCodes.NOT_FOUND, 'bengali'));




const register = async (req, res) => {
  // const { username, email, password } = req.body;

  // //  if (!username || !email || !password) {
  // //    throw new BadRequestError('Please provide username, email and password');
  // //  }

  const user = await User.create({ ...req.body });

  // const token = jwt.sign({userId: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '30d'})

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: user.getName(), token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

   if ( !email || !password) {
     throw new BadRequestError('Please provide email and password');
   }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError(
      'Invalid Credentials',
      (details = 'Password is incorrect')
    );
  }

  const token = user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({
      success: true,
      // message: 'User logged in successfully',
      message: getStatusMessage(StatusCodes.OK, 'detailed'),
      token,
      user,
    });
};

module.exports = {
  register,
  login,
};
