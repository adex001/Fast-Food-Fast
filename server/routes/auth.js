import { Router } from 'express';

import AuthController from '../controller/auth';

const authRoute = Router();

authRoute.post('/signup', AuthController.signup);

export default authRoute;
