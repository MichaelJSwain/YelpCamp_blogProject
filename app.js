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

// SCHEMA / MODEL SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    info: String,
    created: {type: Date, default: Date.now()}
});

var Campground = mongoose.model("campground", campgroundSchema);


// ========================================
// R O U T E S
// ========================================

//root route
app.get('/', function(req, res) {
    res.render("home");
});
//index route
app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds", {campgrounds: campgrounds});
        }
    })  
});
//New route
app.get("/campgrounds/new", function(req, res) {
    res.render("new"); 
});
//Create route
app.post("/campgrounds", function(req, res) {
    Campground.create(req.body.campground, function(err, createdCampground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
});
//Show route
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render('show', {campground: foundCampground});
        }
    });
});
//Edit route
app.get("/campgrounds/:id/edit", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render('edit', {campground: campground});
        }
    })
});
//Update route
app.put("/campgrounds/:id", function(req, res) {
    res.redirect("/campgrounds"); 
});
//Delete route
app.delete("/campgrounds/:id", function(req, res) {
    res.redirect("/campgrounds");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log('yelpcamp blog project server started!');    
});