require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minLength: 6,
  },
});

// mongoose middleware
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


// creating custom methods
// UserSchema.methods.getName = function () {
//   return this.username;
// };

UserSchema.methods.getName = function () {
  return this.username;
}

UserSchema.methods.createJWT = function () {
  return jwt.sign({userId: this._id, username: this.username}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

// UserSchema.methods.createJWT = function () {
//   return jwt.sign({userId: this._id, username: this.username}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
// }

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch
}

// UserSchema.methods.comparePassword = async function (candidatePassword) {
//   const isMatch = await bcrypt.compare(candidatePassword, this.password);
//   return isMatch
// }

module.exports = mongoose.model('User', UserSchema)