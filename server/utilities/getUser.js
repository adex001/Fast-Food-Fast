import pool from '../database/connectdatabase';

/**
 * Fetch User function retrieves all users
 * @param {integer} userId - The userId
 */
const getUser = (userId) => {
  const query = `SELECT * FROM users WHERE userid = '${userId}'`;
  return new Promise((resolve) => {
    pool.query(query, (err, result) => {
      if (result.rowCount > 0) {
        const obj = {
          firstname: result.rows[0].firstname,
          lastname: result.rows[0].lastname,
          email: result.rows[0].email,
        };
        resolve(obj);
      }
    });
  });
};

export default getUser;
