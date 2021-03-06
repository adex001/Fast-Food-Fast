import pool from '../database/connectdatabase';

/**
 * Get Meal function retrieves a single meal from the menu
 * @param {string} mealid - The menu array
 */
const getMeal = (mealid) => {
  return new Promise((resolve) => {
    const query = `SELECT * FROM menu WHERE mealid = '${mealid}'`;
    pool.query(query, (err, result) => {
      if (result.rowCount > 0) {
        const obj = {
          mealName: result.rows[0].mealname,
          mealImageUrl: result.rows[0].mealimageurl,
          mealPrice: result.rows[0].mealprice,
        };
        resolve(obj);
      }
    });
  });
};
export default getMeal;
