$(document).ready(function() {
	$(".scroll-to-signup").click(function() {
	    $('html,body').animate({
	        scrollTop: $(".subscribe-form").offset().top},
	        'slow');
	});
});