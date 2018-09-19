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
  database: process.env.DB_NAME1,
  host: process.env.DB_HOST1,
  user: process.env.DB_USER1,
  password: process.env.DB_PASSWORD1,
  port: process.env.DB_PORT1,
};

const pool = (process.env.NODE_ENV === 'test') ? new pg.Pool(testConfig) : new pg.Pool(databaseConfig);

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
  isAdmin boolean NOT NULL,
  timeUserRegistered TIMESTAMP NOT NULL DEFAULT NOW()

)`;

pool.query(createUserTable, () => {
  console.log('User Table Created!!');
});

export default pool;
