const app = require('./app');

require('dotenv').config();
require('express-async-errors');
require('./config/connectDB');

const port = process.env.PORT || 3006;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
