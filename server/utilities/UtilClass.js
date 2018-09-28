import pool from '../database/connectdatabase';

class Utilities {
  static getTotalPrice(meals) {
    let totalPrice = 0.0;
    meals.forEach((meal) => {
      const priceQuery = `SELECT mealprice from menu WHERE mealid = '${meal.mealId}'`;
      pool.query(priceQuery, (err, result) => {
        if (result.rowCount > 0) {
          totalPrice += (result.rows[0].mealprice * meal.quantity);
        }
      });
    });
    return totalPrice;
  }
}

export default Utilities;
