const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth.js')
const userRoute = require('./routes/user.js')
const commentRoute = require('./routes/comments.js')
const videoRoute = require('./routes/videos.js')
const cookieParser = require('cookie-parser')

require('dotenv').config();
const app = express();


app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/comments', commentRoute);
app.use('/api/videos', videoRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something is wrong";
  return res.status(status).json({
    success: false,
    status,
    message
  })
})

const connect = () =>  mongoose.connect(process.env.MONGO).then( () => console.log('Database is successfully connected')).catch( (err) => console.log(err));


const server = app.listen(8800, () => {
  connect();  
  console.log(`Server is connected`);
})