import { Router } from 'express';
import Sales from '../controller/sales';
import TokenHandler from '../middlewares/tokenHandler';

const salesRoute = Router();
salesRoute.post('/', TokenHandler.verifyToken, Sales);

export default salesRoute;
