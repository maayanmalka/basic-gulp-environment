// html5-video__controller.js

var vid;
var now;
var dataBase;
var global_stepPlaying;
var output = "";
var stepsNum;
var autoPlay = true;
var path;
var pageName;
var fileName; 
var jsonName;
var stepToggles = false;

$(document).ready(function(){

    vid = document.getElementById("catbearsVideo");
    setPageVar();
    // setActivityPage();

    // load Json & create steps into 'output' var
    $.getJSON('../../json/' + jsonName, function(data) {
        dataBase = data;
        stepsNum = dataBase.steps.length;
        
        lessonInit(dataBase);


        for (var i in dataBase.steps){
            output += '<div class="step noMarkup" id="step-' + dataBase.steps[i].name + '" >' ;
            output += dataBase.steps[i].name; 
            output += '<div class="step__icon step__icon--play"></div>';
            output += '</div>';
        };

    // create steps    
        $(".stepsContainer").append(output);

    // add click functionality to each step
        var funcs = [];
        for (var i in dataBase.steps){
            var step = document.getElementById("step-" + dataBase.steps[i].name);
            funcs[i] = function(xx){
                $(".stepsContainer").find(step).removeClass("step__selected");
                return step.onclick = function (){
                    stepClicked = document.getElementById("step-" + dataBase.steps[xx].name);
                    
                    //click on selected step
                    if (stepClicked == global_stepPlaying){
                        togglePlayPause(vid);
                        // initStepsIcons(dataBase.steps)
                        toggleStepIcon(stepClicked , dataBase.steps);

                    //click on step
                    }else{
                        // initStepsIcons(dataBase.steps)
                        appendStepTexts(xx);
                        global_stepPlaying = stepClicked;
                        vidSeekTo(vid, dataBase.steps[xx].seekToSecond);
                        removeAllSelectedSteps(dataBase.steps);
                        $(".stepsContainer").find(global_stepPlaying).addClass("step__selected");
                        updateVideoTitles(dataBase.steps , xx);
                        toggleStepIcon(stepClicked, dataBase.steps);
                    };
                }
            }(i);
        }



        for (var j in dataBase.steps){
            console.log ("run "+ funcs[j])
            funcs[j];
        };
        
        // this function selects the playing step in the steps bar
        function listenCurrentStep (video , stepToggles) {
            video.addEventListener("timeupdate", function(){
               now = this.currentTime; 
                
                for (var i in dataBase.steps){

                    // listening, next step arrived
                    if (dataBase.steps[i].seekToSecond > now){
                        // initStepsIcons(dataBase.steps);
                        removeAllSelectedSteps(dataBase.steps);
                        setSelectedStep(i - 1);
                        updateVideoTitles(dataBase.steps , i - 1);
                        // if (stepToggles == false ){ // !!!!!!!!!!!!!!!!!!@@$!@$!@#!#!@#!@#!@#!@#!@#!@##!@#!@#!@@!#
                        //     toggleStepIcon($("#step-" + dataBase.steps[i-1].name) , dataBase.steps);
                        //     stepToggles = true;
                        // }
                        // console.log (dataBase.steps[i - 1])
                        break;
                    };

                    // listening, last step arrived
                    if (dataBase.steps[stepsNum - 1].seekToSecond < now){
                        // initStepsIcons(dataBase.steps);
                        removeAllSelectedSteps(dataBase.steps);
                        setSelectedStep(stepsNum - 1);
                        updateVideoTitles(dataBase.steps , stepsNum - 1);
                         if (stepToggles  == false){
                            toggleStepIcon($("#step-" + dataBase.steps[i-1].name) , dataBase.steps);
                             stepToggles = true;
                         }
                        break;
                    }
                }
            });
        }

        // init - remove selected steps, choose the first one, and seek video to it.
        removeAllSelectedSteps(dataBase.steps);
        setSelectedStep(0)
        vid.currentTime = 0;
        appendStepTexts(0);
        listenCurrentStep(vid);
        generateVideoTitles(dataBase.steps);
        updateVideoTitles(dataBase.steps ,0);

    }).fail( function(data, textStatus, error) {
        console.error("getJSON failed, status: " + textStatus + ", error: "+ error)
    });
});





// FUNCTIONS
function setSelectedStep (num) {
    global_stepPlaying = document.getElementById("step-" + dataBase.steps[num].name);
    $(".stepsContainer").find(global_stepPlaying).addClass("step__selected");
    appendStepTexts(num);
} 


function vidSeekTo(video, second) { 
    video.currentTime = second;
    if(video.paused){
       video.play(); 
     }else{ 
       video.play();
    }; 
}; 

