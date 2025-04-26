const { StatusCodes } = require("http-status-codes")
const User = require("../models/User");
const BadRequestError = require("../errors/bad-request");
const bcrypt = require("bcryptjs")

const register = async (req, res) => {
  const { username, email, password } = req.body;

   if (!username || !email || !password) {
     throw new BadRequestError('Please provide username, email and password');
   }
 
  const user = await User.create({...req.body})
  res.status(StatusCodes.CREATED).json(user)
}

const login = async (req, res) => {
  res.send('login user')
}

module.exports = {
  register, 
  login
}