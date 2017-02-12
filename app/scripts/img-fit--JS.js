// .img-fit--JS

var imgHeight;
var imgWidth;
var containerWidth;
var container;
var imgToFix;


$(document).ready(function() {
	container = $('.img-fit-container--JS');
	imgToFix = $('.img-fit-container--JS img');
	containerHeight = $('.img-fit-container--JS').height();
	imgToFix.css("position" , "absolute");
	fitImage();
	$(window).resize(function(){
		fitImage();
	});
});

function fitImage() {
	containerWidth = $('.img-fit-container--JS').width();
	imgToFix.css("clip" , "rect(0px," + containerWidth + "px ,432px,0px)");
	// alert ('imgHeight ' + imgHeight);
	// alert ('imgWidth ' + imgWidth);
};


