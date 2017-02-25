$(document).ready(function() {
	scrollToForm()
});

var isScrolling = false;

function scrollToForm () {
	var $btn = $('.scroll-to-signup'); 
	$btn.click(function() {
	  if (!isScrolling){
	  	isScrolling = true;
		var $container = $('html,body');
		var $scrollto =  $(".subscribe-wrapper");
		var scrollDistance = $scrollto.offset().top - $container.offset().top + $container.scrollTop();
		    $container.animate({
		        scrollTop: scrollDistance},
		        'slow', function () {
		    	isScrolling = false;
		    });
   	  }	
	});
}

// scrollTop: $(".subscribe-form").offset().top


// function scrollToForm () {
// 	var container = $('html,body');
// 	var targetDiv = $('.scroll-to-signup');  
	
// 	targetDiv.click(function() {
// 		alert ('bbbbnnv')
// 		  container.animate({
//     		scrollTop: targetDiv.offset().top - container.offset().top + container.scrollTop()
// 			});​
// 		});
// }