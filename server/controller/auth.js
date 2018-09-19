import bcrypt from 'bcrypt';

import pool from '../database/connectdatabase';
import checker from '../utilities/queryChecker';
import TokenHandler from '../middlewares/tokenHandler';

class AuthController {
  static signup(req, res) {
    const {
      email, password, lastname, firstname, isAdmin,
    } = req.body;
    // Check if email exists
    if (checker(email) === true) {
      return res.status(400).json({
        status: 'failed',
        message: 'Email Address already exists',
      });
    }
    const saltRound = Math.floor(Math.random() * 5);
    const salt = bcrypt.genSaltSync(saltRound);
    const saltedPassword = bcrypt.hashSync(password, salt);

    const insertQuery = `INSERT INTO users (email, password, firstname, lastname, isAdmin VALUES ('${email}', '${saltedPassword}', '${firstname}', '${lastname}', '${isAdmin}') RETURNING *) `;
    pool.query(insertQuery, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 'failed',
          message: 'internal server error!',
        });
      }
      const userData = {
        userId: result.rows[0].userId,
        firstname: result.rows[0].firstname,
        isAdmin: result.rows[0].isAdmin,
      };
      // Signs the payload
      const token = TokenHandler.createToken(userData);
      return res.status(201).json({
        status: 'true',
        message: 'User Registered and signed in',
        token,
      });
    });
    return null;
  }
}
export default AuthController;
