var imgWidth;
var imgHeight;

$(document).ready(function() {
	imgWidth = $('.page-item__main-img img').width();
	imgHeight = $('.page-item__main-img img').height();

	if (imgWidth >= imgHeight ){
		alert ('imgWidth >= imgHeight')
	}else {
		alert ('imgWidth < imgHeight')
	}
  $( window ).resize(function() {

  });

});