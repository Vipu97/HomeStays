// authMiddleware.js
const jwt = require('jsonwebtoken');
const jwtSecret = 'VipinKiroula';

const authenticateJWT = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }
  jwt.verify(token, jwtSecret, (err, userdata) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    req.user = userdata;
    next();
  });
};

module.exports = authenticateJWT;
