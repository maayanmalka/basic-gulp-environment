// html5-video__controller.js

var vid;
var dataBase;
var stepCurrentlyPlaying;
var output = "";

$(document).ready(function(){

    vid = document.getElementById("catbearsVideo");

    // load Json & create steps into 'output' var
    $.getJSON('../../json/racing-car.json' , function(data) {
        dataBase = data;
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
                        appendStepTexts(xx);
                        stepCurrentlyPlaying = stepClicked;
                        // console.log("step currently playing : " + stepCurrentlyPlaying.name)
                        vidSeekTo(dataBase.steps[xx].seekToSecond);
                        removeAllSelectedSteps();
                        $(".stepsContainer").find(stepCurrentlyPlaying).addClass("step__selected");
                    };
                }
            }(i);
        }

        for (var j in dataBase.steps){
            console.log ("run "+ funcs[j])
            funcs[j];
        };
        // init - remove selected steps, choose the first one, and seek video to it.
        removeAllSelectedSteps();
        stepCurrentlyPlaying = document.getElementById("step-" + dataBase.steps[0].name);
        $(".stepsContainer").find(stepCurrentlyPlaying).addClass("step__selected");
        vid.currentTime = 0;
        appendStepTexts(0);
    });

});

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
    $("#step__title").html(dataBase.steps[num].title);
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

