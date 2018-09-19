import { Router } from 'express';

import OrderController from '../controller/orders';
import Validator from '../middlewares/validator';

const ordersRoute = Router();

ordersRoute.get('/', OrderController.getAllOrders);

ordersRoute.get('/:ordersId', OrderController.fetchSpecificOrder);

ordersRoute.post('/', Validator.mealValidator, OrderController.addOrder);

ordersRoute.put('/:ordersId', Validator.mealValidator, OrderController.updateOrder);

export default ordersRoute;
