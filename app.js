const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database,{useNewUrlParser:true, useUnifiedTopology: true}).then(() => {
    console.log('Connected to database: ' +config.database);
}, err => {
    console.log('Error connecting to database');
});

const app = express();

const users = require('./routes/users');

// Port Number
const port = 8080;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Index Route
app.get('/', (req,res) => {
    res.send('Invalid Endpoint');
});

// User Route
app.use('/users', users);

// Start Server
app.listen(port, () => {
    console.log('Server started on port ' +port);
});