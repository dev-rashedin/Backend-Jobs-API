const Job = require('../models/Jobs.model');

const getAllJobs = async (req, res) => {
  res.send('get all jobs');
};

const getSingleJob = async (req, res) => {
  res.send('get single job');
};

const createJob = async (req, res) => {
  res.json(req.user)
};

const updateJob = async (req, res) => {
  res.send('update job');
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
