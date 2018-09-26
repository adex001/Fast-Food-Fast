import pool from '../database/connectdatabase';

let data = [];
const getUser = (userid) => {
  const getUserQuery = `SELECT * FROM users WHERE userid = '${userid}'`;
  pool.query(getUserQuery, (err, result) => {
    if (err) {
      return 'Error';
    }
    if (result.rowCount < 1) {
      return 'No such user';
    }
    console.log(userid);
    console.log(result.rows[0]);
    data = result.rows;
    return data;
  });
  return data;
};
module.exports = getUser;
