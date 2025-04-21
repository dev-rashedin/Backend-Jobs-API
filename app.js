require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const authRouter = require('./routes/auth.route')
const jobsRouter = require('./routes/jobs.route')

console.log(process.env.MONGO_URI)

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter)


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const { extend } = require('joi');

app.use(express.json());
app.use(express.urlencoded({extended: true}))
// extra packages

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
