CREATE TABLE IF NOT EXISTS users (
  userId serial PRIMARY KEY,
  email varchar(80) UNIQUE,
  password varchar(400),
  sex varchar(10),
  firstname varchar(50),
  lastname varchar(50),
  address varchar(150),
  city varchar(40),
  state varchar(30),
  country varchar(30),
  isAdmin boolean NOT NULL DEFAULT FALSE,
  timeUserRegistered TIMESTAMP NOT NULL DEFAULT NOW()

)

CREATE TABLE IF NOT EXISTS menu (
  mealId serial PRIMARY KEY,
  mealName varchar(50) UNIQUE,
  mealImageUrl varchar(300),
  mealDescription varchar (300),
  mealPrice DECIMAL
)

CREATE TABLE IF NOT EXISTS orders(
  ordersId serial PRIMARY KEY,
  orderDate TIMESTAMP NOT NULL DEFAULT NOW(),
  userId serial REFERENCES users(userId),
  meals INTEGER [] NOT NULL,
  totalPrice DECIMAL,
  orderStatus varchar(30)
)

