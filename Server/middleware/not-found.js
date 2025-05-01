const { StatusCodes } = require('http-status-codes');
const path = require('path');

const notFound = (req, res) => {
  //  res.status(StatusCodes.NOT_FOUND).json({ message: 'Route does not exist' });
   res
     .status(StatusCodes.NOT_FOUND)
     .sendFile(path.join(__dirname, '../views', '404.html'));
 }

module.exports = notFound;
