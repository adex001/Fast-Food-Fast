import { Router } from 'express';

const foodRoute = Router();

foodRoute.get('/', (req, res) => {
  res.json({
    message: 'gets all fast-food items',
  });
});

foodRoute.post('/', (req, res) => {
  res.json({
    message: 'Adds a fast-food item',
  });
});
foodRoute.put('/:fooditem', (req, res) => {
  res.json({
    message: 'Updates a particular food item',
  });
});
foodRoute.delete('/:fooditem', (req, res) => {
  res.json({
    message: 'Deletes a particular food item',
  });
});

export default foodRoute;
