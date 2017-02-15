var autoSlide = false;
var autoSlideTimer = 5000;
var autoSlidingToRight = true;
var autoSlidePaused = false;
    
var $gallery;
var $galleryBtnRight;
var $galleryBtnLeft;
var galleryWidth;
var numOfSlides;
var currentSlide = 0;
var speed = 450;
var spacer = 13;
var autoSlideInterval;
var galleryItemAndSpacer;
var $counter;
var screensize;
var staticGallery = false;
var bounceRate = 12; //reaching the end of the gallery - bounceRate

var autoSetJumpNum = true;
var checkPossibleSlide = 0;
var slideJumpNum = 3; // number of slides being jumped when moving right / left
var moveToSlide;
var howManyFitInContainer;

test = function () {
  alert ('test function')
}





$(document).ready(function() {

  // test();
  galleryInit ();

  setScreensize();
  setNewGallerySizes();
  setSlideJumpNum();
  moveToSlide = slideJumpNum;

  $( window ).resize(function() {
    setScreensize();
    setNewGallerySizes();
    setSlideJumpNum();
    moveToSlide = moveToSlide + slideJumpNum;
    console.log('slideJumpNum  ' + slideJumpNum );
  });
});

setScreensize = function () {
  screensize = $('body').width();
  // console.log ("screensize " + screensize)
}


function setNewGallerySizes () {
  galleryItemAndSpacer = $galleryItem.width() + spacer;
  galleryWidth = (galleryItemAndSpacer * numOfSlides) + (spacer * numOfSlides);
  $gallery.css("width" , galleryWidth )
}



function gallerySildeRight () {

  

  if (!staticGallery){

    checkPossibleSlide = numOfSlides - moveToSlide;
    
    if (checkPossibleSlide > 0){
      moveToSlide = (moveToSlide + slideJumpNum);

      // check if we should fadeOut $pageFadeRight
      if (numOfSlides - moveToSlide <= 0){
        $pageFadeRight.fadeOut(250);
      }

      $gallery.animate({'margin-left' : '-=' + galleryItemAndSpacer * slideJumpNum} , speed, function (){
        currentSlide = ( currentSlide + slideJumpNum ) % numOfSlides ;
        updateBubble(currentSlide);
        
      })
    }

    console.log ('checkPossibleSlide = ' + checkPossibleSlide);
    console.log ('moveToSlide = ' + moveToSlide);
    // bounce right
    if (currentSlide >= numOfSlides - slideJumpNum){
      // alert ("bounceRight")
      bounceRight();
    }

  }
};

function gallerySildeLeft () {
  if (!staticGallery){
    if (moveToSlide > 0 + slideJumpNum ){
      moveToSlide = (moveToSlide - slideJumpNum) % numOfSlides ;

      // check if we should fadeIn $pageFadeRight
      if (numOfSlides - moveToSlide > 0){
        $pageFadeRight.fadeIn(650);
      }

      $gallery.animate({'margin-left' : '+=' + galleryItemAndSpacer * slideJumpNum} , speed, function (){
          currentSlide = ( currentSlide - slideJumpNum ) % numOfSlides ;
          updateBubble(currentSlide)
        })

    }

    if ( currentSlide === 0 ){
      bounceLeft();
    }
  }
}

function bounceRight () {
  $gallery
  .animate({'margin-left' : '-=' + bounceRate} , 100)
  .animate({'margin-left' : '+=' + bounceRate} , 100)
};

function bounceLeft () {
  $gallery
  .animate({'margin-left' : '+=' + bounceRate} , 100)
  .animate({'margin-left' : '-=' + bounceRate} , 100)
};





// -- 

 autoSlideON = function () {
      // console.log('Auto Slide ON')

      if ( currentSlide === 0 ){
        autoSlidingToRight = true;
      }
      if ( currentSlide === numOfSlides -1 ){
        autoSlidingToRight = false;
      }

      if(!autoSlidePaused){
        if (autoSlidingToRight){
          gallerySildeRight ();
        }else{
          gallerySildeLeft ();
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
    autoSlideInterval = setInterval( autoSlideON , autoSlideTimer);
  }
};

autoSlidePausing = function (){
  // console.log ('stopping!')
  clearInterval(timer);
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
  updateBubble(currentSlide)

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
      gallerySildeRight ();
    })
    
    $galleryBtnLeft.click( function (){
      gallerySildeLeft ();
    })

  //configure hammer.js
  var galleryTouchElement = document.getElementById('gallery-controller');
  var galleryTouchControl = new Hammer(galleryTouchElement);

  // listen to events...
  galleryTouchControl.on("swipeleft swipeup ", function(){
    gallerySildeRight();
    autoSlidePauseRestart();
  } );
  galleryTouchControl.on("swiperight swipeup ", function(){
    gallerySildeLeft();
    autoSlidePauseRestart();
    }
  );
};


function setSlideJumpNum () {
  if (autoSetJumpNum) {
    howManyFitInContainer = [$('.gallery-container').width() + spacer] / galleryItemAndSpacer ;
    slideJumpNum = Math.floor(howManyFitInContainer);

    if (slideJumpNum >= numOfSlides){
      staticGallery = true;
      $galleryBtnRight.hide();
      $galleryBtnLeft.hide();
      $pageFadeRight.hide();
    }else {
      staticGallery = false;
      $galleryBtnRight.show();
      $galleryBtnLeft.show();
      $pageFadeRight.show();
    }
  }
};

