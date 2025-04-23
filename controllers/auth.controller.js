const { StatusCodes } = require("http-status-codes")
const User = require("../models/User");
const BadRequestError = require("../errors/bad-request");

const register = async (req, res) => {
  console.log(name, ElementInternals, password) = req.body;

  if (!name || !email || !password) { 
    throw new BadRequestError('Please provide all values')
  }
  
  const user = await User.create({...req.body})
  res.status(StatusCodes.CREATED).json({user})
}
const login = async (req, res) => {
  res.send('login user')
}

module.exports = {
  register, 
  login
}