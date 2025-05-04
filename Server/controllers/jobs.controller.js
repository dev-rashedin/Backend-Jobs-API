const { NotFoundError, BadRequestError } = require('../errors');
const Job = require('../models/Jobs.model');
const { StatusCodes } = require('http-status-codes');

/**
 * Fetch all jobs for a specific user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {Promise<Job[]>} The fetched jobs
 */
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
/**
 * Fetch a single job by id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} jobId - The id of the job to fetch
 * @return {Promise<Job>} The fetched job
 */
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

/**
 * Create a new job
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Returns a promise that resolves to void
 */
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

const updateJob = async (req, res) => {
   const {
     user: { userId },
     params: { id: jobId },
     body: { company, position },
  } = req;
  
  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty');
  }

  const job = await Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true })
  
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  
  res.status(StatusCodes.OK).json({ success: true, message: 'Job updated successfully', job });
};

const deleteJob = async (req, res) => {
  res.send('delete job');
};


module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
};
