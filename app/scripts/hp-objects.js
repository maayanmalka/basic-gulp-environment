
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
	duck = 'object__duck.png'; 
	fox = 'object__fox.png';
	card = 'object__card.png';
	makerKit = 'object__maker-kit.png';
	sunset = 'object__sunset.png';
	hug = 'object__hug.png';
	pig = 'object__pig.png';
	farm = 'object__farm.png';
	cardboard = 'object__cardboard.png';
	objects = [ cardboard , fox , pig , sunset , farm , makerKit ,card , hug , duck ];
	objectsTotal = objects.length;
	posterObjects = $('.fullscreen__object--img');
	showObjNum = 0;

	// load images to cash
	for (var i = 0; i < objectsTotal ; i++){
	  	posterObjects.css("background-image" , ['url("../img/hp/' + objects[i] + '")']);
	}

	setInterval('cycleImages()', 5000);



});

function cycleImages(){
  posterObjects.css("margin-top" , '-10px' ).css('z-index' , '1').fadeOut(300, function(){
  	posterObjects.css("background-image" , ['url("../img/hp/' + objects[showObjNum] + '")']);
  	posterObjects.css('z-index' , '1').fadeIn(300).css("margin-top" , '0px' );
  	showObjNum ++;
  	showObjNum = showObjNum % objectsTotal;
  })
}
