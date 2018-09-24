    // Including Moment.js stuff
    const moment = require('moment');
    moment().format();

    // Global var to store IDs of shops
    //var groundIDs = [];  

    //this function starts the process
    getID('http://team10-itp.herokuapp.com/api/groundFloorStores.json','groundData');
    getID('http://team10-itp.herokuapp.com/api/firstFloorStores.json','firstData');

    /*
        Generates Random numbers within a certain range of the previous number
        Adapted from part of this: http://bl.ocks.org/telic/9376360
    */
    function SmoothRandom(factor,start) 
    {
        var max = Math.min(1, start + factor);
        var min = Math.max(0, start - factor);
        return start = Math.random() * (max - min) + min;
    }

    /*
        Reads the Store IDs from a file
        then calls the the generateStructures() function as that can't start without the data from getID()
    */
    function getID(idLocation,outFileName)
    {
        var IDs = [];
        var temp;
        const request = require('request');
        request(idLocation,{json: true}, function (error, response, body) 
        {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

            temp = body;
            
            for(var i = 0; i < temp.stores.length; i++){
                IDs.push(temp.stores[i].id);
            }
            console.log(IDs.length); 
            createStructures(outFileName,IDs); 
        }); 
    }

    /*
        Generates 21 dates back in time from current date
        returns them as an array of moment objects
    */
    function generateDates()
    {
        var dates = [];
        var today = new moment().utc().set({'hour': 9,'minute': 0,'second': 0,'millisecond': 0});
       // dates.push(today)
        for (var i = 0; i<21; i++)
        {
            dates.push(today.add(-i, 'day').toDate());
            /*  
            /   Might be useful later
            /   dates[i][j] = today.add(15, 'minute').toDate();
            /  */ 
            today = moment().utc().set({ 'hour': 9, 'minute': 0,'seconds': 0});
            
        }
        console.log(dates);
        return dates;
        
    }

    /* 
        Generates a list of 40 timeslots, 1 every 15 minutes from 0900 - 1900
        returns them as an array or moment objects 
    */
    function generateTimes(date)
    {
        var times = [];
        var current = moment(date);
        times.push(date);
      
        for (var i = 1; i<40; i++)
        {
            times.push(current.add(15, 'minute').toDate());
        }

       return times;

    }
    /*
        Combines all the created data into an apropriate json structure
    */
    function createStructures(fileName,IDs)
    {
        var shops = [IDs.length];
        console.log("hi")
        console.log(IDs.length);
        for (var i = 0;i<IDs.length ;i++)
        {
            var shop = {
                'id': IDs[i],
                'history': null
            }
            var dates = generateDates();
            var days = [21];
            for (var k = 0 ; k < 21; k++)
            {
                var history = {
                    'date': dates[k],               
                    'times': null
                }
                var times = generateTimes(dates[k]);

                // Generate initial values
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
            shop['history'] = days;
            shops[i] = shop;  
            
        }
        writeToFile(shops,fileName);
       

    }

    /*
        Writes an object to a file keeping nice formatting
        Adapted from: https://gyandeeps.com/json-file-write/
    */
    function writeToFile(object,fileName){
        var fs = require("fs");
        fs.writeFile("../api/" + fileName +".json", JSON.stringify(object, null, 4), (err) => {
            if (err) {
                console.error(err);
                return;
            };
        });
    }


