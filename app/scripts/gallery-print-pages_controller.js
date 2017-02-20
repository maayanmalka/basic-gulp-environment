var autoSlide = false;
var autoSlideMin = 7000;
var autoSlideMax = 9000;
var autoSlideTimer = getRandomInteger(autoSlideMin,autoSlideMax)
var autoSlidingToRight = true;
var autoSlidePaused = false;
    
var $gallery;
var $galleryBtnRight;
var $galleryBtnLeft;
var galleryWidth;
var numOfSlides;
var currentGalleryJumpNum = 0;
var speed = 200;
var spacer = 13;
var autoSlideInterval;
var galleryItemAndSpacer;
var $counter;
var screensize;
var staticGallery = false;
var bounceRate = 20; //reaching the end of the gallery - bounceRate
var bounceSpeed = 110;

var autoSetJumpNum = true;
var numOfNextSlides = 0;
var numOfSlidesFitGallery = 3; // number of slides being jumped when moving right / left
var currentSlideNum;
var howManyFitInContainer;
var numOfSlidesToSlide;

test = function () {
  alert ('test function')
}





$(document).ready(function() {

  // test();
  galleryInit ();

  setScreensize();
  setNewGallerySizes();
  setnumOfSlidesFitGallery();
  currentSlideNum = numOfSlidesFitGallery + currentGalleryJumpNum;  


  $( window ).resize(function() {
    setScreensize();
    setNewGallerySizes();
    setnumOfSlidesFitGallery();

    currentSlideNum = numOfSlidesFitGallery + currentGalleryJumpNum;  

    // console.log('numOfSlidesFitGallery  ' + numOfSlidesFitGallery );
  });
});

setScreensize = function () {
  screensize = $('body').width();
  // console.log ("screensize " + screensize)
}


function setNewGallerySizes () {
  galleryItemAndSpacer = $galleryItem.outerWidth() + spacer;
  galleryWidth = (galleryItemAndSpacer * numOfSlides) + (spacer * numOfSlides);
  $gallery.css("width" , galleryWidth )
}



function gallerySlideRight () {

  if (!staticGallery){
    numOfNextSlides = numOfSlides - currentSlideNum;
    if (numOfNextSlides >= 0){
      currentSlideNum = (currentSlideNum + numOfSlidesFitGallery);
      
      // currentSlideNum can't be larger then numOfSlides 
      if (currentSlideNum > numOfSlides) {
        currentSlideNum = numOfSlides
      }
      // check if we should fadeOut $pageFadeRight
      if (numOfSlides - currentSlideNum <= 0){
        $pageFadeRight.fadeOut(250);
      }

      if (numOfNextSlides >= numOfSlidesFitGallery){
        numOfSlidesToSlide = numOfSlidesFitGallery     
      }else {
        numOfSlidesToSlide = numOfNextSlides
      }
      // console.log ('numOfSlidesToSlide = ' + numOfSlidesToSlide)

      $gallery.animate({'margin-left' : '-=' + galleryItemAndSpacer * numOfSlidesToSlide} , speed, function (){
        currentGalleryJumpNum = ( currentGalleryJumpNum + numOfSlidesToSlide ) % numOfSlides ;
        updateBubble(currentGalleryJumpNum);
        
      })
    }
    // console.log ('currentSlideNum = ' + currentSlideNum)

    // bounce right
    if (currentGalleryJumpNum >= numOfSlides - numOfSlidesFitGallery){
      bounceRight();
    }

  }
};

function gallerySildeLeft () {
  if (!staticGallery){

    numOfNextSlides = currentSlideNum - numOfSlidesFitGallery ;
    // console.log ('currentSlideNum = ' + currentSlideNum);
    // console.log ('numOfNextSlides = ' + numOfNextSlides);

    if (numOfNextSlides > 0 ){
      currentSlideNum = (currentSlideNum - numOfSlidesFitGallery) % numOfSlides ;
      
      // currentSlideNum can't be smaller then numOfSlidesFitGallery 
      if (currentSlideNum < numOfSlidesFitGallery) {
        currentSlideNum = numOfSlidesFitGallery
      }

      // check if we should fadeIn $pageFadeRight
      if (numOfSlides - currentSlideNum > 0){
        $pageFadeRight.fadeIn(650);
      }

      if (numOfNextSlides >= numOfSlidesFitGallery){
        numOfSlidesToSlide = numOfSlidesFitGallery     
      }else {
        numOfSlidesToSlide = numOfNextSlides
      }
      // console.log ('numOfSlidesToSlide = ' + numOfSlidesToSlide)



      $gallery.animate({'margin-left' : '+=' + galleryItemAndSpacer * numOfSlidesToSlide} , speed, function (){
          currentGalleryJumpNum = ( currentGalleryJumpNum - numOfSlidesToSlide ) % numOfSlides ;
          updateBubble(currentGalleryJumpNum)
        })

    }

    if ( currentGalleryJumpNum === 0 ){
      bounceLeft();
    }
  }
}

