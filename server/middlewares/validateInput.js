import Validator from '../utilities/inputValidator';

/**
 * @class InputValidator
 */
class InputValidator {
  /**
 * @function validateLogin
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
  static validateLogin(req, res, next) {
    const { email, password } = req.body;
    if (Validator.validate('email', email) && Validator.validate('password', password)) {
      return next();
    }

    return res.status(400).json({
      status: 'failed',
      message: 'This is not a valid email or password',
    });
  }

  /**
 * @function validateSignup
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
  static validateSignup(req, res, next) {
    const { lastname, firstname, isAdmin } = req.body;
    if (Validator.validate('lastname', lastname) && Validator.validate('firstname', firstname) && (isAdmin === 'false' || isAdmin === 'true')) {
      return next();
    }
    return res.status(400).json({
      status: 'failed',
      message: 'An incorrect parameter has been supplied',
    });
  }
}
export default InputValidator;
