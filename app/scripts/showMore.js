// showMore.js
$(document).ready(function() {
	showMoreInit();
});

function showMoreInit(){
  	var showChar = 300;
    var ellipsestext = "...";
	$('.showMore__Btn--js').each(function() {
        var content = $(this).html();
        if(content.length > showChar) {
 
            var c = content.substr(0, showChar);
 			var h = content;	
            var html = '<div class="truncate-text" style="display:block">' + c + '<span class="moreellipses">' + ellipsestext + '&nbsp;&nbsp;<a href="" class="moreless more btn btn__small btn__secondary showMoreBtn">Show More</a></span></span></div><div class="truncate-text" style="display:none">' + h + '<a href="" class="moreless less btn btn__small btn__secondary showMoreBtn">Show Less</a></span></div>';
 
            $(this).html(html);
        }
 
    });

	$('.showMore__Link--js').each(function() {
        var content = $(this).html();
        if(content.length > showChar) {
 
            var c = content.substr(0, showChar);
 			var h = content;	
            var html = '<div class="truncate-text" style="display:block">' + c + '<span class="moreellipses">' + ellipsestext + '&nbsp;&nbsp;<a href="" class="moreless more">Read More</a></span></span></div><div class="truncate-text" style="display:none">' + h + '<a href="" class="moreless less">Read Less</a></span></div>';
 
            $(this).html(html);
        }
 
    });
 
    $(".moreless").click(function(){
		var thisEl = $(this); 
        if(thisEl.hasClass("less")) {
    		thisEl.closest('.truncate-text').fadeToggle('fast' , function (){
	        	thisEl.closest('.truncate-text').prev('.truncate-text').fadeToggle('fast');
    		});
        } else {
			thisEl.closest('.truncate-text').fadeToggle('fast' , function(){
				thisEl.closest('.truncate-text').next('.truncate-text').fadeToggle('fast');
			});
        }
	   	return false;
    });
	/* end iffe */
};

