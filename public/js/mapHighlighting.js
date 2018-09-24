google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

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

var storeData;

var requestURL_2 = 'api/data.json';
var request_2 = new XMLHttpRequest();
request_2.open('GET', requestURL_2);
request_2.send();

request_2.onload = function() {
    var storeDatas = request_2.response;
    var obj = JSON.parse(storeDatas);
    storeData = obj;
    //console.log(obj);
}

var map = L.Wrld.map("map", "9d876646f7d83cc709edbe204c81d546", {
    center: [56.4598, -2.9728],
    zoom: 17,
    indoorsEnabled: true
});


function drawBasic(id) {

      var store;

      for( var i = 0; i < groundFloor.stores.length; i++)
      {
          if (storeData[i]['id'] == id)
          {
              store = i;
              break;
          }
      }
      for( var i = 0; i < firstFloor.stores.length; i++)
      {
          if (storeData[i]['id'] == id)
          {
              store = i;
              break;
          }
      }

      var data = new google.visualization.DataTable();

      data.addColumn('string', 'Time');
      data.addColumn('number', 'Occupancy');
      data.addColumn('number', 'Noise');
      data.addColumn('number', 'Humidity');


      for( var i = 1; i < 41; i++)
      {

        var timeslot = storeData[store]['history'][0]['times'][i-1]['timeslot'].toString();
        var timeslotArray = timeslot.split('');
        
        var hour = timeslotArray[11].concat(timeslotArray[12]);
        var min = timeslotArray[14].concat(timeslotArray[15]);
        var time = hour.concat(min);




        data.addRows([
            [
                
                time, 
                storeData[store]['history'][0]['times'][i-1]['occupancy']*100, 
                storeData[store]['history'][0]['times'][i-1]['noise']*100,
                storeData[store]['history'][0]['times'][i-1]['humidity']*100
            ]
        ]
        );

      }


        var options = {
          hAxis: { 
            showTextEvery : '4',
          },
          title: 'Store ' + id,
          curveType: 'function',
          width: '1000',
          legend: { position: 'bottom' }
        };

      var chart_div = document.getElementById('chart_div');
      var chart = new google.visualization.LineChart(chart_div);

      // Wait for the chart to finish drawing before calling the getImageURI() method.
      google.visualization.events.addListener(chart, 'ready', function () { });

      chart.draw(data, options);
      return('<img src="' + chart.getImageURI() + '">');
    }

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

function validId(id) {

    for( var i = 0; i < groundFloor.stores.length; i++)
    {
          if (storeData[i]['id'] == id)
          {
              return true;
          }
    }
    for( var i = 0; i < firstFloor.stores.length; i++)
    {
          if (storeData[i]['id'] == id)
          {
              return true;
          }
    }
    return false;
}

var d = new Date();
      
function identifyEntity(id) {

    var valid = validId(id);

    if(valid == true)
    {
        var latLng = lastMouseDown;
        map.setView(latLng);

        var graphText = drawBasic(id);

        var popupOptions = { 
            indoorMapId: currentIndoorMapId, 
            indoorMapFloorIndex: currentFloor, 
            autoClose: true, 
            keepInView: true,
            closeOnClick: true,
            minWidth: "1000"          
        };
        var popup = L.popup(popupOptions)
            .setLatLng(latLng)
            .addTo(map)
            .setContent(createMockHTMLElement(id, d, graphText));
        entityIdsToPosition[id] = { "latLng": latLng, "indoorId": currentIndoorMapId, "floorIndex": currentFloor } ;
    }
    

}


map.indoors.on("indoormapenter", onIndoorMapEntered);
map.indoors.on("indoormapfloorchange", onIndoorMapFloorChanged)
map.indoors.on("indoorentityclick", onIndoorEntityClicked);
map.on("mousedown", onMouseDown);

function createMockHTMLElement(id, date, graphText){
    var graphHTML = '<div class="content">' +
                    '<h1>This store\'s id is ' + id + '</h1>' +
                    '<div if="chart_div"></div>' +
                    graphText +
                    '<p>' + date.getDate() + '</p>' +
                    '<p><strong>Note:</strong> If you don\'t escape "quotes" properly, it will not work.</p>' +
                    '</div>';
    return graphHTML;
}
















