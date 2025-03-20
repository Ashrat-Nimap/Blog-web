const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  // Expect token in the Authorization header (e.g. 'Bearer <token>')
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Access denied, no token provided' });

  const token = authHeader?.split(' ')[1]; // assuming "Bearer <token>"
  if (!token) return res.status(401).json({ message: 'Access denied, token malformed' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
