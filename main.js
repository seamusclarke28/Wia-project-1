    /*jslint node:true, vars:true, bitwise:true, unparam:true */
    /*jshint unused:true */
    // Leave the above lines for propper jshinting
    //Type Node.js Here :)

    // Create a device client to send data to WIA

    var Wia = require('wia');

    var day = 86400000;
    var hour = 3600000; 
    var min = 60000;

    // Sample data, replace it desired values


    var data = [{
        sensorName : "pressure",
        observations: [{
            on: new Date().getTime() - (day * 1),
            value: 990
        },{
            on: new Date().getTime() - (hour * 1),
            value: 995
        },{
            on: new Date().getTime() - (day * 2),
            value: 1000
        },{
            on: new Date().getTime() - (hour * 4),
            value: 1040
        },{
            on: new Date().getTime() - (hour * 5),
            value: 1000
        },{
            on: new Date().getTime() - (hour * 6),
            value: 999
        },{
            on: new Date().getTime(),
            value: 996
        },{
            on: new Date().getTime() - (min * 5),
            value: 990
        },{
            on: new Date().getTime() - (min * 10),
            value: 1020
        },{
            on: new Date().getTime() - (min * 15),
            value: 1025
        },{
            on: new Date().getTime() - (min * 20),
            value: 1030
        },{
            on: new Date().getTime() - (min * 25),
            value: 1040
        }]
    }];


    var client = new Wia.DeviceClient(
                    'd_MckBZ0tOcBYMD2UfOhsmNpXWG4EAT8OwXdZAHHGdvTuFPxnw'
                 );

       console.log("device attached" );

    // Now send some events

    client.publishEvent("Sensor", {
      ambientTemperature: 23.0
    });

    client.publishEvent("Sensor", {
      pressure: 1006
    }, 1443187839000);

console.log("Published event with timestamp - pressure 1006 ");

    client.publishEvent("Sensor", {
      heartRate: 72
    });

    client.publishEvent("Sensor", {
      heartRate: 72, 
        humidity: 99.4, 
        ambientTemperature: 19.8, 
        light: 1200
    });

    
    var eventData = {pressure: 980}; 
  console.log( "Event Data object contains pressure of " + eventData.pressure); 
  console.log(""); 
  console.log("Starting to process list of data items");
       data.forEach(function(item){
        console.log('Processing item %s', item.sensorName);
               item.observations.forEach(function(observation){
                    eventData.pressure = observation.value; 
                console.log('Event data pressure value is now ' + eventData.pressure);
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




