import { Router } from 'express';

import emailVerifier from '../middlewares/emailVerifier';
import AuthController from '../controller/auth';

const authRoute = Router();

authRoute.post('/signup', emailVerifier, AuthController.signup);

export default authRoute;
