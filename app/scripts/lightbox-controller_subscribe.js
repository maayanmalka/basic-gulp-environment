//lightbox-controller_subscribe.js

lightboxInit = function(className){
	if (!isUserSubscribed()){
		lightboxShow(className);
	}
}


lightboxShow = function (className){
  $('.lightbox' + '__' + className).fadeIn('fast')
}

lightboxClose = function (className) {
	$('.lightbox' + '__' + className).fadeOut('fast')
}

