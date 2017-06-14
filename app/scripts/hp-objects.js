
var duck; 
var fox;
var card;
var makerKit;
var sunset;
var hug;
var cardboard;
var pig;
var farm;

var objects = [];
var objectsTotal;

var posterObjects;
var delayInt;
var showObjNum;

$(document).ready(function(){

	// SETTING VARS
	car = 'object__car.png'; 
	logo = 'object__logo.png'; 
	duck = 'object__duck.png'; 
	fox = 'object__fox.png';
	card = 'object__card.png';
	makerKit = 'object__maker-kit.png';
	sunset = 'object__sunset.png';
	hug = 'object__hug.png';
	pig = 'object__pig.png';
	farm = 'object__farm.png';
	cardboard = 'object__cardboard.png';
	objects = [ cardboard , car, fox , pig , sunset ,logo, farm , makerKit ,card , hug , duck ];
	objectsTotal = objects.length;
	posterObjects = $('.fullscreen__object--img');
	showObjNum = 0;

	// load images to cash
	for (var i = 0; i < objectsTotal ; i++){
	  	posterObjects.css("background-image" , ['url("../img/hp/' + objects[i] + '")']);
	}

	setInterval('cycleImages()', 3500);



});

function cycleImages(){
	posterObjects.css('z-index' , '1').fadeOut(150, function(){
  	posterObjects.css("background-image" , ['url("../img/hp/' + objects[showObjNum] + '")']);
  	posterObjects.css('z-index' , '1').fadeIn(150);
  	showObjNum ++;
  	showObjNum = showObjNum % objectsTotal;
  })
}
