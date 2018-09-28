import bcrypt from 'bcrypt';
import pool from '../database/connectdatabase';
import TokenHandler from '../middlewares/tokenHandler';

/**
 * Represents the AuthController Class.
 */
class AuthController {
/**
 * Signup Controller
 * @param {string} req - The request to the server
 * @param {string} res - The response from the server.
 */
  static signup(req, res) {
    const {
      email, password, lastname, firstname, isAdmin,
    } = req.body;

    const saltRound = Math.floor(Math.random() * 5);
    const salt = bcrypt.genSaltSync(saltRound);
    const saltedPassword = bcrypt.hashSync(password, salt);

    const insertQuery = `INSERT INTO users (email, password, firstname, lastname, isadmin) VALUES ('${email}', '${saltedPassword}', '${firstname}', '${lastname}', '${isAdmin}') RETURNING *; `;
    pool.query(insertQuery, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 'failed',
          message: 'internal server error!',
          err,
        });
      }
      const userData = {
        userId: result.rows[0].userid,
        firstname: result.rows[0].firstname,
        isAdmin: result.rows[0].isadmin,
      };
      // Signs the payload
      const token = TokenHandler.createToken(userData);
      return res.status(201).json({
        status: 'success',
        message: 'User Registered and signed in',
        token,
      });
    });
    return null;
  }

  /**
 * Signin function signs a user to the app
 * @param {string} req - The request to the server
 * @param {string} res - The response from the server.
 */
  static signin(req, res) {
    const { email, password } = req.body;
    const signinQuery = `SELECT * FROM users WHERE email = '${email}'`;
    pool.query(signinQuery, (err, result) => {
      if (result.rowCount < 1) {
        return res.status(401).json({
          status: 'failed',
          message: 'Email does not exist',
        });
      }
      const userId = result.rows[0].userid;
      const decryptPassword = bcrypt.compareSync(password, result.rows[0].password);
      if (!decryptPassword) {
        return res.status(401).json({
          status: 'failed',
          message: 'Login failed',
        });
      }
      const userData = {
        userId: result.rows[0].userid,
        firstname: result.rows[0].firstname,
        isAdmin: result.rows[0].isadmin,
      };
      const token = TokenHandler.createToken(userData);
      return res.status(200).json({
        status: 'success',
        message: 'user authenticated and signed in',
        token,
      });
    });
  }
}
export default AuthController;
