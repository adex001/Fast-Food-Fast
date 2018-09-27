import pool from '../database/connectdatabase';

class Utilities {
  static getTotalPrice(meals) {
    let totalPrice = 0.0;
    meals.forEach((meal) => {
      // {mealId: 1, quantity: 23}
      const priceQuery = `SELECT mealprice from menu WHERE mealid = '${meal.mealId}'`;
      pool.query(priceQuery, (err, result) => {
        if (result.rowCount > 0) {
          totalPrice += (result.rows[0].mealprice * meal.quantity);
          console.log(`TotalPrice: ${totalPrice}`);
        }
      });
    });
    return totalPrice;
  }
}

export default Utilities;
