import { Router } from 'express';
import TokenHandler from '../middlewares/tokenHandler';

import OrderController from '../controller/orders';

const ordersRoute = Router();

ordersRoute.get('/', TokenHandler.verifyToken, TokenHandler.isAdmin, OrderController.getAllOrders);
ordersRoute.get('/:ordersId', TokenHandler.verifyToken, TokenHandler.isAdmin, OrderController.getSpecificOrder);

export default ordersRoute;
