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
}

export default TokenHandler;
