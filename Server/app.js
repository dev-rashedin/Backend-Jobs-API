require('dotenv').config();
require('express-async-errors');
require('./config/connectDB');
const {
  globalErrorHandler,
  notFoundHandler,
} = require('express-error-toolkit');

const express = require('express');
const path = require('path');
const app = express();

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit')



const authRouter = require('./routes/auth.route')
const jobsRouter = require('./routes/jobs.route')
const authenticateUser = require('./middleware/authentication');


app.use(rateLimiter(
  {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }
))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(cors());
app.use(xss());

 
// routes
app.use('/api/v1/auth',  authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter)



// routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.use(notFoundHandler);
app.use(globalErrorHandler);

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
