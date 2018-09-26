import pool from '../database/connectdatabase';
import Utilities from '../utilities/UtilClass';
/**
 * OrderController class
 */
class OrderController {
  /**
  * Place Order Controller places an order for a specific user
  * @param {string} req - The request to the server
  * @param {string} res - The response from the server.
  */
  static placeOrder(req, res) {
    const { meals } = req.body; // [{mealId: 1, quantity: 23}]
    const { userId } = req.decoded;
    const totalPrice = Utilities.getTotalPrice(meals);
    console.log(`totalPrice: ${Utilities.getTotalPrice(meals)}`);
    const placeOrderQuery = `INSERT INTO orders ( userId, orderStatus, meals, totalPrice) VALUES ('${userId}', 'NEW', '${JSON.stringify(meals)}', '${totalPrice}') RETURNING *`;
    pool.query(placeOrderQuery, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 'failed',
          message: 'internal server error!',
          err,
        });
      }
      return res.status(201).json({
        status: 'success',
        message: 'order has been placed',
        data: result.rows[0],
      });
    });
  }
}
export default OrderController;
