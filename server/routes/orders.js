import { Router } from 'express';

import OrderController from '../controller/orders';
import TokenHandler from '../middlewares/tokenHandler';

const ordersRoute = Router();

ordersRoute.get('/', TokenHandler.isAdmin, OrderController.getAllOrders);

export default ordersRoute;
