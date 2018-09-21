import pool from '../database/connectdatabase';

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
