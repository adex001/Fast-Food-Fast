import checker from '../utilities/queryChecker';

class AuthController {
  static signup(req, res) {
    const {
      email, password, lastname, firstname,
    } = req.body;
    // Check if Username exists
    if (checker(email) === true) {
      return res.status(400).json({
        status: 'failed',
        message: 'Email Address already exists',
      });
    }
  }
}

export default AuthController;
