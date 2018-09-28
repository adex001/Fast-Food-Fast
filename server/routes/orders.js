import { Router } from 'express';
import TokenHandler from '../middlewares/tokenHandler';

import OrderController from '../controller/orders';

const ordersRoute = Router();

ordersRoute.get('/orders', TokenHandler.verifyToken, TokenHandler.isAdmin, OrderController.getAllOrders)
  .get('/orders/:ordersId', TokenHandler.verifyToken, TokenHandler.isAdmin, OrderController.getSpecificOrder)
  .get('/users/:userId/orders', TokenHandler.verifyToken, OrderController.getUserSpecificOrder)
  .post('/orders', TokenHandler.verifyToken, OrderController.createAnOrder);

export default ordersRoute;
