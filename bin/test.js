const jsonfile = require('jsonfile')
const fileName = '../cache/collected_items.json';
const path = require('path');
const file = path.join(__dirname, fileName)
const scheduler = require('../lib/scheduler')
const dailyCollector = require('../lib/dailyCollector')
const db = require('../db/db');

/**
 * start crawler
 */
// dailyCollector.init()
//     .then(result=> {
//         let totalCount = result['totalCount'];
//         console.log('totalCount=>', totalCount);
//
//         dailyCollector.run(totalCount)
//     }).catch(err => {
//         console.log('err=>', err)
// })

/**
 * insert mongodb
 **/
// let OliveYoungService = require('../db/service');
// jsonfile.readFile(file)
//     .then((items) => {
//         db.connectDB()
//             .then(() => {
//                 OliveYoungService.insertBulk(items)
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
// var dbManager = require('../lib/dbManager');
// let file_products = jsonfile.readFileSync(file, 'utf8')
// db.connectDB()
//     .then(()=> {
//         dbManager.getProductCodeList()
//             .then(produtCodeList => {
//
//                 file_products.forEach(product => {
//                     console.log('product.product_ref_code=>', product.product_ref_code)
//                     if (produtCodeList.toString().includes(product.product_ref_code)) {
//                         console.log('in includes!')
//                         //update product
//                         dbManager.updateProductByCode(product)
//                             .then(result => {
//                                 console.log('updateProductByCode result=>', result)
//                             })
//                     } else {
//                         //insert product
//                         dbManager.insertProduct(product)
//                             .then(result=> {
//                                 console.log('insertProduct result=>', result)
//                             })
//                     }
//                 }).then(()=> {
//                     console.log('end forEach!')
//                     db.close();
//                 })
//             })
//     })
