import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const databaseConfig = {
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const testConfig = {
  database: process.env.TEST_DB_NAME,
  host: process.env.TEST_DB_HOST,
  user: process.env.TEST_DB_USER,
  password: process.env.TEST_DB_PASSWORD,
  port: process.env.TEST_DB_PORT,
};

const pool = process.env.NODE_ENV === 'test' ? new pg.Pool(testConfig) : new pg.Pool(databaseConfig);

const createUserTable = `CREATE TABLE IF NOT EXISTS users (
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

)`;
const createMenuTable = `CREATE TABLE IF NOT EXISTS menu (
  mealId serial PRIMARY KEY,
  mealName varchar(50) UNIQUE,
  mealImageUrl varchar(300),
  mealDescription varchar (300),
  mealPrice DECIMAL
)`;
const createOrdersTable = `CREATE TABLE IF NOT EXISTS orders(
  ordersId serial PRIMARY KEY,
  orderDate TIMESTAMP NOT NULL DEFAULT NOW(),
  userId serial REFERENCES users(userId),
  sales INTEGER[] NOT NULL,
  orderStatus varchar(30)
)`;

const createSalesTable = `CREATE TABLE IF NOT EXISTS sales(
  salesId serial PRIMARY KEY,
  menuId serial REFERENCES menu(mealId),
  userId serial REFERENCES users(userId),
  quantity INTEGER DEFAULT 1,
  totalPrice DECIMAL,
  salesConfirmed boolean DEFAULT FALSE
)`;

pool.query(`${createUserTable}; ${createMenuTable}; ${createOrdersTable}; ${createSalesTable}`, () => {
  console.log('Users Table, Menu Table, Sales Table and Orders Table Created!!');
  console.log(process.env.NODE_ENV);
});

export default pool;
