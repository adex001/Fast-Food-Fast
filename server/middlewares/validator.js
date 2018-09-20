// Order Validator
class Validator {
  static mealValidator(req, res, next) {
    const {
      meals, orderStatus, totalPrice,
    } = req.body;
    if (orderStatus === 'Pending' || orderStatus === 'Cancelled' || orderStatus === 'Delivered') {
      if (typeof totalPrice === 'undefined' || typeof totalPrice !== 'number' || totalPrice < 0) {
        return res.status(400).json({
          status: 'false',
          message: 'Total price should be a number greater than zero',
        });
      }
      // Checks if meals is an array
      if (Array.isArray(meals)) {
      // Check if meal is an object
        meals.forEach((meal) => {
          if (typeof meal === 'object') {
            if ((typeof meal.mealsId === 'number' && meal.mealsId > 0) && (typeof meal.quantity === 'number' && meal.quantity >= 0)) {
              if (meal.quantity === 0) {
                meal.quantity += 1;
              }
              return next();
            }
            // Give error when mealsId or quantity is not a number
            return res.status(400).json({
              status: 'false',
              message: 'Meal or quantity is not a number or less than 1!',
            });
          }
          // Give error when it is not an object
          return res.status(400).json({
            status: 'false',
            message: 'Meal is not an object!',
          });
        });
      } else {
      // Return an error below
        return res.status(400).json({
          status: 'false',
          message: 'Meals should be an array!',
        });
      }
    } else {
      return res.status(400).json({
        status: 'failed',
        message: 'Order status should be either Pending, Delivered or Cancelled',
      });
    }
    return null;
  }
}

export default Validator;
