const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class BadRequestError extends CustomAPIError {
  constructor(message, details = null) {
    super(message, StatusCodes.BAD_REQUEST, details);
  }
}

module.exports = BadRequestError; 
