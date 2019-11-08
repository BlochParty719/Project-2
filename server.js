// Dependencies
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()

// Port
const Port = process.env.PORT

// Database
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify:
false})

//Controller
const arcadeController = require('./controllers/arcade.js')
app.use('/arcade', arcadeController)

const usersController = require('./controllers/users.js')
app.use('/users', usersController)

const sessionsController = require('./controllers/sessions.js')
app.use('/sessions', sessionsController)

app.get()

// Route for Home Page
app.get('/', (req, res) => {
  res.render('index.ejs')
})

// Error / Success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(json())
app.use(methodOverride('_method'))

// Routes
app.get('/', (req, res) => {
  res.send('Hello world')
})

// Listener
app.listen(Port, () => {
  console.log('Listening on port:', Port);
})
