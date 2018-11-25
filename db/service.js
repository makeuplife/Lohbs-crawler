var OliveYoung = require('./lib');

function createOliveYoung (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var oliveYoungs = new OliveYoung(data)
        oliveYoungs.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('createOliveYoung done: ' + result)
                resolve(result)
            }
        })
    })
}

function insertBulk (data) {
    return new Promise((resolve, reject) => {
        // console.log(data)
        OliveYoung.insertMany(data)
            .then((result) => {
                console.log('result=>', result)
                resolve(result)
            })
            .catch(err => {
                console.log('err=>', err)
                reject(err)
            })
    })
}

function getOliveYoungAll () {
    return new Promise((resolve, reject) => {
        OliveYoung.find(
            {},
            function(err, oliveYoung) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                // console.log('getOliveYoungAll done: ' + oliveYoung)
                resolve(oliveYoung)
            }
        )
    })
}

function getProductCodeList () {
    return new Promise((resolve, reject) => {
        OliveYoung.find(
            {},
            function(err, oliveYoung) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                let product_ref_code_list = oliveYoung.product_ref_code;
                console.log('getProductCodeList done: ' + product_ref_code_list)
                resolve(product_ref_code_list)
            }
        )
    })
}

function getOliveYoungByName (oliveYoungName) {
    return new Promise((resolve, reject) => {
        OliveYoung.findOne(
            {"oliveYoung_name": oliveYoungName},
            function(err, oliveYoung) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('oliveYoungName done: ' + oliveYoung)
                resolve(oliveYoung)
            }
        )
    })
}

function getByRegexOliveYoungName (oliveYoungName) {
    return new Promise((resolve, reject) => {
        OliveYoung.find(
            {"oliveYoung_name": { $regex: oliveYoungName, $options: 'i' }},
            function(err, oliveYoung) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('oliveYoungName done: ' + oliveYoung)
                resolve(oliveYoung)
            }
        )
    })
}

function getOliveYoungById (id) {
    return new Promise((resolve, reject) => {
        OliveYoung.findOne(
            {"_id": id},
            function(err, oliveYoung) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getOliveYoungById done: ' + oliveYoung)
                resolve(oliveYoung)
            }
        )
    })
}

function getOliveYoungByIdAndPassword (data) {
    return new Promise((resolve, reject) => {
        OliveYoung.findOne(
            {
                "oliveYoungTag"        : data.oliveYoungTag,
                "password"  : data.password
            },
            function(err, oliveYoung) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getOliveYoungById done: ' + oliveYoung)
                resolve(oliveYoung)
            }
        )
    })
}

function getOliveYoungByEmail (email, body) {
    return new Promise((resolve, reject) => {
        OliveYoung.findOne(
            {"email": email},
            function(err, oliveYoung) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getOliveYoungById done: ' + oliveYoung)
                resolve(oliveYoung)
            }
        )
    })
}

function updateOliveYoungById(oliveYoungId, body) {
    return new Promise((resolve, reject) => {
        OliveYoung.findOneAndUpdate(
            {"_id": oliveYoungId
            },
            {$set: body
            },
            {upsert: false, new: true},
            function(err, data) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function updateOliveYoungByCode(product) {
    return new Promise((resolve, reject) => {
        OliveYoung.findOneAndUpdate(
            {"product_ref_code": product.product_ref_code
            },
            {$set: product
            },
            {upsert: false, new: true},
            function(err, data) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function updateOliveYoungHistoryId(oliveYoungId, historyId) {
    return new Promise((resolve, reject) => {

        OliveYoung.findOneAndUpdate(
            {
                "_id": oliveYoungId
            },
            {
                $push: {historys: historyId}
            },
            {upsert: false, new: false},
            function (err, data) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                resolve(data)
            })
    })
}

function deleteOliveYoungById (id) {
    return new Promise((resolve, reject) => {
        OliveYoung.findByIdAndRemove(
            id,
            function(err, oliveYoung) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getOliveYoungById done: ' + oliveYoung)
                resolve(oliveYoung)
            }
        )
    })
}

exports.insertBulk = insertBulk;
exports.createOliveYoung = createOliveYoung;
exports.getOliveYoungAll = getOliveYoungAll;
exports.getProductCodeList = getProductCodeList;
exports.getOliveYoungByName = getOliveYoungByName;
exports.getByRegexOliveYoungName = getByRegexOliveYoungName;
exports.getOliveYoungById = getOliveYoungById;
exports.getOliveYoungByIdAndPassword = getOliveYoungByIdAndPassword;
exports.getOliveYoungByEmail = getOliveYoungByEmail;
exports.updateOliveYoungById = updateOliveYoungById;
exports.updateOliveYoungByCode = updateOliveYoungByCode;
exports.updateOliveYoungHistoryId = updateOliveYoungHistoryId;
exports.deleteOliveYoungById = deleteOliveYoungById;
