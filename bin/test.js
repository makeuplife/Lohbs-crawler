const jsonfile = require('jsonfile')
const fileName = '../cache/collected_items.json';
const path = require('path');
const file = path.join(__dirname, fileName)
const scheduler = require('../lib/scheduler')
const dailyCollector = require('../lib/dailyCollector')
const db = require('../db/db');
var util = require('../utils/util');

// var re = /["productSalePrice"+]/;
// var re = /[^"productSalePrice" :]*,/;
// var re = /[||][0-9]+[||]/g;
// var str = '\n\n\n\n\n\n<!DOCTYPE HTML>\n<html lang="kr">\n<head> "productSalePrice" : 13000.00, \n\n\n\n\n\n<!DOCTYPE HTML>\n<html lang="kr">\n<head>'
//
// var myArray = str2.split('"productSalePrice" : ')[1].split(',')[0];
// var myArray2 = str2.split('"salePrice" : ')[1].split(',')[0];
// console.log(myArray);
// console.log(myArray2);
/**
 * start crawler
 */
let totalCount = 30;

// dailyCollector.init()
//     .then(result=> {
//         let totalCount = result['totalCount'];
//         dailyCollector.run(totalCount)
//     }).catch(err => {
//         console.log('err=>', err)
// })

/**
 * insert mongodb
 **/
// let LohbsService = require('../db/service');
// jsonfile.readFile(file)
//     .then((items) => {
//         db.connectDB()
//             .then(() => {
//                 LohbsService.insertBulk(items)
//                     .then(() =>{
//                         db.close()
//                     })
//             }).catch((err) => {
//             console.error('err=>', err)
//         });
//     });

/**
 * scheduler test
 **/
// scheduler.SaleItemCrawlerJob(100)

// scheduler.DailyJob();

// dailyCollector.init()
//     .then(result=> {
//
//         let totalCount = result['totalCount'];
//         console.log('totalCount=>', totalCount);
//
//         scheduler.SaleItemCrawlerJob(totalCount)
//
//     }).catch(err => {
//         console.log('err=>', err)
// })

/**
 * compare cache file product to db product
 **/
var dbManager = require('../lib/dbManager');
let file_products = jsonfile.readFileSync(file, 'utf8')
db.connectDB()
    .then(()=> {
        dbManager.getProductCodeList()
            .then(produtCodeList => {

                file_products.forEach(product => {
                    console.log('product.product_ref_code=>', product.product_ref_code)
                    if (produtCodeList.toString().includes(product.product_ref_code)) {
                        console.log('in includes!')

                        product['update_date'] = util.formatDate(new Date().toLocaleString('ko-KR'))
                        //update product
                        dbManager.updateProductByCode(product)
                            .then(result => {
                                console.log('updateProductByCode result=>', result)
                            })
                    } else {

                        product['reg_date'] = util.formatDate(new Date().toLocaleString('ko-KR'))
                        //insert product
                        dbManager.insertProduct(product)
                            .then(result=> {
                                console.log('insertProduct result=>', result)
                            })
                    }
                }).then(()=> {
                    console.log('end forEach!')
                    db.close();
                })
            })
    })
