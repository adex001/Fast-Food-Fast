import pool from '../database/connectdatabase';
/**
 * Order Controller Class
 */
class OrderController {
  /**
 * Get all orders Controller retrieves all orders made
 * @param {string} req - The request to the server
 * @param {string} res - The response from the server.
 */
  static getAllOrders(req, res) {
    const allOrdersQuery = 'SELECT * FROM orders';
    pool.query(allOrdersQuery, (err, result) => {
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 'failed',
          message: 'No order found',
        });
      }
      return res.status(200).json({
        status: 'success',
        message: 'all orders returned',
        data: result.rows,
      });
    });
  }
}

export default OrderController;
