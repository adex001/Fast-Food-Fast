import pool from '../database/connectdatabase';

const data = [];
const getUser = (userid) => {
  const getUserQuery = `SELECT * FROM users WHERE userid = '${userid}'`;
  pool.query(getUserQuery, (err, result) => {
    if (err) {
      return 'Error';
    }
    if (result.rowCount < 1) {
      return 'No such user';
    }
    const {
      email, firstname, lastname, address, city, state, country,
    } = result.rows[0];
    data.push({
      email, firstname, lastname, address, city, state, country,
    });
  });
  return data;
};
export default getUser;
