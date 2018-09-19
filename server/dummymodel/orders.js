import users from './users';

const orders = [
  {
    ordersId: 1,
    ordersDate: '14/9/2018 1:36AM',
    user: users[0],
    meals: [{
      mealId: 1,
      quantity: 3,
    },
    {
      mealId: 2,
      quantity: 4,
    },
    ],
    totalPrice: 2000,
    orderStatus: 'Delivered',
  },
  {
    ordersId: 2,
    ordersDate: '14/9/2018 1:39AM',
    user: users[1],
    meals: [{
      mealId: 3,
      quantity: 1,
    },
    {
      mealId: 1,
      quantity: 2,
    },
    ],
    totalPrice: 2000,
    orderStatus: 'Pending',
  },
  {
    ordersId: 3,
    ordersDate: '14/9/2018 1:39AM',
    user: users[0],
    meals: [{
      mealId: 2,
      quantity: 3,
    },
    {
      mealId: 2,
      quantity: 1,
    },
    ],
    totalPrice: 2000,
    orderStatus: 'Cancelled',
  },
];

export default orders;
