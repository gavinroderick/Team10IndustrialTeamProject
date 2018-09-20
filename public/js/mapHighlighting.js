var groundFloor;

var requestURL = 'api/groundFloorStores.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.send();

request.onload = function() {
    var groundFloorStores = request.response;
    var obj = JSON.parse(groundFloorStores);
    groundFloor = obj;
}

var firstFloor;

var requestURL_1 = 'api/firstFloorStores.json';
var request_1 = new XMLHttpRequest();
request_1.open('GET', requestURL_1);
request_1.send();

request_1.onload = function() {
    var firstFloorStores = request_1.response;
    var obj = JSON.parse(firstFloorStores);
    firstFloor = obj;
}

var map = L.Wrld.map("map", "9d876646f7d83cc709edbe204c81d546", {
    center: [56.4598, -2.9728],
    zoom: 17,
    indoorsEnabled: true
});

function setEntityHighlights() {
    
    for(var i = 0; i < groundFloor.stores.length; i++){
        map.indoors.setEntityHighlights(groundFloor.stores[i].id.toString(), randomColor());
    }
    for(var i = 0; i < firstFloor.stores.length; i++){
        map.indoors.setEntityHighlights(firstFloor.stores[i].id.toString(), randomColor());
    }
}

function randomColor(){
var red = Math.floor(Math.random() * 256);
var green = 255 - red;
return [red, green, 0, 200]
}

function clearEntityHighlights() {
map.indoors.clearEntityHighlights();
}

var indoorControl = new WrldIndoorControl("widget-container", map);

var currentIndoorMapId;
var currentFloor;
var entityIdsToPosition = {};
      
var lastMouseDown;

function onMouseDown(event) {
    lastMouseDown = event.latlng;
}
      
function onIndoorEntityClicked(event) {
    event.ids.forEach(identifyEntity);
}

function exportIdMap() {
    console.log(JSON.stringify(entityIdsToPosition));
}
      
function onIndoorMapEntered(event) {
    map.indoors.setFloor(0);
    map.setView([56.4598, -2.9728], 17);
    currentIndoorMapId = event.indoorMap.getIndoorMapId();
    currentFloor = map.indoors.getFloor().getFloorIndex();
}
      
function onIndoorMapFloorChanged() {
    currentFloor = map.indoors.getFloor().getFloorIndex();
}

var d = new Date();
      
function identifyEntity(id) {
    var latLng = lastMouseDown;
        
    var popupOptions = { 
        indoorMapId: currentIndoorMapId, 
        indoorMapFloorIndex: currentFloor, 
        autoClose: false, 
        closeOnClick: false,
        minWidth: "5"          
    };
    var popup = L.popup(popupOptions)
        .setLatLng(latLng)
        .addTo(map)
        .setContent(createMockHTMLElement(id, d));
    entityIdsToPosition[id] = { "latLng": latLng, "indoorId": currentIndoorMapId, "floorIndex": currentFloor } ;
}

map.indoors.on("indoormapenter", onIndoorMapEntered);
map.indoors.on("indoormapfloorchange", onIndoorMapFloorChanged)
map.indoors.on("indoorentityclick", onIndoorEntityClicked);
map.on("mousedown", onMouseDown);

function createMockHTMLElement(id, date){
    var graphHTML = '<div class="content">' +
                    '<h1>This store\'s id is ' + id + '</h1>' +
                    '<p>And here we would have a graph</p>' +
                    '<p>' + date.getDate() + '</p>' +
                    '<p><strong>Note:</strong> If you don\'t escape "quotes" properly, it will not work.</p>' +
                    '</div>';
    return graphHTML;
}