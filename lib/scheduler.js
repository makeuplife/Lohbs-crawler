var scheduler = require('node-schedule');
var dailyCollector = require('./dailyCollector');
var mqttPublish = require('./mqttPublish');
var dbManager = require('./dbManager');
var db = require('../db/db');

const jsonfile = require('jsonfile')
const fileName = '../cache/collected_items.json';
const path = require('path');
const file = path.join(__dirname, fileName)

function DailyJob() {
    console.log('start DailyJob!')
    var rule = {hour: 1, minute: 35}
    // var rule = '*/1 * * * *'; //1 min
    // var rule = '*/5 * * * * *'; //5 sec

    var job = scheduler.scheduleJob(rule, function (time) {
        console.log('answer time =>', time);

        //clear cache file
        let obj = []
        jsonfile.writeFileSync(file, obj, 'utf8')

        dailyCollector.init()
            .then(result => {

                let totalCount = result['totalCount']
                console.log('totalCount=>', totalCount);
                SaleItemCrawlerJob(totalCount)

            }).catch(err => {
            console.log('crawler job err=>', err);
            job.cancel();
        })

    });
}

function SaleItemCrawlerJob(totalCount) {

    let rule = '*/2 * * * *'; //2 min
    // var rule = '*/30 * * * * *'; //30 sec
    let startIdx = 1;
    let rowsPerPage = 48;
    let pageLength = Math.ceil(totalCount / rowsPerPage);

    console.log('pageLength=>', pageLength);

    let job = scheduler.scheduleJob(rule, function (time) {
        console.log('answer startIdx =>', startIdx);
        console.log('answer time =>', time);

        if (startIdx > pageLength) {
            console.log('finish job!');
            job.cancel();

            let file_products = jsonfile.readFileSync(file, 'utf8')
            db.connectDB()
                .then(()=> {
                    dbManager.getProductCodeList()
                        .then(produtCodeList => {

                            file_products.forEach(product => {
                                console.log('product.product_ref_code=>', product.product_ref_code)
                                if (produtCodeList.toString().includes(product.product_ref_code)) {

                                    console.log('in includes!')

                                    //update product
                                    dbManager.updateProductByCode(product)
                                        .then(result => {
                                            // console.log('updateProductByCode result=>', result)
                                        })
                                } else {
                                    //insert product
                                    dbManager.insertProduct(product)
                                        .then(result=> {
                                            // console.log('insertProduct result=>', result)
                                        })
                                }
                            }).then(()=> {
                                console.log('end forEach!')
                                db.close();
                            })
                        })
                })

        } else {
            dailyCollector.run(totalCount, startIdx, rowsPerPage)
            startIdx ++;
        }
    });
}

exports.DailyJob = DailyJob;
exports.SaleItemCrawlerJob = SaleItemCrawlerJob;

