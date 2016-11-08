var $gallery;
var $galleryBtnRight;
var $galleryBtnLeft;
var galleryWidth;
var moveToSlide = 0;
var numOfSlides;
var currentSlide;
var width = 300;
var speed = 400;
var $counter;

test = function () {
  // debugger
  alert ("test")
}

  


$(document).ready(function() {

  // test();
  //configuration


  $counter = $('.counter');
  $gallery = $('#gallery');
  currentSlide = 0;
  $galleryBtnRight = $('.gallery__button--right')
  $galleryBtnLeft = $('.gallery__button--left')
  numOfSlides = $('.gallery__item').length;
  galleryWidth = 300 * (numOfSlides - 1) ;
  setCounter()

  $galleryBtnRight.click( function (){
      gallerySildeRight ();
  })
  $galleryBtnLeft.click( function (){
      gallerySildeLeft ();
  })


//
  // configure hammer.js
  var galleryTouchElement = document.getElementById('gallery');
  var galleryTouchControl = new Hammer(galleryTouchElement);

  // listen to events...
  galleryTouchControl.on("swipeleft swipeup", gallerySildeRight );
  galleryTouchControl.on("swiperight swipeup", gallerySildeLeft );

});



function gallerySildeRight () {
  // slide only if it's possible
  if (moveToSlide < numOfSlides - 1  ){
    moveToSlide = (moveToSlide + 1) % numOfSlides ;

    $gallery.animate({'margin-left' : '-=' + width} , speed, function (){
      currentSlide = ( currentSlide + 1 ) % numOfSlides ;
    })

  }

  // bounce right
  if (currentSlide === numOfSlides - 1  ){
    bounceRight();
  }

  setCounter()
};

function gallerySildeLeft () {
  // slide only if it's possible
  if (moveToSlide > 0  ){
    moveToSlide = (moveToSlide - 1) % numOfSlides ;

    $gallery.animate({'margin-left' : '+=' + width} , speed, function (){
        currentSlide = ( currentSlide - 1 ) % numOfSlides ;
      })

  }
  setCounter()

  if ( currentSlide === 0 ){
    bounceLeft();
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
