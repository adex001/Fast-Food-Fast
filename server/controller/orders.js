import orders from '../dummymodel/orders';
import users from '../dummymodel/users';

class OrderController {
  // COntroller to fetch all orders
  static getAllOrders(req, res) {
    res.status(200).json({
      status: 'success',
      data: orders,
    });
  }

  // Controller to fetch a specific order
  static fetchSpecificOrder(req, res) {
    const { ordersId } = req.params;

    const mapper = Objectid => Objectid.ordersId === parseInt(ordersId, 10);

    const found = orders.find(mapper);

    if (found) {
      res.status(200).json({
        status: 'success',
        data: found,
      });
    } else {
      res.status(404).json({
        status: 'failed',
        message: 'Order not found!',
      });
    }
  }

  // Controller to place a single order
  static addOrder(req, res) {
    const {
      meals, orderStatus, totalPrice,
    } = req.body;
    // Checks the parameters in the meal array
    const userId = 1;
    const orderObject = {
      ordersId: orders.length + 1,
      ordersDate: new Date(),
      users: users[userId],
      meals,
      orderStatus,
      totalPrice,
    };

    // Push to the orders array
    orders.push(orderObject);

    return res.status(201).json({
      status: 'success',
      message: 'Order was placed',
      data: orderObject,
    });
  }

  static updateOrder(req, res) {
    const { ordersId } = req.params;

    const mapper = Objectid => Objectid.ordersId === parseInt(ordersId, 10);

    const found = orders.find(mapper);

    if (found) {
      // Update the order
      const {
        meals, orderStatus, totalPrice,
      } = req.body;
      found.meals = meals;
      found.orderStatus = orderStatus;
      found.totalPrice = totalPrice;

      res.status(200).json({
        message: 'Order was updated',
        data: found,
      });
    } else {
      res.status(404).json({
        status: 'failed',
        message: 'Order not found!',
      });
    }
  }
}

export default OrderController;
