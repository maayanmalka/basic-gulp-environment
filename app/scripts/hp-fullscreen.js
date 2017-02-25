// hp-fullscreen.js

// - google API


// var playlist = 'PLQdt0d06hISY0p7YaAbQMHfK72gVgE4j2' // the catbears playlist
// C-VCCDoCjdc; // felt catbears
// zL8m4A6l8zI; // greeting card
// aXO59eNjhoc; // DIY book duck in trouble
// aoiGNe4_5uI; // graffity
var playlistCatbears = 'PLQdt0d06hISY0p7YaAbQMHfK72gVgE4j2';

var vidFeltCatbears = 'C-VCCDoCjdc';
var vidGreetingCard = "zL8m4A6l8zI";
var vidDIYBook = 'aXO59eNjhoc' ;
var vidGraffity = 'aoiGNe4_5uI' ;
var vidSpooky = 'xHfo_iMOd7Q';
var vidSunrise = '0RltQ1HO6F8';
var vidFoxChristmas = 'zSRkKOG873Q';

var videoPlaying = vidFoxChristmas;

// var videoArr = [vidSpooky, vidSunrise, vidFoxChristmas, vidFeltCatbears, vidGreetingCard , vidDIYBook];
var videoArr = [
                 {
                  'name' : vidFeltCatbears ,
                  'startTime' : 2 ,
                  'endTime' : 50
                 },
                 {
                  'name' : vidSpooky ,
                  'startTime' : 17 ,
                  'endTime' : 25
                 },
                 {
                  'name' : vidSunrise ,
                  'startTime' : 27 ,
                  'endTime' : 40
                 }, 
                 {
                  'name' : vidFoxChristmas ,
                  'startTime' : 10 ,
                  'endTime' : 30
                 },
                 {
                  'name' : vidGreetingCard ,
                  'startTime' : 23 ,
                  'endTime' : 53
                 }, 
                 {
                  'name' : vidDIYBook ,
                  'startTime' : 31 ,
                  'endTime' : 56
                 }
               ];
// var videoArr = [vidGraffity, vidFoxChristmas];
var videoCounter = 0;
var vidDuration;


function chooseNextVideo () {

  // console.log ('video playing - ' + videoPlaying)
  if (videoCounter > videoArr.length - 1){ 
    videoCounter = 0
  }
  videoPlaying = videoArr[videoCounter].name;
  console.log ('videoCounter : ' + videoCounter)

  player.loadVideoById({
   'videoId': videoPlaying,
   // 'startSeconds' : videoArr[videoCounter].startTime ,
   // 'endSeconds' : videoArr[videoCounter].endTime + 5  ,
     'suggestedQuality': 'large'
  });
  // set timer for vid to end by fading out - this way we bypass the youtube loading time :)
  // var timer = 0;
  // var limit = vidDuration - 3;

  // endVidTimer = setInterval( function (){

  //   timer ++;
  //   console.log('timer = ' + timer + ' / ' + limit)
  //   if (timer >= limit){
  //     clearInterval(endVidTimer);
  //     console.log('timer  DONE ')
  //     $('#player').fadeOut() 
  //   }    

  // } , 1000);


  // set timer for vid to end by fading out - this way we bypass the youtube loading time :)
  // var timer = videoArr[videoCounter].startTime;
  // var limit = videoArr[videoCounter].endTime;
  // endVidTimer = setInterval( function (){    
  //   timer ++;
  //   console.log('timer = ' + timer)
  //   if (timer >= limit){
  //     clearInterval(endVidTimer);
  //     console.log('timer  DONE ')
  //     $('#player').fadeOut() 
  //   }    

  // } , 1000);


  videoCounter++;
  // return videoPlaying;
};


var tag = document.createElement('script');

var player;
var playerStartTimer;
var playerStarted = false;
var endVidTimer;
var videoSelected = false;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      // height: '390',
      // width: '640',
      // videoId: videoPlaying,
      playerVars: {
        'autoplay': 1,
        'controls': 0,
        'autohide': 1,
        'wmode': 'opaque',
        'showinfo': 0,
        'loop': 1,
        'mute': 1,
        'startSeconds': 500,
        'suggestedQuality': 'large',
        'end': 110
        // 'playlist': videoPlaying
      },
  
      videoId: videoPlaying,
      
      events: {
          'onReady': onPlayerReady,
          'onStateChange' : onPlayerStateChange
      }
    });
}
function onPlayerReady(event) {
    chooseNextVideo();

    event.target.mute();
    // $('#player').fadeIn(2400);
    // player.setPlaybackRate(2); // SPEED
    
    $('#text').fadeIn(400);
    player.setPlaybackQuality('hd720');
    checkPlayerState();

    // player.addEventListener ('onStageChange' , onPlayerStateChange(event))
    //why this?  Well, if you want to overlay text on top of your video, you
    //will have to fade it in once your video has loaded in order for this
    //to work in Safari, or your will get an origin error.
}

function onPlayerStateChange (event) {

  // YT.PlayerState.ENDED
  // YT.PlayerState.PLAYING
  // YT.PlayerState.PAUSED
  // YT.PlayerState.BUFFERING
  // YT.PlayerState.CUED

	// console.log ('STATE CHANGE')
  // console.log('State is:', event.data);
  if (event.data == -1){
    console.log ('UNSTARTED')

    // $('#player').fadeOut();  
  }

  if (event.data == YT.PlayerState.BUFFERING){
    console.log ('BUFFERING')
    $('#player').fadeOut()
  }

  if (event.data == YT.PlayerState.PLAYING) {
    $('#player').fadeIn(400)
    console.log('PLAYING')

    // vidDuration = player.getDuration()
  }
  
  if (event.data == YT.PlayerState.ENDED){
    $('#player').fadeOut();  
    console.log ('ENDED')
    chooseNextVideo();
  }

  // if (event.data == 5){
  //   console.log ('CUED')
  //   // $('#player').fadeOut();  
  // }
}


function checkPlayerState (){
	// if (!playerStarted){
	//   playerStartTimer = setInterval( function (){
	//     if (player.getPlayerState() == 1) {
	//     	console.log("video started!!!!")
	//     	// clearInterval(playerStarted)
	//     	$('#player').fadeIn(400);
	//     }
	//     else{
	//     	if (player.getPlayerState() == 3) {
	//     		// console.log("video buffering !!!!")
	// 	    	$('#player').hide();	
	//     	}else{
	//     		// console.log("video NOT started !!!!")
	//     	}
	//     }
	 	
	  	

	// } , 1000);
 //   }

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

  // console.log ("screenWidth = " + screenWidth);
  // console.log ("screenHeight = " + screenHeight);

  screenRatio = screenWidth / screenHeight 
  // console.log ("Ratio = " + screenRatio)
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
	// video.css({"text-align": "left"});
	horizontalPoster = screenRatio > videoRatio;

	if (horizontalPoster) {
		// console.log ("H.P")
		// video.css({"height": videoHeight * videoWidth/aspectRatio });

	}else{
		// console.log ("V.P");
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

