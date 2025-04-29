require('dotenv').config();
const { StatusCodes } = require("http-status-codes")
const User = require("../models/Users.model");
const BadRequestError = require("../errors/bad-request");


const register = async (req, res) => {
  // const { username, email, password } = req.body;

  // //  if (!username || !email || !password) {
  // //    throw new BadRequestError('Please provide username, email and password');
  // //  } 
 
  const user = await User.create({ ...req.body })
  
  // const token = jwt.sign({userId: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '30d'})


  const token = user.createJWT()

  res.status(StatusCodes.CREATED).json({ user: user.getName(), token})
}

const login = async (req, res) => {
  res.send('login user')
}

module.exports = {
  register, 
  login
}