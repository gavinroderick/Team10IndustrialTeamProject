function setEntityHighlights() {
    updateMapFromSliders();
}
function setStoreHighlights(store, colour){
    store = store.toString();
    map.indoors.setEntityHighlights(store, colour);
}

function randomColor(){
    var red = Math.floor(Math.random() * 256);
    var green = 255 - red;
    return [red, green, 0, 200];
}

function clearEntityHighlights(){
    map.indoors.clearEntityHighlights();
}