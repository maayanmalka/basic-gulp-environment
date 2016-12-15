//lightbox-controller_subscribe.js

lightboxInit = function(){
	if (!isUserSubscribed()){
		lightboxShow();
	}
}


lightboxShow = function (){
  $('.lightbox').fadeIn('fast')
}

lightboxClose = function () {
	$('.lightbox').fadeOut('fast')
}

