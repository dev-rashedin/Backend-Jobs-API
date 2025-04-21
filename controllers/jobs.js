const getAllJobs = async (req, res) => {
  res.send('get all jobs');
};

const getSingleJob = async (req, res) => {
  res.send('get single job');
};

const createJob = async (req, res) => {
  res.send('create job');
};

const updateJob = async (req, res) => {
  res.send('update job');
};

const deleteJob = async (req, res) => {
  res.send('delete job');
};
const login = async (req, res) => {
  res.send('login user');
};

module.exports = {
  register,
  login,
};
