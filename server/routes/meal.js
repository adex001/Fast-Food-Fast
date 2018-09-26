import { Router } from 'express';

import MenuController from '../controller/menu';
import TokenHandler from '../middlewares/tokenHandler';

const menuRoute = Router();

menuRoute.post('/', TokenHandler.verifyToken, TokenHandler.isAdmin, MenuController.createMeal)
  .get('/', MenuController.getAllFoodItems)
  .put('/:mealId', TokenHandler.verifyToken, TokenHandler.isAdmin, MenuController.updateFoodItem);

export default menuRoute;
