$(document).ready(function() {
	scrollToForm()
});


function scrollToForm () {
	var $btn = $('.scroll-to-signup'); 
	$btn.click(function() {
		var $container = $('html,body');
		var $scrollto =  $(".subscribe-wrapper");
		    $container.animate({
		        scrollTop: $scrollto.offset().top - $container.offset().top + $container.scrollTop()},
		        'slow');
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