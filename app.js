require('dotenv').config();
require('express-async-errors');
require('./config/connectDB');
const express = require('express');
const app = express();



// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const authRouter = require('./routes/auth.route')
const jobsRouter = require('./routes/jobs.route')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter)



// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

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
