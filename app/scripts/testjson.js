// testjson.js


// VARAIBLES
// var lesson;

var path; 
var pageName;
var jsonName;


$(document).ready(function(){ // READY START
	  
	jsonName = "testjson.json"

	// everything lives inside the getJSON callback function so we'll have access to the data
	// getJSON START
	$.getJSON('../../json/' + jsonName, function(data) { 
		// var lesson = new Lesson(data); 
		// lesson.init();

	}).fail( function(data, textStatus, error) {
        console.error("getJSON failed, status: " + textStatus + ", error: "+ error)
    }); // getJSON END
}); // READY END 





// // FUNCTIONS ----------------------------------------------------------------------------------------



// /// * Lesson ----------------------------------------------------------------------------------------

// function Lesson (jsonData) {
// 	this.data = jsonData;

// 	this.init = function(){
// 		// New lesson static data
// 		var videoData = this.data.video;
// 		var stepsDotsData = this.data.steps.dots;
// 		var stepsTitlesData = this.data.steps.titles;
// 		var stepsDescriptionsData = this.data.steps.descriptions;
// 		var generalData = this.data.general;
// 		// New Video
// 		var video = new Video();
// 		video.init (videoData, '#catbearsVideo'); //  create a video object , append into the html tag.
		
// 		// New Steps
// 		var steps = new Steps();
// 		steps.dots.init (stepsDotsData , ".stepsDotsContainer"); //  create a steps object , append into the html tag.
// 		steps.titles.init (stepsTitlesData, ".stepsTitlesContainer"); // create a titles object , append into the html tag.
// 		steps.descriptions.init (stepsDescriptionsData, ".stepsDescriptionsContainer"); // create a titles object , append into the html tag.
			
// 		// New LessonController
// 	}
// };

// /// ** Video ----------------------------------------------------------------------------------------
// //     Create the video html element, define "play, pause and seekTo" functions

// function Video () { 
// 	this.$el = ""; // this will hold the video html element

// 	this.Init = function (videoData , videoHtmlEL){ //when creating a new Video object we need to define the html element to connect it to

// 		// create the video in html
// 		switch(true){
// 			case lessonDataVideo.type: 'html5'
// 				// create video
// 				break;
// 			case lessonDataVideo.type: 'youtube'
// 				// embed video
// 				break;	

// 		// append the video 
// 		this.$el = $(videoHtmlEL).append(output);

// 		} 
// 	}

// 	this.play = function (){
// 		// $el play
// 	}
// 	this.pause = function (){
// 		// $el pause
// 	}
// 	this.seekTo = function (second){
// 		// $el seek to second
// 	}
// } 

// /// ** Steps ----------------------------------------------------------------------------------------
// //	   Create the Steps object that include each of the steps and append it to the lesson ui
// function Steps (){ 
// 	this.$el = ""; // this will hold the stepsContainer html element
// 	this.dots.$el = '';
// 	this.titles.$el = '';
// 	this.descriptions.$el = '';


// 	this.dots.init = function (stepsDotsData , stepsDotsHtmlEL){ //when creating a new Steps object we need to define the html element to connect it to 
// 		// for loop, create the steps according to stepsDotsData
// 		var output = '';
// 		for (var i in stepsDotsData){
// 				var stepDot = new StepDot();
// 				stepDot.init (stepsDotsData[i] , i);
// 				output += stepDot.$el; //adds to output var (a holder var) the html element of this new step
// 		};
// 		// append the steps into $el. this will actually place the steps object (which include each of the step object inside it) into the ui.   
// 	    this.$el = $(stepsDotsHtmlEL).append(output);

// 	// define init defaults
// 	}

// 	//  ** Titles ------------------------------------------------------------------------------------
// 	this.titles.init = function (stepsTitlesData , stepsTitlesHtmlEL){ //when creating a new Titles object we need to define the html element to connect it to 
// 		// for loop, create the steps according to stepsData
// 		var output = '';
// 		for (var i in titlesData){
// 				var stepTitle = new StepTitle();
// 				stepTitle.init (stepsTitlesData[i] , i);
// 				output += stepTitle[i].$el; //adds to output var (a holder var) the html element of this new step
// 		};
// 		// append the steps into $el. this will actually place the steps object (which include each of the step object inside it) into the ui.   
// 	    this.$el = $(stepsTitlesHtmlEL).append(output);

// 	}

// 	// decine init descriptions
// 	// define init defaults
// }

// /// *** Step ----------------------------------------------------------------------------------------
// function StepDot () {
// 	this.$el = '';

// 	this.init = function (stepDotData , stepDotIndex) {
// 		// create the step template , stepHtmlEL is the holder for the html tag creation
// 		var output = '';	
// 	        output += '<div class="step noMarkup" id="step-' + stepDotIndex + '" >' ;
// 	        output += stepDotData[stepDotIndex].microText;
// 	        output += '<div class="step__icon step__icon--play"></div>'; //step template includes a child step__icon div
// 	        output += '</div>';

//         // store the output in $el
// 		this.$el = $(output);
// 	}

// 	this.index = stepDotIndex;
// 	this.microText = stepData[this.index].microText;

// 	this.isSelected = false;
// 	this.isPlaying = false;
// 	this.isCompleted = false;

// 	this.setSelected = function () {
// 		this.isSelected = true;
// 		// add the class "selected" to this step $el
// 	}
// 	this.removeSelected = function () {
// 		this.isSelected = false;
// 		// remove the class "selected from this step $el"
// 	}
// 	this.setPlay = function () {
// 		this.isPlaying = true;
// 		// change step icon to pause
// 	}
// 	this.setPause = function () {
// 		this.isPlaying = false;
// 		// change step icon to play
// 	}
// 	this.setComplete = function () {
// 		this.isComplete = true;
// 		// change step icon to complete
// 	}
// 	this.togglePausePlay = function () {
// 		if(this.isPlaying){
// 			this.setPause();
// 		}else{
// 			this.setPlay();
// 		}
// 	}
// }


// //  *** Title ------------------------------------------------------------------------------------

// function StepTitle () {
// 	this.$el = '';

// 	this.init = function (stepTitleData , stepTitleIndex) {
// 		// create the step template , stepHtmlEL is the holder for the html tag creation
// 		var output = '';	
// 	        output += '<div class="title noMarkup" id="title-' + stepTitleIndex + '" >' ;
// 	        output += stepTitleData[stepTitleIndex].h1; 
// 	        output += stepTitleData[stepTitleIndex].h2; 
// 	        output += '</div>';

//         // store the output in $el
// 		this.$el = $(output);
// 	}
// 	this.index = stepTitleIndex;
// 	this.h1 = stepTitleData[this.index].h1;
// 	this.h2 = stepTitleData[this.index].h2;
	
// 	this.isShowing = false;

// 	this.fadeInAndOut = function () {
// 		this.$el.addClass('fadeInAndOut');
// 	}
// 	this.fadeOut = function () {
// 		this.$el.removeClass('fadeIn');
// 		this.$el.addClass('fadeOut');
// 	}
// }



// /// ** LessonController --------------------------------------------------------------------------



