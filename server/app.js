import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

import ordersRoute from './routes/orders';
import authRoute from './routes/auth';
import menuRoute from './routes/meal';

dotenv.config();

const app = express();
const port = process.env.PORT;
const swaggerDoc = yaml.load(`${process.cwd()}/swagger.yaml`);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/', ordersRoute);
app.use('/api/v1/menu', menuRoute);


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
