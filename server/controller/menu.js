import pool from '../database/connectdatabase';
import Validator from '../utilities/inputValidator';

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
    if (!Validator.validateString(mealName)) {
      return res.status(400).json({
        status: 'failed',
        message: 'Mealname has an invalid parameter',
      });
    }
    if (!Validator.validateString(mealImageUrl)) {
      return res.status(400).json({
        status: 'failed',
        message: 'mealImageUrl has an invalid parameter',
      });
    }
    if (!Validator.validateString(mealDescription)) {
      return res.status(400).json({
        status: 'failed',
        message: 'Meal Description has an invalid parameter',
      });
    }
    if (Validator.validateInt(mealPrice)) {
      return res.status(400).json({
        status: 'failed',
        message: 'Meal Price has an invalid parameter',
      });
    }
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
      return null;
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
      if (err) {
        return res.status(500).json({
          status: 'failed',
          message: 'internal server error',
          err,
        });
      }
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

  /**
  * UpdateFoodItem Controller updates a meal in the database
  * @param {string} req - The request to the server
  * @param {string} res - The response from the server.
  */
  static updateFoodItem(req, res) {
    const mealId = parseInt(req.params.mealId, 10);
    const { mealName, mealImageUrl, mealDescription } = req.body;
    const mealPrice = parseFloat(req.body.mealPrice);
    const updateMealQuery = `UPDATE menu SET mealName = '${mealName}',
    mealimageurl = '${mealImageUrl}',
    mealdescription = '${mealDescription}',
    mealprice = '${mealPrice}'
    WHERE mealid = '${mealId}' RETURNING *;`;
    pool.query(updateMealQuery, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 'failed',
          message: 'internal server error',
        });
      }
      if (result.rowCount > 0) {
        return res.status(200).json({
          status: 'success',
          message: 'Meal has been updated in the menu',
          data: result.rows[0],
        });
      }
      return null;
    });
  }

  /**
  * Delete Food Item Controller deletes a meal from the menu
  * @param {string} req - The request to the server
  * @param {string} res - The response from the server.
  */
  static deleteFoodItem(req, res) {
    const mealId = parseInt(req.params.mealId, 10);
    const deleteQuery = `DELETE FROM menu WHERE mealid = '${mealId}' RETURNING *`;
    pool.query(deleteQuery, (err, result) => {
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 'failed',
          message: 'cannot find that meal',
        });
      }
      return res.status(200).json({
        status: 'success',
        message: 'meal successfully deleted',
      });
    });
  }
}

export default MenuController;
