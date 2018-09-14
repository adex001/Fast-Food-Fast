import { Router } from 'express';

import OrderController from '../controller/orders';

const ordersRoute = Router();

ordersRoute.get('/', OrderController.getAllOrders);

ordersRoute.get('/:ordersId', OrderController.fetchSpecificOrder);

ordersRoute.post('/', OrderController.addOrder);

ordersRoute.put('/:ordersId', OrderController.updateOrder);

export default ordersRoute;
