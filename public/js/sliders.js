// Called when a slider is updated. 
function updateMapFromSliders(){ 

    var stores = storeData;
    var current = getCurrentSliderLevel();
    var level = Math.round(getAverageSliderLevel(current));
    var max = getMaxToleranceLevel(level);
    var min = getMinToleranceLevel(level);

    for(var i = 0; i < stores.length; i++){
        var storeID = stores[i].id;
        //var currentData = getCurrentData(storeID, Math.round(level));
        var dataArray = getCurrentTimeslot(storeID);
        console.log(dataArray, i);
        var colour = calculateColour(dataArray, max, min); 

        setStoreHighlights(storeID, colour);
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
    return sliderArray;
}


// Takes an array of numbers (int)
// Returns the average of the array.
// Code for avaraging arrays found via Google at https://gist.github.com/bmorelli25/4564b8ff35b47d8a9db6b0dda1143465
function getAverageSliderLevel(sliderArray){
    const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
    return arrAvg(sliderArray);
};

function getMaxToleranceLevel(sliderAvg){
    var maxTolerable;
    switch(sliderAvg){
        case 1:
        case 2:
            return maxTolerable = 0.4;
            break;
        case 3:
            return maxTolerable = 0.6;
            break;
        case 4:
        case 5:
            return maxTolerable = 0.9;
            break;
    }
}
function getMinToleranceLevel(sliderAvg){
    var minTolerable;

    switch(sliderAvg){
        case 1:
        case 2:
            return minTolerable = 0.1;
            break;
        case 3:
            return minTolerable = 0.3;
            break;
        case 4:
        case 5:
            return minTolerable = 0.6;
            break;
    }
}
// parseDataObj(obj);
//     obj
//     currentDataArray = [];
//     currentArray.push(currentTimeslot['occupancy']);
//     currentArray.push(currentTimeslot['noise']);
//     currentArray.push(currentTimeslot['humidity']);

//     return calculateColour(currentArray, maxTolerable, minTolerable);
// }

function getCurrentTimeslot(id){
    var store;
    for( var i = 0; i < groundFloor.stores.length; i++) {
        if (storeData[i]['id'] == id) {
            store = i;
            break;
        }
    }
    return storeData[store]['history'][0]['times'][0];
}

function checkValue(value, max, min){
    var colourLevel = 0;
    if(parseFloat(value) > max){ colourLevel = 5; };
    if(parseFloat(value) < min){ colourLevel = 1; };
    if(parseFloat(value) < max && parseFloat(value > min)){ colourLevel = 3; };
    return parseInt(colourLevel);
}

function calculateColour(currentDataObj, max, min){
    var colourLevel = 0;
    var colour;
    var occupancy = currentDataObj.occupancy;
    var noise = currentDataObj.noise;
    var humidity = currentDataObj.humidity;

    colourLevel += checkValue(occupancy,max,min);
    colourLevel += checkValue(noise, max, min);
    colourLevel += checkValue(humidity, max, min);
    
    var avgColourLevel = Math.round(colourLevel / 3);
    console.log(avgColourLevel);
    switch(avgColourLevel){
        case 1:
        case 2:
            colour = [255,0,0,200];
            break;
        case 3:
            colour = [255,140,0,200];
            break;
        case 4:
        case 5:
            colour = [0,255,0,200];
            break;
        default: 
            colour= [255,255,200, 200];
    }
    return colour;
}
