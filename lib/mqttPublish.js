let config = require('../config/secret')
let mqtt = require('mqtt');
let mqtt_url = config.mqtt.url;

function send(jsonData) {

    console.log('in send! ');
    let client = mqtt.connect(mqtt_url);
    let data = JSON.stringify(jsonData);
    console.log('jsonData=>', data)
    client.on('connect', function () {
        // client.subscribe('bitweb/etherScanSchduler');
        client.publish('bitweb', data);
        client.end();
    });
}

exports.send = send;
