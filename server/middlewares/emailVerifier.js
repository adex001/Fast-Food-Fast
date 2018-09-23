import pool from '../database/connectdatabase';

/**
 * emailVerifier middleware checks if an email address exists or not
 * @param {string} req - The request to the server
 * @param {string} res - The response from the server.
 * @param {function} next - Passes the next middleware
 */
const emailVerifier = ((req, res, next) => {
  const { email } = req.body;
  const emailQuery = `SELECT * FROM users WHERE email = '${email}'`;
  pool.query(emailQuery, (err, result) => {
    if (result.rowCount > 0) {
      return res.status(400).json({
        status: 'failed',
        message: 'email address already exists.',
      });
    }
    return next();
  });
});

export default emailVerifier;
