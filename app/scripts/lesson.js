// lesson.js

// VARAIBLES
var lesson;

var path; 
var pageName;
var jsonName;



$(document).ready(function(){ // READY START
      
    path = window.location.pathname;
    pageName = path.split("/").pop();
    jsonName = pageName.replace(pageName.split(".").pop(), "json")

    // everything lives inside the getJSON callback function so we'll have access to the data
    // getJSON START
    $.getJSON('../../json/' + jsonName, function(data) { 
        lesson = new Lesson(data); 
        lesson.init();

    }).fail( function(data, textStatus, error) {
        console.error("getJSON failed, status: " + textStatus + ", error: "+ error)
    }); // getJSON END
}); // READY END 





// FUNCTIONS ----------------------------------------------------------------------------------------



/// * Lesson ----------------------------------------------------------------------------------------

function Lesson (jsonData) {
    this.data = jsonData;
    
    this.init = function(){
        // New lesson static data
        var dataVideo = this.data.video;
        var dataSteps = this.data.steps;
        // var dataStepsDots = this.data.steps.dots;
        // var dataStepsTitles = this.data.steps.titles;
        // var stepsDescriptionsData = this.data.steps.descriptions;
        var generalData = this.data.general;
        // New Video
        this.video = new Video(dataVideo);
        this.video.init ('.lessonVideo--js'); //  create a video object , append into the html tag.
        // New Steps
        this.steps = new Steps(dataSteps);
        this.steps.init();
        // New LessonController
        this.lessonController = new LessonConrtoller (this.video, this.steps);
        this.lessonController.init();

        // general
        var path = window.location.pathname;
        var pageName = path.split("/").pop();
        var jsonName = pageName.replace(pageName.split(".").pop(), "json")

    var fileName = pageName.replace(pageName.split(".").pop(), "pdf")
        fileName = fileName.split('-').join(' ');
        fileName = capitalizer(fileName);
        fileName = fileName.split(' ').join('-');

        // capitilize every first letter in string
        function capitalizer (string) {
            return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
        };

        var imgDir = '../../img'
        $('.lessonIcon--js').html("<img src='../../img/icons/" + this.data.general.lessonIcon + "' , alt='" + this.data.general.lessonName + " '> ");
        $('.lessonName--js').html(this.data.general.lessonName);
        
        // activity page
        $('.lessonActivityPageImg--js').html("<img src='../../img/activityPageImg/" + this.data.general.lessonActivityPageImg + "' , alt='" + this.data.general.lessonName + " '> ");
        $(".activityPage__pager , .activityPage__button").click(function (){
        window.open('../../pdf/The-Catbears_' + fileName)
    })

    }
};


/// ** LessonConrtoller ----------------------------------------

function LessonConrtoller (video , steps) {

    // this.videoData = video.data;
    // this.stepsData = steps.data;
    var numberOfSteps = steps.dotsArr.length;
    this.currentStepIndex = 0; // defaults
    steps.setSelectedStep(0)
    steps.dotsArr[0].setPause();
    this.autoPlay = true;
    this.isPlaying = false;
    
    this.init = function (){

        var stepReached = false;
        var now = 0;
        var dots = steps.data.dots;

        this.videoListenerInit(this);
        this.stepsOnClickInit(this);
    }    
    // lessonController FUNCTIONS

    this.videoListenerInit = function(that){

        video.$el.addEventListener("timeupdate", function(){
            now = video.$el.currentTime;
            // console.log (dots) 
            for (var i=0 ; i < numberOfSteps ; i++){

                switch(true){
                // Reached next step
                    case (i<numberOfSteps-1) :
                        if (( steps.data.dots[i].seekToSecond <= now)&&(steps.data.dots[i+1].seekToSecond > now)){
                            if (that.currentStepIndex !== i){
                                that.currentStepIndex = i;
                                console.log('step occurred ' + i)
                                that.stepOccurredListener(i);
                            }
                        }    
                        break;
                // Reached last step
                    case (i == numberOfSteps-1) :
                        if ( steps.data.dots[i].seekToSecond < now){
                            if (that.currentStepIndex !== i){
                                that.currentStepIndex = i;
                                that.stepOccurredListener(i);
                            }
                        }
                }

            }
        });
    }


    this.stepsOnClickInit = function (that) {
        // add click event to each step
        var funcs = [];
        // var stepClickedIndex = 0;
        for (var i in steps.dotsArr){
            var stepDot = document.getElementById("stepDot-" + i);
            funcs[i] = function(xx){
                // console.log("where am i")
                // steps.dotsArr[i].$el.removeClass("step__selected");
                return stepDot.onclick = function (){
                    that.stepOccurredClick(xx);
                }
            }(i);
        }
        for (var j in steps.dotsArr){
            console.log ("run "+ funcs[j])
            funcs[j];
        };
    }
    this.stepOccurredClick = function (index) {
        if (steps.dotsArr[index].isSelected == false){
            console.log ('set selected')
            steps.removeAllSelectedDots();
            steps.dotsArr[index].setSelected();
            video.seekTo(steps.data.dots[index].seekToSecond)
            video.play()
        }else{
            video.togglePlayPause()
            steps.toggleDotIcon(index);
        } 
    }    
    
    this.stepOccurredListener = function (index) {
        if (steps.dotsArr[index].isSelected == false){
            console.log ('set selected')
            steps.removeAllSelectedDots();
            steps.dotsArr[index].setSelected();
        }
        steps.toggleDotIcon(index);
        if (this.autoPlay == false){
            video.togglePlayPause()
        }
    }

    this.selectAndToggle = function(index){
        console.log ("let's toggle " + index);
        if (this.currentStepIndex == index){
            steps.removeAllSelectedDots()
            steps.dotsArr[xx].setSelected()
        }else{
            this.currentStepIndex = index;

        }
    }
}

