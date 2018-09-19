import pool from '../database/connectdatabase';

const isAdmin = ((email) => {
  const query = `SELECT * FROM users WHERE email = '${email}'`;
  pool.query(query, (err, result) => {
    if (result.rows[0].isAdmin === true) {
      return true;
    }
    return false;
  });
});
export default isAdmin;
