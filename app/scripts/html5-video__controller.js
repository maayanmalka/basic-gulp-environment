// html5-video__controller.js

var vid;
var now;
var dataBase;
var stepCurrentlyPlaying;
var output = "";
var stepsNum;
var autoPlay = true;
var path;
var pageName;
var fileName; 
var jsonName;

$(document).ready(function(){

    vid = document.getElementById("catbearsVideo");
    setPageVar();
    setActivityPage();

    // load Json & create steps into 'output' var
    $.getJSON('../../json/' + jsonName, function(data) {
        dataBase = data;
        stepsNum = dataBase.steps.length;
        
        for (var i in dataBase.steps){
            output += '<div class="step noMarkup" id="step-' + dataBase.steps[i].name + '" >' ;
            output += dataBase.steps[i].name; 
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

                    if (stepClicked == stepCurrentlyPlaying){
                        togglePlayPause();
                    }else{
                        // what happen if clicked on Step to Play
                        appendStepTexts(xx);
                        stepCurrentlyPlaying = stepClicked;
                        // console.log("step currently playing : " + stepCurrentlyPlaying.name)
                        vidSeekTo(dataBase.steps[xx].seekToSecond);
                        removeAllSelectedSteps();
                        $(".stepsContainer").find(stepCurrentlyPlaying).addClass("step__selected");
                        updateVideoTitles(dataBase.steps , xx);
                    };
                }
            }(i);
        }



        for (var j in dataBase.steps){
            console.log ("run "+ funcs[j])
            funcs[j];
        };
        
        // this function selects the playing step in the steps bar
        function listenCurrentStep () {
            vid.addEventListener("timeupdate", function(){
               now = this.currentTime; 
                for (var i in dataBase.steps){
                    if (dataBase.steps[i].seekToSecond > now){
                        removeAllSelectedSteps();
                        setSelectedStep(i - 1);
                         updateVideoTitles(dataBase.steps , i - 1);
                        break;
                    };

                    if ( dataBase.steps[stepsNum - 1].seekToSecond < now){
                        removeAllSelectedSteps();
                        setSelectedStep(stepsNum - 1);
                        updateVideoTitles(dataBase.steps , stepsNum - 1)
                        break;
                    }
                }
            });
        }

        // init - remove selected steps, choose the first one, and seek video to it.
        removeAllSelectedSteps();
        setSelectedStep(0)
        vid.currentTime = 0;
        appendStepTexts(0);
        listenCurrentStep();
        generateVideoTitles(dataBase.steps);
        updateVideoTitles(dataBase.steps ,0);

    }).fail( function(data, textStatus, error) {
        console.error("getJSON failed, status: " + textStatus + ", error: "+error)
    });
});





// FUNCTIONS
function setSelectedStep (num) {
    stepCurrentlyPlaying = document.getElementById("step-" + dataBase.steps[num].name);
    $(".stepsContainer").find(stepCurrentlyPlaying).addClass("step__selected");
    appendStepTexts(num);
} 


function vidSeekTo(second) { 
    vid.currentTime = second;
    if(vid.paused){
       vid.play(); 
     }else{ 
       vid.play();
    }; 
}; 

function togglePlayPause() { 
    if(vid.paused){
       vid.play(); 
     }else{ 
       vid.pause();
    }; 
};

function removeAllSelectedSteps () {
    for (var i in dataBase.steps){
        var step = document.getElementById("step-" + dataBase.steps[i].name);
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

function pauseOnSecond () {
    vid.addEventListener("timeupdate", function(){
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

function setActivityPage () {
    $(".activityPage__pager , .activityPage__button").click(function (){
        window.open('../../pdf/The-Catbears_' + fileName)
    })
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