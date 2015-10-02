    /*jslint node:true, vars:true, bitwise:true, unparam:true */
    /*jshint unused:true */
    // Leave the above lines for propper jshinting
    //Author: Seamus Clarke


    // Create a device client to send data to WIA

    var Wia = require('wia');

    var day = 86400000;
    var hour = 3600000; 
    var min = 60000;

    // Sample data, replace it desired values


    var data = [{
        sensorName : "pressure",
        observations: [{
            on: Date.now() - (day * 1),
            value: 990
        },{
            on: Date.now() - (hour * 1),
            value: 995
        },{
            on: Date.now() - (day * 2),
            value: 1000
        },{
            on: Date.now() - (hour * 4),
            value: 1040
        },{
            on: Date.now() - (hour * 5),
            value: 1000
        },{
            on: Date.now() - (hour * 6),
            value: 999
        },{
            on: Date.now(),
            value: 996
        },{
            on: Date.now() - (min * 5),
            value: 990
        },{
            on: Date.now() - (min * 10),
            value: 1020
        },{
            on: Date.now() - (min * 15),
            value: 1025
        },{
            on: Date.now() - (min * 20),
            value: 1030
        },{
            on: Date.now() - (min * 25),
            value: 1040
        }]
    }];


// Create the device client to access WIA. This sets up an MQTT stream to the WIA server. 

 //   var client = new Wia.DeviceClient(
 //                   'd_MckBZ0tOcBYMD2UfOhsmNpXWG4EAT8OwXdZAHHGdvTuFPxnw'
 //                );

   var client = new Wia.DeviceClient(
                    'd_PAZONQZdBOCUGkCdm4VOKjiQQbw8wVUV'
                 );


       console.log("device attached" );

    // Now send some events just to check everything is working
    // We have a mix of events with a single sensor reading and some with multiple sensor readings. 
    //

    client.publishEvent("Sensor", {
      ambientTemperature: 23.0
    });

/*
    client.publishEvent("Sensor", {
      pressure: 1006
    }, 1443187839000);
    
    */

console.log("Published event with timestamp - pressure 1006 ");

    client.publishEvent("Sensor", {
      heartRate: 72
    });

// Send multiple sensor readings in the same event. 

    client.publishEvent("Sensor", {
      heartRate: 72, 
        humidity: 99.4, 
        ambientTemperature: 19.8, 
        light: 1200
    });

    // Now lets send multiple events using the data and observations list above
    // We'll use the eventData object as a template for the event. 

    var eventData = {pressure: 980, timestamp: 1443798202}; 

  console.log( "Event Data object contains pressure of " + eventData.pressure); 
  console.log(""); 
  console.log("Starting to process list of data items");
       data.forEach(function(item){
        console.log('Processing item %s', item.sensorName);
               item.observations.forEach(function(observation){
                    eventData.pressure = observation.value; 
                    eventData.timestamp = observation.on;
                console.log('Event data pressure and timestamp are now ' + eventData.pressure + " " + eventData.timestamp);
                   client.publishEvent("Sensor", eventData, function(error) {
        // asynchronously called
                       console.log("We're in the callback");
                if (error) {       
                    console.log(error.stack); 
                }
                   });                   
                        console.log('Sent Observation Parameter: %s, Value: %s', item.sensorName, observation.value);
               });
        });


     console.log("Data sent successfully" );




