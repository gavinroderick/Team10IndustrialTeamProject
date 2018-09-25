//Onload function to setup sliders
window.onload = function (){
    var sliders = document.getElementsByClassName("rangePicker");
    // var textBoxes = document.getElementsByClassName("textBox");
    [].forEach.call(sliders, function (slider) {    
        slider.min = 10;
        slider.max = 50;
        slider.step = 10;
        slider.value = 30;
    });

    document.getElementById("SAD").addEventListener("click", presetsUpdate(0));
    document.getElementById("GOOD").addEventListener("click", presetsUpdate(2));
    document.getElementById("NORMAL").addEventListener("click", presetsUpdate(1));
}

function presetsUpdate(level){
    var occupancy = [10,30,50];
    var noise = [10,30,50];
    var humidity = [10,30,50];

    for(var i=0; i < 3; i++){
        document.getElementById("occupancy-slider").value = occupancy[level];
        document.getElementById("noise-slider").value = noise[level];
        document.getElementById("humidity-slider").value = humidity[level];
    }
}