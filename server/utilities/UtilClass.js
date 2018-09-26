import pool from '../database/connectdatabase';

class Utilities {
  constructor() {
    this.totalPrice = 0;
  }

  static getTotalPrice(meals) {
    meals.forEach((meal) => {
      // {mealId: 1, quantity: 23}
      const priceQuery = `SELECT mealprice from menu WHERE mealid = '${meal.mealId}'`;
      pool.query(priceQuery, (err, result) => {
        if (result.rowCount > 0) {
          this.totalPrice += (result.rows[0].mealprice * meal.quantity);
        }
      });
    });
    return this.totalPrice;
  }
}

export default Utilities;
