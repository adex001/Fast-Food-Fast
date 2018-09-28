import pool from '../database/connectdatabase';
import getUser from '../utilities/getUser';

class OrderController {
  // COntroller to fetch all orders
  static getAllOrders(req, res) {
    const allOrdersQuery = 'SELECT * FROM orders';
    pool.query(allOrdersQuery, (err, result) => {
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 'failed',
          message: 'No order found',
        });
      }
      getUser(result.rows[0].userid).then((userdata) => {
        const displayData = {
          ordersid: result.rows[0].ordersid,
          ordersdate: result.rows[0].ordersdate,
          userdata,
        };

        return res.status(200).json({
          status: 'success',
          message: 'all orders successfully retrieved',
          data: displayData,
        });
      });
    });
  }
}

export default OrderController;
