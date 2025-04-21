const { StatusCodes } = require("http-status-codes");

class CustomAPIError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details; 
  }
}

module.exports = CustomAPIError;
