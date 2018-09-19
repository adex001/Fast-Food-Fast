import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class TokenHandler {
  static createToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    return token;
  }
}

export default TokenHandler;