function togglePlayPause(video) { 
    if(video.paused){
       video.play();
     }else{ 
       video.pause();
    }; 
};

function toggleStepIcon (step , dataBaseSteps) {
    switch (true) {
        case ($(step).find(".step__icon").hasClass("step__icon--pause")) :
            console.log('is pasued')
            initStepsIcons (dataBaseSteps);
            $(step).find(".step__icon").removeClass("step__icon--pause");
            $(step).find(".step__icon").addClass("step__icon--play");
            break;
        case ($(step).find(".step__icon").hasClass("step__icon--play")) :
            console.log('is played')
            initStepsIcons (dataBaseSteps);
           $(step).find(".step__icon").removeClass("step__icon--play");
           $(step).find(".step__icon").addClass("step__icon--pause");
           break;
    }
}

function initStepsIcons (dataBaseSteps) {
    for (var i in dataBaseSteps){
        var step = document.getElementById("step-" + dataBaseSteps[i].name);
        $(step).find(".step__icon").removeClass("step__icon--pause")
        $(step).find(".step__icon").addClass("step__icon--play")
    }
}


function removeAllSelectedSteps (dataBaseSteps) {
    for (var i in dataBaseSteps){
        var step = document.getElementById("step-" + dataBaseSteps[i].name);
        $(".stepsContainer").find(step).removeClass("step__selected");
    }
}



function appendStepTexts (num) {
    $("#step__title").html(dataBase.steps[num].title)
    $("#step__description").html(dataBase.steps[num].description);
    showMoreInit();
};



// load Json syncronic
function loadJson(jsonFileName) {
    //console.log("JSON - loadJson loading: " + jsonFileName);
    var request = new XMLHttpRequest();
    request.open('GET', jsonFileName, false);
    request.send(null);

    if (request.status === 200) {
        //console.log("JSON - loaded: " + jsonFileName);
        return JSON.parse(request.responseText);
    }
};

function pauseOnSecond (video) {
    video.addEventListener("timeupdate", function(){
        if( this.currentTime > 10 && this.currentTime < 11) {
            this.pause();
        }
    });
}

function setPageVar (){
    path = window.location.pathname;
    pageName = path.split("/").pop();
    jsonName = pageName.replace(pageName.split(".").pop(), "json")

    fileName = pageName.replace(pageName.split(".").pop(), "pdf")
    fileName = fileName.split('-').join(' ');
    fileName = capitalizer(fileName);
    fileName = fileName.split(' ').join('-');
}


// capitilize every first letter in string
function capitalizer (string) {
    return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

// getJSON template
// function name() {
//     $.getJSON("", function(d) {
//         alert("success");
//     }).fail( function(d, textStatus, error) {
//         console.error("getJSON failed, status: " + textStatus + ", error: "+error)
//     });
// }

function generateVideoTitles (dataBaseSteps) {
    var titleDiv;
    for (var i in dataBase.steps){
            titleDiv += '<div class="videoTitleContainer noMarkup fadeInSlideRightDelaySlideLeftFadeOut displayNone" id="videoTitle-' + dataBase.steps[i].name + '">';
            titleDiv += '<h1 class="videoTitle noMarkup">' + dataBase.steps[i].title + '</h1>';
            titleDiv += '<h2 class="videoSubTitle noMarkup">' + dataBase.steps[i].subtitle +'</h2>';
            titleDiv += '</div>';
    } 
    // create videoTitles    
    $(".videoPlayer").append(titleDiv);

}

function updateVideoTitles (dataBaseSteps , titleNumberToShow) {
    for (var i in dataBaseSteps){
      $('#videoTitle-' + dataBase.steps[i].name).addClass('displayNone') 
    }

    $('#videoTitle-' + dataBase.steps[titleNumberToShow].name).removeClass('displayNone') 
};


// -----------


function lessonInit (dataBase) {
    setActivityPage ();
    setLessonDetails(dataBase.details);
}


function setActivityPage () {
    $(".activityPage__pager , .activityPage__button").click(function (){
        window.open('../../pdf/The-Catbears_' + fileName)
    })
}

function setLessonDetails (dataBaseDetails) {
    $(".lessonName--js").html(dataBaseDetails.lessonName);
    $(".lessonIcon--js").html("<img src='../../img/icons/" + dataBaseDetails.lessonIcon + "' , alt='" + dataBaseDetails.lessonName + " '> ");

    $(".lessonActivityPageImg--js").html("<img src='../../img/activityPageImg/" + dataBaseDetails.lessonActivityPageImg + "' , alt='" + dataBaseDetails.lessonName + " '> ");

}