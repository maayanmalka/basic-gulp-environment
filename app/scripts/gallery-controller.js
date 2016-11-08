var $gallery;
var $galleryBtnRight;
var $galleryBtnLeft;
var galleryWidth;
var moveToSlide = 0;
var numOfSlides;
var currentSlide;
var speed = 600;
var spacer = 25;
var galleryItemAndSpacer;
var $counter;
var screensize;
var SingleImageGallery = false;
var newMainItemSize;

test = function () {
  // debugger
  // var screensize = $('body').width()
  alert ("screensize is " + screensize + "   | Jquery is working" )
}



$(document).ready(function() {

  // test();


  $counter = $('.counter');
  $gallery = $('#gallery');
  currentSlide = 0;
  $galleryBtnRight = $('.gallery__button--right')
  $galleryBtnLeft = $('.gallery__button--left')
  numOfSlides = $('.gallery__item').length;
  $('.gallery__item').css("margin-right" , spacer)

  if (numOfSlides == 1){
    SingleImageGallery = true;
  }



  
  
  setScreensize();
  setNewGallerySizes();

  //setCounter()

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
  galleryTouchControl.on("swipeleft swipeup", gallerySildeRight );
  galleryTouchControl.on("swiperight swipeup", gallerySildeLeft );
  // galleryTouchControl.on("tap", gallerySildeRight );

});

$( window ).resize(function() {
  setScreensize();
  setNewGallerySizes();
});

setScreensize = function () {
  screensize = $('body').width();
  console.log ("screensize " + screensize)
}

function setNewGallerySizes () {

  if ( screensize < 1185){
    newMainItemSize = $('.main-item').width()
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
}



function gallerySildeRight () {
  if (!SingleImageGallery){

    if (moveToSlide < numOfSlides - 1){
      moveToSlide = (moveToSlide + 1) % numOfSlides ;

      $gallery.animate({'margin-left' : '-=' + galleryItemAndSpacer} , speed, function (){
        currentSlide = ( currentSlide + 1 ) % numOfSlides ;
      })

    }

    // bounce right
    if (currentSlide === numOfSlides - 1  ){
      bounceRight();
    }

    setCounter()
  }
};

function gallerySildeLeft () {
  if (!SingleImageGallery){
    if (moveToSlide > 0  ){
      moveToSlide = (moveToSlide - 1) % numOfSlides ;

      $gallery.animate({'margin-left' : '+=' + galleryItemAndSpacer} , speed, function (){
          currentSlide = ( currentSlide - 1 ) % numOfSlides ;
        })

    }
    setCounter()

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


function setCounter () {
  $counter.html('move to slide number : ' + moveToSlide + "</br></br> current slide shown : " + currentSlide)
}
