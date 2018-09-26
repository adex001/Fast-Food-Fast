import pool from '../database/connectdatabase';
import getMenu from '../utilities/getMenu';
import getUser from '../utilities/getUser';

class OrderController {
  // COntroller to fetch all orders
  static getAllOrders(req, res) {
    const allOrdersQuery = 'SELECT * FROM orders';
    pool.query(allOrdersQuery, (err, result) => {
      if (result.rowCount < 0) {
        return res.status(404).json({
          status: 'failed',
          message: 'No order found',
        });
      }
      const orderArray = result.rows;
      const orders = [];
      // LOOPS THROUGH AND PUSH OBJECT TO THE ARRAY
      orderArray.forEach((order) => {
        const ordersObject = {
          ordersId: order.ordersid,
          ordersDate: order.orderdate,
          orderStatus: order.orderstatus,
          totalPrice: order.totalprice,
          user: getUser(order.userid),
          meals: getMenu(order.meals),
          meals1: order.meals,
        };

        orders.push(ordersObject);
      });
      return res.status(200).json({
        status: 'success',
        message: 'All orders retrieved',
        orders,
      });
    });
  }
}

export default OrderController;
