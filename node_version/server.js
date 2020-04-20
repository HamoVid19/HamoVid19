const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const users = require('./routes/api/users')

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set up data base
const db = require('./config/keys').mongoURI
mongoose
  .connect(db, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false,useCreateIndex: true,})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

//routes
app.use('/api/users', users)
const port = 5000 || process.env.PORT
app.listen(port,()=>{
  console.log(`server running at port ${port}`)
})