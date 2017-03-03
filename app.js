var express  	 = require('express');
var app      	 = express();

var bodyParser   = require('body-parser');
var morgan 		 = require('morgan')
var mongoose  	 = require('mongoose');
var path 		 = require('path');

var configDB 	 = require('./models/database');
mongoose.connect(configDB.url);

var port 		 = process.env.PORT||5000 ; // port will running into 5000

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // get information from html forms

app.set('view engine', 'ejs'); // set engine for application
app.set('views', path.join(__dirname, 'views')); // set static folder
var index = require('./controllers/index'); // include file index.js in controllers folder
var newindex = require('./controllers/newindex');
app.use('/api/user', index); // describe router for application
app.use('/', newindex);

app.listen(port);
console.log('The magic happens on port ' + port);
