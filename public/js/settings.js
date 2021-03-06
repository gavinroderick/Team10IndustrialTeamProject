//Onload function to setup sliders
window.onload = function (){
    var sliders = document.getElementsByClassName("rangePicker");
    // var textBoxes = document.getElementsByClassName("textBox");
    [].forEach.call(sliders, function (slider) {    
        slider.min = 1;
        slider.max = 5;
        slider.step = 1;
        slider.value = 3;
    });
}

function presetsUpdate(level){
    var occupancy = [1,3,5];
    var noise = [1,3,5];
    var light = [1,3,5];

    for(var i=0; i < 3; i++){
        document.getElementById("occupancy-slider").value = occupancy[level];
        document.getElementById("noise-slider").value = noise[level];
        document.getElementById("light-slider").value = light[level];
    }
}
