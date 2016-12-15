//lightbox-controller_subscribe.js
var downloadInterval;
var path;
var pageName;
var fileName; 
// var waitingTime = 2000;
$(document).ready(function() {
	// init();
});

lightboxInit = function(){
	lightboxShow();
	// downloadPDF()
	// downloadInterval = setInterval( downloadPDF , waitingTime);
}


downloadPDF = function (){
	path = window.location.pathname;
	pageName = path.split("/").pop();
	fileName = pageName.replace(pageName.split(".").pop(), "pdf")
	window.open("../pdf/" + fileName)

	// window.location.assign("../pdf/" + fileName , 'Download');
	// window.open("../pdf/" + fileName, 'Download')
	// clearInterval(downloadInterval);
}

lightboxShow = function (){
  $('.lightbox').fadeIn('fast')
}

lightboxClose = function () {
	$('.lightbox').fadeOut('fast')
}

rainbow = function () {
	interval = window.setInterval(changeFilter, 1000);
}

function changeFilter() {

	console.log("rainbow")	
    // var filter = filters.shift();
    // filters.push(filter);
    // div.css({
    //     '-webkit-filter': filter
    // });
}



// download 
// href='../pdf/5-coloring-pages_The-Catbears.pdf' download = "5-coloring-pages_The-Catbears.pdf"