function bounceRight () {
  $gallery
  .animate({'margin-left' : '-=' + bounceRate} , bounceSpeed)
  .animate({'margin-left' : '+=' + bounceRate} , bounceSpeed)
};

function bounceLeft () {
  $gallery
  .animate({'margin-left' : '+=' + bounceRate} , bounceSpeed)
  .animate({'margin-left' : '-=' + bounceRate} , bounceSpeed)
};





// -- 
 // function bounceHint () {
 //  bounceRight()
 // }

 autoSlideON = function () {
      // console.log('Auto Slide ON')

      if ( currentGalleryJumpNum === 0 ){
        autoSlidingToRight = true;
      }
      if ( currentSlideNum === numOfSlides ){
        autoSlidingToRight = false;
      }

      if(!autoSlidePaused){
        if (autoSlidingToRight){
          autoSlideTimer = getRandomInteger(autoSlideMin,autoSlideMax)
          // console.log ('autoSlideTimer = ' + autoSlideTimer)
          bounceLeft()
          bounceLeft()
          // gallerySlideRight ();
        }else{
          // gallerySildeLeft ();
          // bounceLeft()
        }
      }
    }

autoSlidePause = function (){
  // console.log('pause!')
  autoSlidePaused = true;
  autoSlidePausing();
}

autoSlideRestart = function (){
  // console.log('play!')
  autoSlidePaused = false;
  autoSlideRestarting();
  // autoSlideInit();
}

autoSlidePauseRestart = function () {
  autoSlidePause();
  autoSlideRestart();
}


autoSlideInit = function() {
  if (autoSlide) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = setInterval( autoSlideON , autoSlideTimer);
  }
};

autoSlidePausing = function (){
  // console.log ('stopping!')
  clearInterval(autoSlideTimer);
}

autoSlideRestarting = function (){
  // console.log ('restarting!')
  autoSlideInit();
}
updateBubble = function (currentBubble){
  for (i = 0 ; i < numOfSlides ; i++) {
    $('.gallery-counter__bubble').removeClass('gallery-counter__bubble--selected')
  }
  $('.gallery-counter__bubble--' + currentBubble).addClass('gallery-counter__bubble--selected')
}

function setBubbleCounter () {
  $galleryCounter = $('#gallery-counter');
  createCounterBubble = function (i) {
    $galleryCounter.append("<div class='gallery-counter__bubble gallery-counter__bubble--" + i + "'><div>")
  }

  for (var i=0 ; i < numOfSlides ; i++){
    var thisBubble = createCounterBubble (i);
  }
  updateBubble(currentGalleryJumpNum)

  if (numOfSlides == 1){
    SingleImageGallery = true;
  }
};
    


function galleryInit () {
    
    $gallery = $('#gallery');
    $galleryItem = $('.gallery__item');
    $galleryBtnRight = $('.gallery__button--right')
    $galleryBtnLeft = $('.gallery__button--left')
    numOfSlides = $galleryItem.length;
    $galleryItem.css("margin-right" , spacer)
    
    $pageFadeRight = $('.page-fade_right')
    
    setBubbleCounter()
    autoSlideInit();

    $galleryBtnRight.click( function (){
      gallerySlideRight ();
    })
    
    $galleryBtnLeft.click( function (){
      gallerySildeLeft ();
    })

  // //configure hammer.js
  // var galleryTouchElement = document.getElementById('gallery-controller');
  // var galleryTouchControl = new Hammer(galleryTouchElement);

  // // listen to events...
  // galleryTouchControl.on("swipeleft swipeup ", function(){
  //   gallerySlideRight();
  //   autoSlidePauseRestart();
  // } );
  // galleryTouchControl.on("swiperight swipeup ", function(){
  //   gallerySildeLeft();
  //   autoSlidePauseRestart();
  //   }
  // );

  // // tap on a gallery item
  // var galleryItemTouchElement = document.getElementById('gallery__item');
  // var galleryItemTouchControl = new Hammer(galleryItemTouchElement);
  
  // // listen to events...
  // galleryTouchControl.on("tap", function(){
  //   alert ('tap on gallery item') 
  // } );


};

function getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


function setnumOfSlidesFitGallery () {
  if (autoSetJumpNum) {
    howManyFitInContainer = [$('.gallery-container').width() + spacer] / galleryItemAndSpacer ;
    numOfSlidesFitGallery = Math.floor(howManyFitInContainer);

    if (numOfSlidesFitGallery >= numOfSlides){
      staticGallery = true;
      $('.gallery-container').addClass('static-gallery')
    }else {
      staticGallery = false;
      $('.gallery-container').removeClass('static-gallery')
    }
  }
};

