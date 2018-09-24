import users from './users';
import meals from './meals';

const orders = [
  {
    ordersId: 1,
    ordersDate: '14/9/2018 1:36AM',
    user: users[0],
    meals: [{
      meal: meals[0],
      quantity: 3,
    },
    {
      meal: meals[1],
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
      meal: meals[2],
      quantity: 1,
    },
    {
      meal: meals[0],
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
      meal: meals[1],
      quantity: 3,
    },
    {
      meal: meals[3],
      quantity: 1,
    },
    ],
    totalPrice: 2000,
    orderStatus: 'Cancelled',
  },
];

export default orders;
