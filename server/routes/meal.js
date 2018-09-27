import { Router } from 'express';

import MenuController from '../controller/menu';
import TokenHandler from '../middlewares/tokenHandler';
import mealNameCheck from '../middlewares/mealChecker';

const menuRoute = Router();
// Check meal name
menuRoute.post('/', TokenHandler.verifyToken, TokenHandler.isAdmin, mealNameCheck, MenuController.createMeal)
  .get('/', MenuController.getAllFoodItems)
  .put('/:mealId', TokenHandler.verifyToken, TokenHandler.isAdmin, mealNameCheck, MenuController.updateFoodItem);

export default menuRoute;
