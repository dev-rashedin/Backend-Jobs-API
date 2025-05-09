const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let status =  err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Something went wrong, try again later';

  if (err.name === 'ValidationError') {
    status = StatusCodes.BAD_REQUEST;
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');
  }


  if (err.code && err.code === 11000) {
    message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
    status = StatusCodes.BAD_REQUEST
  } 

  const response = {
    success: false,
    message: message,
  };

  if (err.details) {
    response.details = err.details;
  }



   res.status(status).json(response);
}

module.exports = errorHandlerMiddleware
