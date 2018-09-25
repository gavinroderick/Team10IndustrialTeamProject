    const moment = require('moment');
    moment().format();
    var IDs = [];  
    //let IDs: any[] = [];
     
    var Total = 2;
    //debug("meme");
    //console.log("meme")
    // var i;
    // var j;
    // var current = Math.random();
    // var newNo = SmoothRandom(0.1,current);
    // for (i = 0; i < Total; i++) 
    // { 
    //     //console.log("0900");
    //     for (j = 0; j < 10; j++)
    //     {
    //         //console.log(newNo);
    //         current = newNo;
    //         newNo = SmoothRandom(0.2,current);
    //     }
    // }
    getID();
   // generateData();
    function SmoothRandom(factor,start) 
    {
        var max = Math.min(1, start + factor);
        var min = Math.max(0, start - factor);
        return start = Math.random() * (max - min) + min;
    }

    function getID()
    {
        var temp;
        const request = require('request');
       // var IDs = [];
       request('https://api.myjson.com/bins/15bmcg',{json: true}, function (error, response, body) 
        {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            //console.log(body);

            temp = body;
            
            for(var i = 0; i < temp.stores.length; i++){
                IDs.push(temp.stores[i].id);
                //console.log(temp.stores[i].id);
            }
            console.log(IDs.length); 
            createStructures();
            //return IDs;  
        });
      // return IDs
      
    }
    function generateDates()
    {
        //console.log("test");
        var dates = [];
        var today = new moment().utc().set({'hour': 9,'minute': 0,'second': 0,'millisecond': 0});
        for (var i = 0; i<21; i++)
        {
            //dates[i]=[]; 
            //var today = moment();
            dates.push(today.add(-1, 'day').toDate());
            // for (var j = 1; j<4; j++)
            // {
            //     console.log(today);    
            //     today = moment.utc(dates[i][j-1]);   
            //     console.log(today);
            //     dates[i][j] = today.add(15, 'minute').toDate();
            //    // console.log(dates[i][j]);
            //    console.log(dates[i][j]);
            // }
            // today = moment().utc().set({'day': -i ,'hour': 9, 'minute': 0,'seconds': 0});
    
            
            //console.log(dates[i]);
            
        }
        
        return dates;
    }
    function generateTimes(date)
    {
        var times = [];
        //console.log(date);
        var current = moment(date);
        times.push(date);
      
        for (var i = 1; i<40; i++)
        {
           // times.push("hi");
           // console.log("hi");
            times.push(current.add(15, 'minute').toDate());
        }
       // console.log(times);
       return times;

    }
    function generateData()
    {
        IDs = getID(createStructures);
        //while(IDs ){
        //    console.log('hi');
        //} 
        
    }
    function createStructures()
    {
       // console.log(IDs.length);
        var shops = [IDs.length];
        console.log("hi")
        console.log(IDs.length);
        for (var i = 0;i<IDs.length ;i++)
        {
            var shop = {
                'id': IDs[i],
                'history': null
            }
           // console.log("testing");
            var dates = generateDates();
            var days = [21];
            for (var k = 0 ; k < 21; k++)
            {
                var history = {
                    'date': dates[k],               
                    'times': null
                }
                //console.log(history);
                var times = generateTimes(dates[k]);
                //console.log(times[0])
                var currentOccupancy = Math.random();
                var currentNoise = Math.random();
                var currentHumidity = Math.random();
                var slots = [];
                for (var l = 0; l<40; l++)
                {
                    var timeslot = {
                        'timeslot': times[l],
                        'occupancy': null,
                        'noise': null,
                        'humidity': null
                    }
                    timeslot['occupancy'] = SmoothRandom(0.3,currentOccupancy);
                    timeslot['noise'] = SmoothRandom(0.3,currentNoise);
                    timeslot['humidity'] = SmoothRandom(0.3,currentHumidity);
                    currentOccupancy =  timeslot['occupancy'];
                    currentNoise = timeslot['noise'];
                    currentHumidity =  timeslot['humidity'];
                    slots.push(timeslot);
                  
                }
                history['times'] = slots;
                days[k] = history;
            }
           // console.log(dates[i]);
            
            //var days = {

            //}
            shop['history'] = days;
            shops[i] = shop;  
            
        }
        console.log(shops);
        writeToFile(shops);

        //var newDateObj = new Date(oldDateObj.getTime() + diff*60000)
       //console.log(dates);
    }
    function writeToFile(object){
        var fs = require("fs");
        fs.writeFile("./DATA.json", JSON.stringify(object, null, 4), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("File has been created");
        });
    }


