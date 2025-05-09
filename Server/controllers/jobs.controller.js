const { NotFoundError, BadRequestError } = require('../errors');
const Job = require('../models/Jobs.model');
const { StatusCodes } = require('http-status-codes');


  // Fetch all jobs for a specific user

const getAllJobs = async (req, res) => {
  // fetch all jobs for the user
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('-createdAt');

  // send a success response with the jobs
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Jobs fetched successfully',
    jobs,
  });
};

// fetch a single job 
const getSingleJob = async (req, res) => {
  const { user: { userId }, params: { id: jobId } } = req
  

  const job = await Job.findOne({
  _id: jobId, createdBy: userId
  })
  
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }

res.status(StatusCodes.OK).json({success: true, message: 'Job fetched successfully', job}); 
};

//  Create a new job

const createJob = async (req, res) => {
  // Add the userId to the request body
  req.body.createdBy = req.user.userId;

  // Create a new job in the database
  const job = await Job.create(req.body);

  // Send a response indicating success
  res.status(StatusCodes.CREATED).json({ 
    success: true,
    message: 'Job created successfully',
    job
  });
};

//  Update an existing job

const updateJob = async (req, res) => {
  // Destructure necessary fields from request
  const {
    user: { userId },
    params: { id: jobId },

  } = req;
  
  // Validate input fields
  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty');
  }

  // Attempt to find and update the job with new data
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  
  // If no job is found, throw a NotFoundError
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  
  // Send a success response with the updated job
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Job updated successfully',
    job,
  });
};


//  Delete a job

const deleteJob = async (req, res) => {
  // Destructure necessary fields from request
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  
  // Attempt to find and delete the job
  const job = await Job.findOneAndRemove({ _id: jobId, createdBy: userId });
  
  // If no job is found, throw a NotFoundError
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  
  // Send a success response with the updated job
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Job deleted successfully',
  });
};


module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
};
