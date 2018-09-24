import pool from '../database/connectdatabase';
/**
 * isAdmin middleware checks if a user is an admin or not
 * @param {string} req - The request to the server
 * @param {string} res - The response from the server.
 * @param {string} next - Passes the next middleware
 */
const isAdmin = ((req, res, next) => {
  const { email } = req.body;
  const query = `SELECT * FROM users WHERE email = '${email}'`;
  pool.query(query, (err, result) => {
    if (result.rows[0].isAdmin === true) {
      return next();
    }
    return res.status(403).json({
      status: 'failed',
      message: 'You are not authorized to access this resource',
    });
  });
});
export default isAdmin;
