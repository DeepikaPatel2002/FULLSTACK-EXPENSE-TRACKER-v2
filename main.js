
const express = require('express');
// const bodyParser = require('body-parser');
const sequelize = require('./utils/db-connection.js');
const { User, Category, Expense } = require('./models/index.js');
const expenseRoutes = require('./routes/expenseRoutes.js');

const cors = require('cors');

const app = express();
app.use(express.json());


app.use(cors());

// Routes
app.use('/expense', expenseRoutes);

// Sync DB with associations
sequelize.sync()
  .then(() => console.log("Database synced with associations"))
  .catch(err => console.error("Error syncing DB", err));

app.listen(4000, () => console.log("Server running on port 4000"));
