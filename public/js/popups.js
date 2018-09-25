var map = L.Wrld.map("map", "9d876646f7d83cc709edbe204c81d546", {
    center: [56.4598, -2.9728],
    zoom: 17,
    indoorsEnabled: true
  });
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
    currentIndoorMapId = event.indoorMap.getIndoorMapId();
    currentFloor = map.indoors.getFloor().getFloorIndex();
  }
  
  function onIndoorMapFloorChanged() {
    currentFloor = map.indoors.getFloor().getFloorIndex();
  }
  
  function identifyEntity(id) {
    var latLng = lastMouseDown;

    var graph = drawBasic(id);
    
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
      .setContent(graph);
    entityIdsToPosition[id] = { "latLng": latLng, "indoorId": currentIndoorMapId, "floorIndex": currentFloor } ;
  }

  map.indoors.on("indoormapenter", onIndoorMapEntered);
  map.indoors.on("indoormapfloorchange", onIndoorMapFloorChanged)
  map.indoors.on("indoorentityclick", onIndoorEntityClicked);
  map.on("mousedown", onMouseDown);