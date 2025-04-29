// const authenticationMiddleware = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Authentication invalid' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(payload.userId).select('-password');
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Authentication invalid' });
//   }
// };
