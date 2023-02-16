const jwt = require('jsonwebtoken');
const AuthErr = require('../errors/AuthErr');
const { MSG_UNAUTHORIZED } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_KEY : 'dev-secret');
  } catch (err) {
    throw new AuthErr(MSG_UNAUTHORIZED);
  }
  req.user = payload;
  next();
};
