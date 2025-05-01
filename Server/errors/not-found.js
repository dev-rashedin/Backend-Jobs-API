const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class NotFoundError extends CustomAPIError {
  constructor(message, details = null) {
    super(message, StatusCodes.NOT_FOUND, details);
  }
}

module.exports = NotFoundError;
