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

  /**
 * Get a specific order Controller retrieves a specific order
 * @param {string} req - The request to the server
 * @param {string} res - The response from the server.
 */
  static getSpecificOrder(req, res) {
    let { ordersId } = req.params;
    ordersId = parseInt(ordersId, 10);
    const allOrdersQuery = `SELECT * FROM orders where ordersid = '${ordersId}'`;
    pool.query(allOrdersQuery, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 'failed',
          message: 'internal server error!',
        });
      }
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 'failed',
          message: 'Order not found',
        });
      }
      if (result.rowCount > 0) {
        return res.status(201).json({
          status: 'success',
          message: 'Order found',
          data: result.rows[0],
        });
      }
    });
  }

  /**
 * Get a specific order Controller retrieves a specific order
 * @param {string} req - The request to the server
 * @param {string} res - The response from the server.
 */
  static getUserSpecificOrder(req, res) {
    const { userId } = req.params;
    const query = `SELECT * FROM orders WHERE userId = '${userId}'`;

    pool.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 'failed',
          message: 'internal server error',
        });
      }
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 'failed',
          message: 'No orders found',
        });
      }
      if (result.rowCount > 0) {
        return res.status(200).json({
          status: 'success',
          message: 'Particular user order',
          data: result.rows,
        });
      }
    });
  }

  /**
 * Create Order Controller places a new order
 * @param {string} req - The request to the server
 * @param {string} res - The response from the server.
 */
  static createAnOrder(req, res) {
    const { meals, totalPrice } = req.body;
    const { userId } = req.decoded;
    const insertQuery = `INSERT INTO orders (meals, totalprice, userid, orderstatus) VALUES ('${JSON.stringify(meals)}', '${totalPrice}', '${userId}', 'NEW') RETURNING *`;
    pool.query(insertQuery, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 'failed',
          message: 'internal server error',
        });
      }
      if (result.rowCount > 0) {
        return res.status(201).json({
          status: 'success',
          message: 'Order successfully placed',
          data: result.rows[0],
        });
      }
    });
  }
  /**
 * Update Order Controller update the status of an order
 * @param {string} req - The request to the server
 * @param {string} res - The response from the server.
 */

  static updateOrder(req, res) {
    const { orderstatus } = req.body;
    const { ordersId } = req.params;
    if (orderstatus !== 'New' && orderstatus !== 'Processing' && orderstatus !== 'Cancelled' && orderstatus !== 'Complete') {
      return res.status(400).json({
        status: 'failed',
        message: 'OrderStatus should be either New, Processing, Cancelled or Complete',
      });
    }
    const updateQuery = `UPDATE orders SET orderstatus = '${orderstatus}'
    WHERE ordersid = '${ordersId}' RETURNING *`;
    pool.query(updateQuery, (err, result) => {
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 'failed',
          message: 'Order does not exist',
        });
      }
      if (result.rowCount > 0) {
        return res.status(200).json({
          status: 'success',
          data: result.rows[0],
        });
      }
    });
    return null;
  }
}

export default OrderController;
