import pool from '../database/connectdatabase';
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
    const { meals } = req.body;
    // meals is a string array referencing cart. [1,3,2,12]
    const { userId } = req.decoded;
    const placeOrderQuery = `INSERT INTO orders ( userId, orderStatus, meals) VALUES ('${userId}', 'NEW', '${meals}') RETURNING *`;
    pool.query(placeOrderQuery, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 'failed',
          message: 'internal server error!',
          err,
        });
      }
      // Go and confirm sales
      return res.status(201).json({
        status: 'success',
        message: 'An order has been placed',
        data: result.rows[0],
      });
    });
  }
}
export default OrderController;
