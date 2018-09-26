var map = L.Wrld.map("map", "9d876646f7d83cc709edbe204c81d546", {
    center: [56.4598, -2.9728],
    zoom: 17,
    indoorsEnabled: true
});
  var indoorControl = new WrldIndoorControl("widget-container", map);
  var currentIndoorMapId;
  var currentFloor;
  var entityIdsToPosition = {};
  var d;
  var popup;
  
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

  function getStoreName(id){
    if(currentFloor == 0)
    {
      for(var i = 0; i < groundFloor.stores.length; i++)
      {
        if(groundFloor.stores[i].id == id)
        {
          //console.log(groundFloor.stores[i].store);
          return groundFloor.stores[i].store;
        }
      }
    }
  }

  function validId(id) {

    for( var i = 0; i < groundFloor.stores.length; i++)
    {
          if (storeData[i]['id'] == id)
          {
              return i;
          }
    }
    for( var i = 0; i < firstFloor.stores.length; i++)
    {
          if (storeData[i]['id'] == id)
          {
              return i;
          }
    }
    return null;
}
  
  function identifyEntity(id) {
    var latLng = lastMouseDown;
    d = new Date();

    var valid = validId(id);

    if(valid != null)
    {
      map.setView(latLng, 17);
      
      var popupOptions = { 
        indoorMapId: currentIndoorMapId, 
        indoorMapFloorIndex: currentFloor, 
        autoClose: true, 
        closeOnClick: true,
        minWidth: "700"          
      };
      popup = L.popup(popupOptions)
        .setLatLng(latLng)
        .addTo(map)
        .setContent(createMockHTMLElement(id, d, drawBasic(id)));
      entityIdsToPosition[id] = { "latLng": latLng, "indoorId": currentIndoorMapId, "floorIndex": currentFloor } ;
    }

    setTimeout(updatePopup(id, d), 5000);
  }

  function updatePopup(id, d)
  {
    d = new Date();
    console.log(d.toLocaleTimeString('it-IT'));
    popup.setContent(createMockHTMLElement(id, d, drawBasic(id)));
  }

  map.indoors.on("indoormapenter", onIndoorMapEntered);
  map.indoors.on("indoormapfloorchange", onIndoorMapFloorChanged)
  map.indoors.on("indoorentityclick", onIndoorEntityClicked);
  map.on("mousedown", onMouseDown);

  function createMockHTMLElement(id, date, graphText){
    var graphHTML = '<div class="content">' +
                    '<h2>'+ getStoreName(id) +  ' ' + d.toLocaleTimeString('it-IT') +
                    graphText +
                    '</div>';
    return graphHTML;
}





/*                  '<div class="content">' +
                    '<h2>'+ getStoreName(id) + ' for the ' + d.getDate() + ' of Spetember 2018</h2>' +
                    graphText +
                    '</div>';
*/



