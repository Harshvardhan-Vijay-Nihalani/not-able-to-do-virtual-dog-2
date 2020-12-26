var canvas;
var dog1Image;
var dog2Image;
var dog;
var count, foodS;
var life;
var database;
var petFeed, addFood;
var fedTime, lastFed;
var foodObj;
function preload() {
	dog1Image = loadImage("images/dogImg.png");
	dog2Image = loadImage("images/dogImg1.png");
}

function setup() {
	canvas = createCanvas(800, 700);
	dog = createSprite(400, 350, 20, 30);
	dog.addImage("dog1Image", dog1Image);
	dog.addImage("dog2Image", dog2Image);
	dog.scale = 0.3;
	count = 20;
	life = 20;
	database = firebase.database();
	foodstock = database.ref('Food');
	foodstock.on("value", readstock);
	foodObj = createSprite(50,50, 3, 5);
}


function draw() {
	background(46, 139, 87);
	
	if(foodS === 0){
		dog.changeImage("dog1Image", dog1Image);
	}

	foodObj.display();
	drawSprites();
	textSize(20);
	stroke('green');
	fill("blue");
	text("Food left = " + foodS, 20, 20);
	fedTime=database.ref('FeedTime');
	fedTime.on("value", function(data){
		lastFed=data.val();
	});
}
function readstock(data){

	foodS = data.val();
}

function writeStock(x){
	if(x<=0){
		x=0;
	}else{
		x-=1;
	}
	database.ref('/').update({
		'Food':x
	})
}

function feedDog(){
	dog.addImage(dog2Image);

	foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
	database.ref('/').update({
		Food:foodObj.getFoodStock(),
		FeedTime:hour()
	})
}

function addFood(){
	if(keyWentDown("Space")){
		foodS = foodS+1;
	}
	database.ref('/').update({
		Food:foodS
	})
}