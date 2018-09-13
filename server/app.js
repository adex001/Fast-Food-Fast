import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to fast-food-fast API',
  });
});

app.listen(port, () => {
  console.log(`App started and running on port ${port}`);
});