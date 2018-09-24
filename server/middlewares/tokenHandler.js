import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * A class to handle or token implementation
 */
class TokenHandler {
  /**
 * The createToken function takes a parameter which is an object to create a token
 * @param {object} payload - The payload that is to be parsed into a token
 * @returns {string} token - The generated token.
 */
  static createToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    return token;
  }

  /**
 * verifyToken middleware verifies the token provided
 * @param {string} req - The request to the server
 * @param {string} res - The response from the server.
 * @param {function} next - Passes the next middleware
 */
  static verifyToken(req, res, next) {
    const { token } = req.headers;
    // Check if it exists
    if (typeof token === 'undefined') {
      return res.status(401).json({
        status: 'failed',
        message: 'No token provided!',
      });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded) {
        req.decoded = decoded;
        return next();
      }
      return res.status(401).json({
        status: 'failed',
        message: 'Token cannot be verified',
      });
    });
    return null;
  }

  /**
 * isAdmin middleware checks if a user is an admin or not
 * @param {string} req - The request to the server
 * @param {string} res - The response from the server.
 * @param {function} next - Passes the next middleware
 */
  static isAdmin(req, res, next) {
    const { token } = req.headers;
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded.isAdmin) {
        return next();
      }
      return res.status(403).json({
        status: 'failed',
        message: 'You do not have the permission to access this resource!',
      });
    });
  }
}

export default TokenHandler;
