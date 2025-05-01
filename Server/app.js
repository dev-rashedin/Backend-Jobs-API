require('dotenv').config();
require('express-async-errors');
require('./config/connectDB');
const express = require('express');
const path = require('path');
const app = express();



// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const authRouter = require('./routes/auth.route')
const jobsRouter = require('./routes/jobs.route')
const authenticateUser = require('./middleware/authentication')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// routes
app.use('/api/v1/auth',  authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter)



// routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
