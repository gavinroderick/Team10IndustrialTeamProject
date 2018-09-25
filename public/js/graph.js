google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);


    // var groundFloor;
    // var groundFloorReqURL = 'api/groundFloorStores.json';
    // var groundFloorReq = new XMLHttpRequest();
    // groundFloorReq.open('GET', groundFloorReqURL);
    // groundFloorReq.send();
    // groundFloorReq.onload = () => {
    //     var groundFloorStores = groundFloorReq.response;
    //     var obj = JSON.parse(groundFloorStores);
    //     groundFloor = obj;
    // }

    // var firstFloor;
    // var firstFloorReqURL = 'api/firstFloorStores.json';
    // var firstFloorReq = new XMLHttpRequest();
    // firstFloorReq.open('GET', firstFloorReqURL);
    // firstFloorReq.send();
    // firstFloorReq.onload = () => {
    //     var firstFloorStores = firstFloorReq.response;
    //     var obj = JSON.parse(firstFloorStores);
    //     firstFloor = obj;
    // }

    // var storeData;
    // var storeReqURL = 'api/data.json';
    // var storeReq = new XMLHttpRequest();
    // storeReq.open('GET', storeReqURL);
    // storeReq.send();
    // storeReq.onload = () => {
    //     var storeDatas = storeReq.response;
    //     var obj = JSON.parse(storeDatas);
    //     storeData = obj;
    // }

function drawBasic(id) {

    var store;

    var currentTime = new Date();
    var currentTimeArray = currentTime.toLocaleTimeString('it-IT').split(':');


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
    data.addColumn('number', 'Occupancy Prediction');
    data.addColumn('number', 'Noise Prediction');
    data.addColumn('number', 'Humidity Prediction');


    for( var i = 1; i < 41; i++)
    {

      var timeslot = storeData[store]['history'][0]['times'][i-1]['timeslot'].toString();
      var timeslotArray = timeslot.split('');
      
      var hour = timeslotArray[11].concat(timeslotArray[12]);
      var min = timeslotArray[14].concat(timeslotArray[15]);
      var time = hour.concat(":");
      time = time.concat(min);

      if(hour < currentTimeArray[0])
      {
        data.addRows([
              [
                  
                  time, 
                  storeData[store]['history'][0]['times'][i-1]['occupancy']*100, 
                  storeData[store]['history'][0]['times'][i-1]['noise']*100,
                  storeData[store]['history'][0]['times'][i-1]['humidity']*100,
                  null,
                  null,
                  null
              ]
          ]
          );
      } else if (hour == currentTimeArray[0]){
        if(min <= currentTimeArray[1])
        {
          data.addRows([
              [
                  
                  time, 
                  storeData[store]['history'][0]['times'][i-1]['occupancy']*100, 
                  storeData[store]['history'][0]['times'][i-1]['noise']*100,
                  storeData[store]['history'][0]['times'][i-1]['humidity']*100,
                  null,
                  null,
                  null
              ]
          ]
          );
        } else {
          data.addRows([
              [
                  
                  time, 
                  null, 
                  null,
                  null,
                  storeData[store]['history'][0]['times'][i-1]['occupancy']*100, 
                  storeData[store]['history'][0]['times'][i-1]['noise']*100,
                  storeData[store]['history'][0]['times'][i-1]['humidity']*100
              ]
          ]
          );
        }
      }else {
        data.addRows([
              [
                  
                  time, 
                  null, 
                  null,
                  null,
                  storeData[store]['history'][0]['times'][i-1]['occupancy']*100, 
                  storeData[store]['history'][0]['times'][i-1]['noise']*100,
                  storeData[store]['history'][0]['times'][i-1]['humidity']*100
              ]
          ]
          );
      }
    }


      var options = {
        hAxis: { 
          showTextEvery : '4',
          gridlines :{count: '10'}
        },
        vAxis: {
          baseline: 0
        },
        curveType: 'function',
        width: '700',
        legend: { position: 'bottom' }
      };

    var chart_div = document.getElementById('chart_div');
    var chart = new google.visualization.LineChart(chart_div);

    // Wait for the chart to finish drawing before calling the getImageURI() method.
    google.visualization.events.addListener(chart, 'ready', function () { });

    chart.draw(data, options);
    return('<img src="' + chart.getImageURI() + '">');
}


function fakeDrawBasic(id) {

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
    data.addColumn('number', 'Occupancy Prediction');
    data.addColumn('number', 'Noise Prediction');
    data.addColumn('number', 'Humidity Prediction');


    for( var i = 1; i < 41; i++)
    {

      var timeslot = storeData[store]['history'][0]['times'][i-1]['timeslot'].toString();
      var timeslotArray = timeslot.split('');
      
      var hour = timeslotArray[11].concat(timeslotArray[12]);
      var min = timeslotArray[14].concat(timeslotArray[15]);
      var time = hour.concat(":");
      time = time.concat(min);

      if(hour < currentHour)
      {
        data.addRows([
              [
                  
                  time, 
                  storeData[store]['history'][0]['times'][i-1]['occupancy']*100, 
                  storeData[store]['history'][0]['times'][i-1]['noise']*100,
                  storeData[store]['history'][0]['times'][i-1]['humidity']*100,
                  null,
                  null,
                  null
              ]
          ]
          );
      } else if (hour == currentHour){
        if(min <= currentMin)
        {
          data.addRows([
              [
                  
                  time, 
                  storeData[store]['history'][0]['times'][i-1]['occupancy']*100, 
                  storeData[store]['history'][0]['times'][i-1]['noise']*100,
                  storeData[store]['history'][0]['times'][i-1]['humidity']*100,
                  null,
                  null,
                  null
              ]
          ]
          );
        } else {
          data.addRows([
              [
                  
                  time, 
                  null, 
                  null,
                  null,
                  storeData[store]['history'][0]['times'][i-1]['occupancy']*100, 
                  storeData[store]['history'][0]['times'][i-1]['noise']*100,
                  storeData[store]['history'][0]['times'][i-1]['humidity']*100
              ]
          ]
          );
        }
      }else {
        data.addRows([
              [
                  
                  time, 
                  null, 
                  null,
                  null,
                  storeData[store]['history'][0]['times'][i-1]['occupancy']*100, 
                  storeData[store]['history'][0]['times'][i-1]['noise']*100,
                  storeData[store]['history'][0]['times'][i-1]['humidity']*100
              ]
          ]
          );
      }
    }


      var options = {
        hAxis: { 
          showTextEvery : '4',
          gridlines :{count: '10'}
        },
        vAxis: {
          baseline: 0
        },
        curveType: 'function',
        width: '700',
        legend: { position: 'bottom' }
      };

    var chart_div = document.getElementById('chart_div');
    var chart = new google.visualization.LineChart(chart_div);

    // Wait for the chart to finish drawing before calling the getImageURI() method.
    google.visualization.events.addListener(chart, 'ready', function () { });

    chart.draw(data, options);
    return('<img src="' + chart.getImageURI() + '">');
}
