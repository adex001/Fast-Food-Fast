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
  timeUserRegistered TIMESTAMP NOT NULL DEFAULT NOW()

)
