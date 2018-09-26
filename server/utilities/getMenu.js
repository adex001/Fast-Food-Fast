import pool from '../database/connectdatabase';

const data = [];
const getMenu = (menuarray) => {
  menuarray.forEach((arr) => {
    const getmenuQuery = `SELECT * FROM menu WHERE mealid = '${arr.mealId}'`;
    pool.query(getmenuQuery, (err, result) => {
      if (err) {
        return 'Error';
      }
      if (result.rowCount < 1) {
        return 'No such meal';
      }
      console.log(arr.mealId);
      data.push(result.rows);
    });
  });
  console.log(data);
  return data;
};
module.exports = getMenu;
