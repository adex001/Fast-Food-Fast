import pool from '../database/connectdatabase';

const mealNameCheck = (req, res, next) => {
  const { mealName } = req.body;
  pool.query(`SELECT * FROM menu WHERE mealname = '${mealName}'`, (err, result) => {
    if (result.rowCount > 0) {
      return res.status(400).json({
        status: 'failed',
        message: 'meal already exists, add another',
      });
    }
    return next();
  });
};

export default mealNameCheck;
