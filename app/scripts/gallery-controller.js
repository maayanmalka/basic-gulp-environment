var $gallery;
var $galleryBtnRight;
var $galleryBtnLeft;
var galleryWidth;
var moveToSlide = 0;
var numOfSlides;
var currentSlide;
var speed = 450;
var spacer = 25;
var galleryItemAndSpacer;
var $counter;
var screensize;
var SingleImageGallery = false;
var newMainItemSize;
var autoSlideTimer;
var autoSlidingToRight;
var hoverGallery;
var pressedGallery;
var galleryItemMarginLeft;

test = function () {
  alert ('test function')
}





$(document).ready(function() {

  // test();



  // set bubble counter
  $galleryCounter = $('#gallery-counter');
  createCounterBubble = function (i) {
    $galleryCounter.append("<div class='gallery-counter__bubble gallery-counter__bubble--" + i + "'><div>")
  }

  updateBubble = function (currentBubble){
  for (i = 0 ; i < numOfSlides ; i++) {
    $('.gallery-counter__bubble').removeClass('gallery-counter__bubble--selected')
  }
  $('.gallery-counter__bubble--' + currentBubble).addClass('gallery-counter__bubble--selected')
}



  $gallery = $('#gallery');
  currentSlide = 0;
  $galleryBtnRight = $('.gallery__button--right')
  $galleryBtnLeft = $('.gallery__button--left')
  numOfSlides = $('.gallery__item').length;
  $('.gallery__item').css("margin-right" , spacer)

  if (numOfSlides == 1){
    SingleImageGallery = true;
  }

  // Auto Slide
  
  autoSlideTimer = 5000;
  autoSlidingToRight = true;
  autoSlidePaused = false;
  autoSlideOFF = false;
  
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

  var timer;

  autoSlideInit = function() {
    timer = setInterval( autoSlideON , autoSlideTimer);
  };

  autoSlideInit();

  autoSlidePausing = function (){
    // console.log ('stopping!')
    clearInterval(timer);
  }

  autoSlideRestarting = function (){
    // console.log ('restarting!')
    autoSlideInit();
  }
  // <- End Auto Slide




   for (var i=0 ; i < numOfSlides ; i++){
    var thisBubble = createCounterBubble (i);
  }
  updateBubble(currentSlide)
  
  setScreensize();
  setNewGallerySizes();


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

});

$( window ).resize(function() {
  setScreensize();
  setNewGallerySizes();
});

setScreensize = function () {
  screensize = $('body').width();
  // console.log ("screensize " + screensize)
}


function setNewGallerySizes () {

  if ( screensize < 1185){
     // console.log ('tablet screen - screensize')
    newMainItemSize = $('.page-item').width()
    $('.gallery__item').css('width' , newMainItemSize)
    $('.gallery__item').css('height' , newMainItemSize)
  }
  else {
   newMainItemSize = 600
   $('.gallery__item').css('width' , newMainItemSize)
   $('.gallery__item').css('height' , newMainItemSize) 
  }

  galleryItemAndSpacer = $('.gallery__item').width() + spacer;
  galleryWidth = (galleryItemAndSpacer * numOfSlides) + (spacer * numOfSlides);
  $gallery.css("width" , galleryWidth )
  galleryItemMarginLeft = (moveToSlide * galleryItemAndSpacer)
  $gallery.css("margin-left" , galleryItemMarginLeft * (-1))
}



function gallerySildeRight () {
  if (!SingleImageGallery){

    if (moveToSlide < numOfSlides - 1){
      moveToSlide = (moveToSlide + 1) % numOfSlides ;

      $gallery.animate({'margin-left' : '-=' + galleryItemAndSpacer} , speed, function (){
        currentSlide = ( currentSlide + 1 ) % numOfSlides ;
        updateBubble(currentSlide);
      })

    }

    // bounce right
    if (currentSlide === numOfSlides - 1  ){
      bounceRight();
    }

  }
};

function gallerySildeLeft () {
  if (!SingleImageGallery){
    if (moveToSlide > 0  ){
      moveToSlide = (moveToSlide - 1) % numOfSlides ;

      $gallery.animate({'margin-left' : '+=' + galleryItemAndSpacer} , speed, function (){
          currentSlide = ( currentSlide - 1 ) % numOfSlides ;
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
  .animate({'margin-left' : '-=' + 40} , 100)
  .animate({'margin-left' : '+=' + 40} , 100)
};

function bounceLeft () {
  $gallery
  .animate({'margin-left' : '+=' + 40} , 100)
  .animate({'margin-left' : '-=' + 40} , 100)
};


