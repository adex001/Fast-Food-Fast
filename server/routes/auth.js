import { Router } from 'express';

import emailVerifier from '../middlewares/emailVerifier';
import ValidateInput from '../middlewares/validateInput';
import AuthController from '../controller/auth';

const authRoute = Router();

authRoute.post('/signup', ValidateInput.validateLogin, ValidateInput.validateSignup, emailVerifier, AuthController.signup);
authRoute.post('/login', ValidateInput.validateLogin, AuthController.signin);

export default authRoute;
