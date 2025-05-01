const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  const status =  err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Something went wrong';

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
