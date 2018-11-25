var config = require('../config/secret')
var mqtt = require('mqtt');
var client  = mqtt.connect(config.mqtt.url);
var scheduler = require('../lib/scheduler');

client.on('connect', function () {
    client.subscribe('makeuplife/OliveYoung');
    scheduler.DailyJob();
});
client.on('message', function (topic, message) {

    let jsonStr = message.toString();
    console.log("listen message =>", jsonStr);
    // schedule.Job(jsonStr)
    // client.end();
});
