require('dotenv').config();

// entry file for backend

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// express app 만들기
const app = express();

// middleware
app.use(express.json());
//

// to move onto next middleware
app.use((req, res, next) => {
  // to log each requests
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);
// 1st arguement :
// grab all workoutRoutes and use it

// connect to db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('listening on port', process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
