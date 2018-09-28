import { Router } from 'express';

import OrderController from '../controller/orders';

const ordersRoute = Router();

ordersRoute.get('/', OrderController.getAllOrders);

export default ordersRoute;
