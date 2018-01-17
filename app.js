var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var CampGround = require("./models/campground");
var seedDB = require("./seeds")
var Comment= require("./models/comment");

seedDB();
//connect to mongoose
mongoose.connect("mongodb://localhost/yelpcamp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
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
			res.render("campgrounds/index",{campgrounds:camper});
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
	res.render("campgrounds/new");
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
			res.render("campgrounds/show.ejs",{campgrounds:foundCamp});
		}
	});
	
});

/*---------------
COMMENT ROUTES
---------------*/
app.get("/campgrounds/:id/comments/new",function(req,res){
	//find campgrounds by id
	CampGround.findById(req.params.id,function(err,camps){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/new",{campground:camps});
		}
	});
	
});
app.post("/campgrounds/:id/comments",function(req,res){
	//look up the campground using id
	CampGround.findById(req.params.id,function(err,camps){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				}
				else{
					console.log(comment);
					camps.comments.push(comment._id);//important ting
					camps.save();
					res.redirect("/campgrounds/" + camps._id);
				}
			})
		}
	})
	//create new comment
	//connect new comment to campground
	//redirect to somewhere
});
app.listen(3001,'localhost',function(){
	console.log("The server is running!");
});