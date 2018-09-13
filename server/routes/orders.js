import { Router } from 'express';

const ordersRoute = Router();

ordersRoute.get('/', (req, res) => {
  res.json({
    message: 'Gets all orders!!',
  });
});

ordersRoute.get('/:orderId', (req, res) => {
  res.json({
    message: 'Fetches a single order',
  });
});

ordersRoute.post('/', (req, res) => {
  res.json({
    message: 'place a single order',
  });
});

ordersRoute.put('/:orderId', (req, res) => {
  res.json({
    message: 'Updates the status of an order'
  });
});

export default ordersRoute;