import pool from '../database/connectdatabase';

const getMenu = (menuarray) => {
  menuarray.forEach((arr) => {
    return new Promise((resolve) => {

      const getmenuQuery = `SELECT * FROM menu WHERE mealid = '${arr.mealId}'`;
      pool.query(getmenuQuery, (err, result) => {
        if (err) {
          return 'Error';
        }
        if (result.rowCount < 1) {
          return 'No such meal';
        }
        resolve(result.rows[0]);
      });
    });
  });
};
export default getMenu;
