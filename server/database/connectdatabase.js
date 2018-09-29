import tableObject from './createTables';

const createUserTable = async () => {
  await tableObject.pool.query(tableObject.createUserTable);
};
const createMenuTable = async () => {
  await tableObject.pool.query(tableObject.createMenuTable);
};
const createOrdersTable = async () => {
  await tableObject.pool.query(tableObject.createOrdersTable);
};

createUserTable();
createMenuTable();
createOrdersTable();

const { pool } = tableObject;
export default pool;
