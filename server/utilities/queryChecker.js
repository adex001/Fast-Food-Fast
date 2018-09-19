import pool from '../database/connectdatabase';

const emailChecker = ((check) => {
  const query = `SELECT * FROM users WHERE email = '${check}'`;
  pool.query(query, (err, result) => {
    if (result) {
      return true;
    }
    return false;
  });
  return false;
});

export default emailChecker;
