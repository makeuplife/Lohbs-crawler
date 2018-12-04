const dbService = require('../db/service');
var DBManager = function () {}

DBManager.prototype.getProductCodeList = function () {
    return new Promise((resolve, reject) => {
        dbService.getLohbsAll()
            .then(result => {
                resolve(result)
            }).catch(err => {
                console.log('err=>', err);
                reject(err)
        })
    });
}

DBManager.prototype.insertProduct = function (product) {
    return new Promise((resolve, reject) => {
        dbService.createLohbs(product)
            .then(result => {
                resolve(result)
            }).catch(err => {
            console.log('err=>', err);
            reject(err)
        })
    });
}

DBManager.prototype.updateProductByCode = function (product) {
    return new Promise((resolve, reject) => {
        dbService.updateLohbsByCode(product)
            .then(result => {
                resolve(result)
            }).catch(err => {
            console.log('err=>', err);
            reject(err)
        })
    });
}

module.exports = new DBManager();
