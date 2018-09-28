import { Router } from 'express';

import MenuController from '../controller/menu';
import TokenHandler from '../middlewares/tokenHandler';
import mealNameCheck from '../middlewares/mealChecker';

const menuRoute = Router();
// Check meal name
menuRoute.post('/', TokenHandler.verifyToken, TokenHandler.isAdmin, mealNameCheck, MenuController.createMeal)
  .get('/', TokenHandler.verifyToken, MenuController.getAllFoodItems)
  .put('/:mealId', TokenHandler.verifyToken, TokenHandler.isAdmin, mealNameCheck, MenuController.updateFoodItem)
  .delete('/:mealId', TokenHandler.verifyToken, TokenHandler.isAdmin, MenuController.deleteFoodItem);

export default menuRoute;
