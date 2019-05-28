var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var localStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');


mongoose.connect('mongodb://localhost/yelpcamp_blogproject', {useNewUrlParser: true});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));

// ========================================
// R O U T E S
// ========================================

//root route
app.get('/', function(req, res) {
    res.send('root route');
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log('yelpcamp blog project server started!');    
});