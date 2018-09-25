import pool from '../database/connectdatabase';

const Sales = ((req, res) => {
  const { mealId, quantity } = req.body;
  let salesObject = null;
  let totalPrice = 0;

  if (typeof parseInt(mealId, 10) !== 'number' && typeof parseInt(quantity, 10) !== 'number') {
    return res.status(400).json({
      status: 'failed',
      message: 'quantity and mealId should be an integer',
    });
  }
  const salesQuery = `SELECT * FROM menu WHERE mealId = '${mealId}' `;
  // Validates the mealId
  pool.query(salesQuery, (err, result) => {
    if (err) {
      return res.status(400).json({
        status: 'failed',
        message: 'quantity and mealId should be an integer',
      });
    }
    if (result.rowCount < 1) {
      return res.status(404).json({
        status: 'failed',
        message: 'Meal not found!',
      });
    }
    // eslint-disable-next-line
    salesObject = result.rows[0];
    totalPrice += (salesObject.mealprice * quantity);
    // Inserts the data
    const insertSalesQuery = `INSERT INTO sales (menuId, totalPrice, quantity, userid) VALUES ('${mealId}', '${totalPrice}', '${quantity}', '${req.decoded.userId}') RETURNING *`;
    pool.query(insertSalesQuery, (error, result2) => {
      if (error) {
        return res.status(500).json({
          status: 'failed',
          message: 'internal server error',
        });
      }
      return res.status(201).json({
        status: 'success',
        message: 'sales added to cart',
        data: result2.rows[0],
      });
    });
  });
});

export default Sales;
