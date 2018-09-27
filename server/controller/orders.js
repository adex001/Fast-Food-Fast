import pool from '../database/connectdatabase';
import Utilities from '../utilities/UtilClass';
import getMenu from '../utilities/getMenu';
import getUser from '../utilities/getUser';
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

  static getAllOrders(req, res) {
    // console.log(getUser(1));
    // console.log(getMenu([{ mealId: 1, quantity: 2 }]));
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
