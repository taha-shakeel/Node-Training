const bearerToken = require('../config/index');

function verifyRequest(req, res, next) {
  const authHead = req.headers.authorization;
  if (!authHead || authHead !== bearerToken.bearerToken) {
    return res.status(403).json({ error: 'Authorization Failed' });
  }
  next();
};

module.exports = verifyRequest;
