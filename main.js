
import express from 'express';
import cors from 'cors';
import db from './utils/db-connection.js';
import expenseRouter from './routes/expenseRoutes.js';
import './models/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/expense', expenseRouter);

db.sync({ alter: true })
  .then(() => {
    console.log("database is connected");
    app.listen(5000, (err) => {       
      if (err) {  
        console.log(err);
      } else {
        console.log('Server is running on port 5000');
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
 

