// var occupancySlider = document.getElementById("occupancy-slider"); 
// var occupancyText = document.getElementById("occupancy-value");
// var noiseSlider = document.getElementById("noise-slider"); 
// var noiseText = document.getElementById("noise-value");
// var humiditySlider = document.getElementById("humidity-slider"); 
// var humidityText = document.getElementById("humidity-value");

//Runs at start to set default text box values
sliderValueUpdate("occupancy");

//Changes the value of the text on slider update
function sliderValueUpdate(category){
    var categoryText = category + "-text";
    var categorySlider = category + "-slider";

    document.getElementById(categoryText).value = document.getElementById(categorySlider).value;
}
//Changes the value of the slider on text update
function textValueUpdate(category){
    var categoryText = category + "-text";
    var categorySlider = category + "-slider";

    document.getElementById(categorySlider).value = document.getElementById(categoryText).value;

}