/// ** Video ----------------------------------------------------------------------------------------
//     Create the video html element, define "play, pause and seekTo" functions

function Video (dataVideo) { 
    this.$el = ""; // this will hold the video html element
    this.data = dataVideo;
    this.init = function (videoHtmlEL){ //when creating a new Video object we need to define the html element to connect it to

        // create the video in html
        var output = '';
        switch(true){
            case (this.data.type ==  'html5') :
                output += '<video id="catbearsVideo" width="100%" height="100%" controls="">'
                output += '<source src="../video/'
                output += this.data.fileName
                output += '" type="video/mp4"/>'
                output += 'Your browser does not support HTML5 video.'
                output += '</video>'
                break;
            case (this.data.type == 'youtube') : 
                // embed video
                break;  


        } 
        // append the video 
        $(videoHtmlEL).append(output);
        this.$el = document.getElementById("catbearsVideo");
    }; 
    this.play = function (){
        this.$el.play()
        // $el play
    }
    this.pause = function (){
        this.$el.pause()
    }
    this.togglePlayPause = function () { 
        if(this.$el.paused){
           this.$el.play();
         }else{ 
           this.$el.pause();
        }; 
    };
    this.seekTo = function (second){
         this.$el.currentTime = second;
    }
} 

/// ** Steps ----------------------------------------------------------------------------------------
//     Create the Steps object that include each of the steps and append it to the lesson ui
function Steps (dataSteps){ 
    // this.$el = ""; // this will hold the stepsContainer html element
    // this.dots.$el = '';
    // this.titles.$el = '';
    // this.descriptions.$el = '';
    this.data = dataSteps;
    this.dotsArr = [];
    this.titlesArr = [];

    this.init = function (){    
        this.dotsInit (this.data.dots , ".stepsDotsContainer--js"); //  create a steps object , append into the html tag.
        this.titlesInit (this.data.titles, ".stepsTitlesContainer--js"); // create a titles object , append into the html tag.
        // steps.descriptions.init (stepsDescriptionsData, ".stepsDescriptionsContainer"); // create a titles object , append into the html tag.ta
        // setStepsDefaults (this.data); 
    }

    this.dotsInit = function (dataStepsDots , stepsDotsHtmlEL){ //when creating a new Steps object we need to define the html element to connect it to 
        // for loop, create the steps according to dataStepsDots
        var output = '';
        for (var i in dataStepsDots){
                var stepDot = new StepDot();
                stepDot.init (dataStepsDots[i] , i);
                output += stepDot.snippet; //adds to output var (a holder var) the html element of this new step
                this.dotsArr.push(stepDot);
        };
        // the birth of the stepsDots into the UI
        $(stepsDotsHtmlEL).append(output);

        // after the elements are appended, set the $el for each dot
        for (var i in dataStepsDots){
            this.dotsArr[i].$el = $('#stepDot-' + i) 
        }
    }

    //  ** Titles ------------------------------------------------------------------------------------
    this.titlesInit = function (dataStepsTitles , stepsTitlesHtmlEL){ //when creating a new Titles object we need to define the html element to connect it to 
        // for loop, create the steps according to dataSteps
        var output = '';
        for (var i in dataStepsTitles){
                var stepTitle = new StepTitle();
                stepTitle.init (dataStepsTitles[i] , i);
                output += stepTitle.snippet; //adds to output var (a holder var) the html element of this new step
                this.titlesArr.push(stepTitle);
        };
        // append the steps into $el. this will actually place the steps object (which include each of the step object inside it) into the ui.   
        this.$el = $(stepsTitlesHtmlEL).append(output);
        
        // after the elements are appended, set the $el for each titles
        for (var i in dataStepsTitles){
            this.titlesArr[i].$el = $('#stepTitle-' + i) 
        }

        this.removeAllTitles();
        this.titlesArr[0].showTitle()
    }
    // define init descriptions
    // set defaults

   // Steps FUNCTIONS -------------------------------------
    // 

    this.setSelectedStep = function (index){
        this.removeAllSelectedDots();
        this.dotsArr[index].setSelected();          
        this.removeAllTitles();
        this.titlesArr[index].showTitle();
        // this.descriptionsArr[index].setDescription();
    }

    this.removeAllSelectedDots = function (){
        for (var i in this.dotsArr) {
            this.dotsArr[i].removeSelected()
        }
    }
    this.pauseAllDots = function () {
        for (var i in this.dotsArr) {
            this.dotsArr[i].setPause()
        }
    }
    this.removeAllTitles = function (){
        for (i in this.titlesArr){
            this.titlesArr[i].displayNone();
        }
    }
    this.next = function (currentStepIndex){
        if(currentStepIndex !== this.dotsArr.length){
            setSelectedStep(currentStepIndex+1)
        }
    };

    this.prev = function (currentStepIndex){
        if(currentStepIndex !== 0){
            setSelectedStep(currentStepIndex-1)
        }
    };
    
    this.toggleDotIcon = function (index) {
        switch(true){
           case (this.dotsArr[index].$el.find(".stepDot__icon").hasClass("stepDot__icon--pause")) :
              this.pauseAllDots();
           break; 
           case (this.dotsArr[index].$el.find(".stepDot__icon").hasClass("stepDot__icon--play")) :
              this.pauseAllDots();  
              this.dotsArr[index].togglePlayPause();
        }
    }

    // function setSelectedStep (index){
    //     selectDot (index)
    //     showTitle (index);
    // }
    


    // function setStepsDefaults (dataSteps){
    //     this.removeAllTitles();
    //     dataSteps.titlesArr[0].showTitle() ;
    // }

    function selectDot (index) {
        for (var i in this.dotsArr){
          $('#stepDot-' + i).addClass('displayNone') 
        }
        $('#stepDot-' + index).removeClass('displayNone') 
    }



    

}

