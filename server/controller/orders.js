import orders from '../dummymodel/orders';

class OrderController {
  // COntroller to fetch all orders
  static getAllOrders(req, res) {
    res.status(200).json({
      message: 'Gets all orders!!',
      orders,
    });
  }

  // Controller to fetch a specific order
  static fetchSpecificOrder(req, res) {
    const { ordersId } = req.params;

    const mapper = Objectid => Objectid.ordersId === parseInt(ordersId, 10);

    const found = orders.find(mapper);

    if (found) {
      res.status(200).json({
        message: 'Fetches a single order',
      });
    } else {
      res.status(404).json({
        message: 'Order not found!',
      });
    }
  }

  // Controller to place a single order
  static addOrder(req, res) {
    const { ordersId, meals } = req.body;

    const orderObject = {
      ordersId,
      ordersDate: new Date(),
      meals,
    };

    // Push to the orders array
    orders.push(orderObject);

    return res.status(201).json({
      message: 'place a single order',
    });
  }

  static updateOrder(req, res) {
    const { ordersId } = req.params;

    const mapper = Objectid => Objectid.ordersId === parseInt(ordersId, 10);

    const found = orders.find(mapper);

    if (found) {
      // Update the order
      const { meals } = req.body;
      found.meals = meals;
      res.status(200).json({
        message: 'Updates a specific order',
      });
    } else {
      res.status(404).json({
        message: 'Order not found!',
      });
    }
  }
}

export default OrderController;
