const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class UnauthenticatedError extends CustomAPIError {
  constructor(message, details = null) {
    super(message, StatusCodes.UNAUTHORIZED, details);
  }
}

module.exports = UnauthenticatedError;
