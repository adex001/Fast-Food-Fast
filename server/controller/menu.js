import pool from '../database/connectdatabase';

/**
 * Menu Controller class deals with all menu functions
 */

class MenuController {
  /**
 * Create Meal Controller creates a new meal and adds it to the database
 * @param {string} req - The request to the server
 * @param {string} res - The response from the server.
 */
  static createMeal(req, res) {
    const {
      mealName, mealImageUrl, mealDescription, mealPrice,
    } = req.body;
    const addMealQuery = `INSERT INTO menu (mealName, mealImageUrl, mealDescription, mealPrice) VALUES ('${mealName}', '${mealImageUrl}', '${mealDescription}', '${mealPrice}') RETURNING *;`;
    pool.query(addMealQuery, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 'failed',
          message: 'internal server error',
        });
      }
      if (result.rowCount > 0) {
        return res.status(201).json({
          status: 'success',
          message: 'Meal has been added to the menu',
          data: result.rows[0],
        });
      }
    });
  }

  /**
 * getAllFoodItems retrieves all food-items from the menu database
 * @param {string} req - The request to the server
 * @param {string} res - The response from the server.
 */
  static getAllFoodItems(req, res) {
    const getAllFoodItemsQuery = 'SELECT * FROM menu';
    pool.query(getAllFoodItemsQuery, (err, result) => {
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 'success',
          message: 'It\'s empty here! Add a meal item now',
        });
      }
      return res.status(200).json({
        status: 'success',
        message: 'All food items successfully retrieved',
        data: result.rows,
      });
    });
    return null;
  }
}

export default MenuController;
