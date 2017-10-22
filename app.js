var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
var camper = [
		{name:"Salmon Creek",image:"https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
		{name:"Granite Hill",image:"https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg"},
		{name:"Moint Pull Hut",image:"https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg"}
	];
app.get("/",function(req,res){
	res.render("landing.ejs");
});

app.get("/campgrounds",function( req, res ){
	
	res.render("camperground.ejs",{campgrounds:camper});
});
app.post("/campgrounds",function( req,res ){
	var name=req.body.name;
	var image=req.body.image;
	var newCamp={name: name,image: image};
	campgrounds.push(newCamp);
	res.redirect("/campground");
});
app.get("/campgrounds/new",function(req,res){
	res.render("new.ejs");
});
app.listen(3001,'localhost',function(){
	console.log("The server is running!");
});