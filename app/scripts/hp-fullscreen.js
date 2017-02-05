// hp-fullscreen.js

// - google API

var tag = document.createElement('script');

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: 'C-VCCDoCjdc',
      playerVars: {
        'autoplay': 1,
        'controls': 0,
        'autohide': 1,
        'wmode': 'opaque',
        'showinfo': 0,
        'loop': 1,
        'mute': 1,
        'start': 135,
        'end': 110
,       'playlist': 'C-VCCDoCjdc'
      },
      videoId: 'C-VCCDoCjdc',
        events: {
            'onReady': onPlayerReady,
        }
    });
}
function onPlayerReady(event) {
    event.target.mute();
    $('#text').fadeIn(400);
    // player.setPlaybackRate(2);
    player.addEventListener ('onStageChange' , onPlayerStateChange)
    //why this?  Well, if you want to overlay text on top of your video, you
    //will have to fade it in once your video has loaded in order for this
    //to work in Safari, or your will get an origin error.
}

function onPlayerStateChange (event) {
	console.log ('STATE CHANGE')
	if (event.data == YT.PlayerState.BUFFERING){
		alert ('video buffering!')
	}
}
//this pauses the video when it's out of view, just wrap your video in .m-//video
// $(window).scroll(function() {
//    var hT = $('.m-video').height(),
//        wS = $(this).scrollTop();
//    if (wS > hT) {
//       player.pauseVideo();
//    }
//    else {
//       player.playVideo();
//    }
// });

// var done = false;
// function onPlayerStateChange(event) {
// 	if (event.data == YT.PlayerState.PLAYING && !done) {
// 	  setTimeout(stopVideo, 6000);
// 	  done = true;
// 	}
// }
// function stopVideo() {
// 	player.stopVideo();
// }

// END google api





// - position poster

var horizontalPoster
var video;
var videoWidth;
var videoHeight;
var videoRatio;
var newWidth;
var halfNewWidth;

var screenWidth;
var screenHeight;
var screenRatio;

var poster
var blocker


$(document).ready(function(){
    setScreenSizes();
    setPosterSize();
    sizeVideoSize();
  $(window).resize(function(){
    setScreenSizes();
    setPosterSize();
    sizeVideoSize();
  });  
});


function setScreenSizes () {
  screenWidth = document.documentElement.clientWidth;
  screenHeight = document.documentElement.clientHeight;

  console.log ("screenWidth = " + screenWidth);
  console.log ("screenHeight = " + screenHeight);

  screenRatio = screenWidth / screenHeight 
  console.log ("Ratio = " + screenRatio)
}

function setPosterSize () {
	poster = $('.poster-fullscreen');
	poster.css({"width": screenWidth});
	poster.css({"height": screenHeight});

  	//prevent pressing the pause button
  	blocker = $('.player-blocker')
	blocker.css({"width" : screenWidth})
	blocker.css({"height" : screenHeight})
}

function sizeVideoSize(){
  // - 1.78 is the aspect ratio of the video
// - This will work if your video is 1920 x 1080
// - To find this value divide the video's native width by the height eg 1920/1080 = 1.78
    // var aspectRatio = 1.78;
    videoRatio = 1.78;
  	
    video = $('#player');
    video.css({"width": screenWidth});
    video.css({"height": screenWidth / videoRatio});
	
	horizontalPoster = screenRatio > videoRatio;

	if (horizontalPoster) {
		console.log ("H.P")
		// video.css({"height": videoHeight * videoWidth/aspectRatio });

	}else{
		console.log ("V.P");
		video.css({"height": screenHeight});
		video.css({"width": screenHeight * videoRatio });
		// video.css("width" : videoWidth * 2);
	}



  //    newWidth = videoHeight*aspectRatio;
  // halfNewWidth = newWidth/2;
  
  //Define the new width and centrally align the iframe
  // video.css({"width":newWidth+"px","left":"50%","margin-left":"-"+halfNewWidth+"px"});
  // video.css({"width":newWidth,"left":"50%"});
}

