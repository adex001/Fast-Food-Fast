import pool from '../database/connectdatabase';

const checker = ((param, check, table) => {
  const query = `SELECT * FROM ${table} WHERE ${param} = ${check}`;
  pool.query(query, (err, result) => {
    if (result) {
      return true;
    }
    return false;
  });
  return false;
});

export default checker;
