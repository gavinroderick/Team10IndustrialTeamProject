    var groundFloor;
    var groundFloorReqURL = 'api/groundFloorStores.json';
    var groundFloorReq = new XMLHttpRequest();
    groundFloorReq.open('GET', groundFloorReqURL);
    groundFloorReq.send();
    groundFloorReq.onload = () => {
        var groundFloorStores = groundFloorReq.response;
        var obj = JSON.parse(groundFloorStores);
        groundFloor = obj;
    }

    var firstFloor;
    var firstFloorReqURL = 'api/firstFloorStores.json';
    var firstFloorReq = new XMLHttpRequest();
    firstFloorReq.open('GET', firstFloorReqURL);
    firstFloorReq.send();
    firstFloorReq.onload = () => {
        var firstFloorStores = firstFloorReq.response;
        var obj = JSON.parse(firstFloorStores);
        firstFloor = obj;
    }

    var storeData;
    var storeReqURL = 'api/data.json';
    var storeReq = new XMLHttpRequest();
    storeReq.open('GET', storeReqURL);
    storeReq.send();
    storeReq.onload = () => {
        var storeDatas = storeReq.response;
        var obj = JSON.parse(storeDatas);
        storeData = obj;
    }
