
import express from 'express';
import cors from 'cors';
import db from './utils/db-connection.js';
import expenseRouter from './routes/expenseRoutes.js';
import './models/index.js';
import User from './models/user.js'
import userRouter from './routes/userRoutes.js'


const app = express();

app.use(cors());
app.use(express.json());

app.use('/expense', expenseRouter);
app.use('/user',userRouter)


db.sync() 
  .then(() => {
    console.log("database is connected");
    app.listen(4000, (err) => {       
      if (err) {  
        console.log(err)
      } else {
        console.log('Server is running on port 3000');
      }
    });
  })
  .catch((err) => {
    console.log(err);
     
  });
 

