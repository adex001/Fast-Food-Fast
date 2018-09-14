import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import ordersRoute from './routes/orders';
import foodRoute from './routes/foodItem';

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/v1/orders', ordersRoute);
app.use('/api/v1/fooditem', foodRoute);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to fast-food-fast API',
  });
});

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`App started and running on port ${port}`);
});

export default app;
