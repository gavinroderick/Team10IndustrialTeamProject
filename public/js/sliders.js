// Called when a slider is updated. 
function updateMapFromSliders(){ 
    var stores = storeData;
    var current = getCurrentSliderLevel();
    var sliderOccupancy = current[0]/5;
    var sliderNoise = current[1]/5;
    var sliderHumidity = current[2]/5;
    console.log("Slider Values: " + sliderOccupancy + " " + sliderNoise + " " + sliderHumidity);

    for(var i = 0; i < stores.length; i++){
        var storeID = stores[i].id;
        var currentOccupancy = stores[i].history[0].times[0].occupancy;
        var currentNoise = stores[i].history[0].times[0].noise;
        var currentHumidity = stores[i].history[0].times[0].humidity;

        console.log("Values: " + currentOccupancy + " " + currentNoise + " " + currentHumidity);

        
        if(currentOccupancy <= sliderOccupancy && currentNoise <= sliderNoise && currentHumidity <= sliderHumidity){
            setStoreHighlights(storeID, [108,249,32, 200]); //green
        }
        else if(currentOccupancy > sliderOccupancy && currentNoise > sliderNoise && currentHumidity > sliderHumidity){
        	setStoreHighlights(storeID, [249,71,32, 200]); //red 
        }
        else{
        	setStoreHighlights(storeID, [249,239,32, 200]); //yellow
        }
    }

}

// Gets current levels sliders are at, parses them into numbers.
// Returns as an array.
function getCurrentSliderLevel(){
    var sliderArray =[];
    var sliders = document.getElementsByClassName("rangePicker");
    [].forEach.call(sliders, function (slider) {
        sliderArray.push(parseInt(slider.value, 10));
    });
    console.log("Slider Values: " + sliderArray);
    return sliderArray;
}
