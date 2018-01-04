var mongoose = require('mongoose');
var CampGround = require('./models/campground');
var Comment = require('./models/comment');

var data = [
	{
		name:"Cloud's Rest",
		image: "https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg",
		description: "This is an amazing place to visit with your family"
	},
	{
		name:"Zendesk peak",
		image: "https://farm8.staticflickr.com/7042/7121867321_65b5f46ef1.jpg",
		description: "There are some amazing activities that are done there!"
	},
	{
		name:"Flumington Status",
		image: "https://farm8.staticflickr.com/7259/7121858075_7375241459.jpg",
		description: "Spooky and haunted"
	}
	];

function seedDB(){
	//removing all campgrounds
	CampGround.remove({},function(err){
		if(err){
			console.log(err);
		}
		console.log("removed campgrounds");
		//add a few campgrounds
		data.forEach(function(seed){
			CampGround.create(seed,function(err,camps){
				if(err){
					console.log(err);
				}
				else{
					console.log("added a campground!");
					//add a few comments
					Comment.create(
						{
							text:"this place is great but no wifi!",
							author:"Holmes"
						},function(err,comment){
							if(err){
								console.log(err)
							}
							else{
								camps.comments.push(comment);
								camps.save();
								console.log("created new comments");
							}
							
						});
				}
			});
		});
		
		
	});
}

module.exports = seedDB;