/// *** Step ----------------------------------------------------------------------------------------
function StepDot () {
    this.$el = '';

    this.init = function (dataStepDot , stepDotIndex) {

    this.index = stepDotIndex;
    this.microText = dataStepDot.microText;
    
        // create the step template , stepHtmlEL is the holder for the html tag creation
        var output = '';    
            // output += '<div class="step noMarkup" id="step-' + stepDotIndex + '" >' ;
            output += '<div class="stepDot noMarkup" id="stepDot-' + this.index + '" >' ;
            output += this.microText;
            output += '<div class="stepDot__icon stepDot__icon--play"></div>'; //step template includes a child step__icon div
            output += '</div>';

        // store the output in $el
        this.snippet = output;
    }

    // this layer of data is just for backup incase there are bugs.
    // this data should be stored in lessonController, not here!
    this.isSelected = false;
    this.isPlaying = false;
    this.isCompleted = false;
    //

    this.setSelected = function () {
        this.isSelected = true;
        this.$el.addClass("stepDot__selected")
    }
    this.removeSelected = function () {
        this.isSelected = false;
        this.$el.removeClass("stepDot__selected")
    }
    this.setPlay = function () {
        this.isPlaying = true;
        this.$el.find('.stepDot__icon').removeClass("stepDot__icon--play")
        this.$el.find('.stepDot__icon').addClass("stepDot__icon--pause")
        // change step icon to pause
    }
    this.setPause = function () {
        this.isPlaying = false;
        this.$el.find('.stepDot__icon').removeClass("stepDot__icon--pause")
        this.$el.find('.stepDot__icon').addClass("stepDot__icon--play")
        // change step icon to play
    }
    this.setComplete = function () {
        this.isComplete = true;
        // change step icon to complete
    }
    this.togglePlayPause = function () {
        if(this.isPlaying){
            this.setPause();
        }else{
            this.setPlay();
        }
    }
}


//  *** Title ------------------------------------------------------------------------------------

function StepTitle () {
    // this.$el = '';

    this.init = function (dataStepTitle , stepTitleIndex) {
        // create the step template , stepHtmlEL is the holder for the html tag creation
        this.index = stepTitleIndex;
        this.mainTitle = dataStepTitle.mainTitle;
        this.subTitle = dataStepTitle.subTitle;

        var output = '';    
            output += '<div class="stepTitle noMarkup" id="stepTitle-' + stepTitleIndex + '" >' ;
            output += '<h1 class="stepMainTitle noMarkup">' + dataStepTitle.mainTitle + '</h1>';
            output += '<h2 class="stepSubTitle noMarkup">' + dataStepTitle.subTitle + '</h2>';
            output += '</div>';

        // store the output in $el
        this.snippet = output;
        this.$el = document.getElementById('stepTitle-' + this.index);
    }

    this.fadeInAndOut = function () {
        this.$el.addClass('fadeInAndOut');
    }
    this.fadeOut = function () {
        this.$el.removeClass('fadeIn');
        this.$el.addClass('fadeOut');
    }
    this.displayNone = function (){
        this.$el.addClass('displayNone');
    }

    this.showTitle = function (){
        this.$el.removeClass('displayNone') 
    }
}



/// ** LessonController --------------------------------------------------------------------------



