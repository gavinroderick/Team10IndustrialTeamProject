function setEntityHighlights() {
    for(var i = 0; i < groundFloor.stores.length; i++){
        map.indoors.setEntityHighlights(groundFloor.stores[i].id.toString(), randomColor());
    }
    for(var i = 0; i < firstFloor.stores.length; i++){
        map.indoors.setEntityHighlights(firstFloor.stores[i].id.toString(), randomColor());
    }

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