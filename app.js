var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var CampGround = require("./models/campground");
var seedDB = require("./seeds")

seedDB();
//connect to mongoose
mongoose.connect("mongodb://localhost/yelpcamp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

app.get("/",function(req,res){
	res.render("landing.ejs");
});
//show all campgrounds
app.get("/campgrounds",function( req, res ){
	CampGround.find({},function(err,camper){
		if(err){
			console.log(err);
		}
		else{
			res.render("index.ejs",{campgrounds:camper});
		}
	});
});
//creates campgrounds
app.post("/campgrounds",function( req,res ){
	var name=req.body.name;
	var image=req.body.image;
	var descript=req.body.description;
	var newCamp={name: name,image: image, description:descript};
	//create a new campground and save to DB
	CampGround.create(newCamp,function(err,newCamp){
		if(err){
			console.log(err);
		}
		else{
			console.log("New campground created");
			console.log(newCamp);
			res.redirect("/campgrounds");
		}
	});
});
//show form for new creations
app.get("/campgrounds/new",function(req,res){
	res.render("new.ejs");
});
//a request to show information
app.get("/campgrounds/:id",function(req,res){
	//find the campground with provided ID
	CampGround.findById(req.params.id).populate("comments").exec(function(err,foundCamp){
		if (err) {
			console.log(err);
		}
		else{
			// show the found information
			res.render("show.ejs",{campgrounds:foundCamp});
		}
	});
	
});

app.listen(3001,'localhost',function(){
	console.log("The server is running!");
});