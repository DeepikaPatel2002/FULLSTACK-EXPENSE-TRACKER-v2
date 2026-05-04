

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('expense_tracker', 'root', '987654', {
  host: 'localhost',
  dialect: 'mysql'
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database has been created");
  } catch (err) {
    console.log(err);
  }
})();

export default sequelize;