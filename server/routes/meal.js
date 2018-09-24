import { Router } from 'express';

import MenuController from '../controller/menu';
import TokenHandler from '../middlewares/tokenHandler';

const menuRoute = Router();

menuRoute.post('/', TokenHandler.verifyToken, TokenHandler.isAdmin, MenuController.createMeal);

export default menuRoute;
