var Lohbs = require('./lib');

function createLohbs (data) {
    return new Promise((resolve, reject) => {
        console.log(data)
        var lohbs = new Lohbs(data)
        lohbs.save(function (err, result) {
            if (err) {
                reject(err);
            } else {
                console.log('createLohbs done: ' + result)
                resolve(result)
            }
        })
    })
}

function insertBulk (data) {
    return new Promise((resolve, reject) => {
        // console.log(data)
        Lohbs.insertMany(data)
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

function getLohbsAll () {
    return new Promise((resolve, reject) => {
        Lohbs.find(
            {},
            function(err, lohbs) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                // console.log('getLohbsAll done: ' + lohbs)
                resolve(lohbs)
            }
        )
    })
}

function getProductCodeList () {
    return new Promise((resolve, reject) => {
        Lohbs.find(
            {},
            function(err, lohbs) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                let product_ref_code_list = lohbs.product_ref_code;
                console.log('getProductCodeList done: ' + product_ref_code_list)
                resolve(product_ref_code_list)
            }
        )
    })
}

function getLohbsByName (lohbsName) {
    return new Promise((resolve, reject) => {
        Lohbs.findOne(
            {"lohbs_name": lohbsName},
            function(err, lohbs) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('lohbsName done: ' + lohbs)
                resolve(lohbs)
            }
        )
    })
}

function getByRegexLohbsName (lohbsName) {
    return new Promise((resolve, reject) => {
        Lohbs.find(
            {"lohbs_name": { $regex: lohbsName, $options: 'i' }},
            function(err, lohbs) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('lohbsName done: ' + lohbs)
                resolve(lohbs)
            }
        )
    })
}

function getLohbsById (id) {
    return new Promise((resolve, reject) => {
        Lohbs.findOne(
            {"_id": id},
            function(err, lohbs) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getLohbsById done: ' + lohbs)
                resolve(lohbs)
            }
        )
    })
}

function getLohbsByIdAndPassword (data) {
    return new Promise((resolve, reject) => {
        Lohbs.findOne(
            {
                "lohbsTag"        : data.lohbsTag,
                "password"  : data.password
            },
            function(err, lohbs) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getLohbsById done: ' + lohbs)
                resolve(lohbs)
            }
        )
    })
}

function getLohbsByEmail (email, body) {
    return new Promise((resolve, reject) => {
        Lohbs.findOne(
            {"email": email},
            function(err, lohbs) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getLohbsById done: ' + lohbs)
                resolve(lohbs)
            }
        )
    })
}

function updateLohbsById(lohbsId, body) {
    return new Promise((resolve, reject) => {
        Lohbs.findOneAndUpdate(
            {"_id": lohbsId
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

function updateLohbsByCode(product) {
    return new Promise((resolve, reject) => {
        Lohbs.findOneAndUpdate(
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

function updateLohbsHistoryId(lohbsId, historyId) {
    return new Promise((resolve, reject) => {

        Lohbs.findOneAndUpdate(
            {
                "_id": lohbsId
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

function deleteLohbsById (id) {
    return new Promise((resolve, reject) => {
        Lohbs.findByIdAndRemove(
            id,
            function(err, lohbs) {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                console.log('getLohbsById done: ' + lohbs)
                resolve(lohbs)
            }
        )
    })
}

exports.insertBulk = insertBulk;
exports.createLohbs = createLohbs;
exports.getLohbsAll = getLohbsAll;
exports.getProductCodeList = getProductCodeList;
exports.getLohbsByName = getLohbsByName;
exports.getByRegexLohbsName = getByRegexLohbsName;
exports.getLohbsById = getLohbsById;
exports.getLohbsByIdAndPassword = getLohbsByIdAndPassword;
exports.getLohbsByEmail = getLohbsByEmail;
exports.updateLohbsById = updateLohbsById;
exports.updateLohbsByCode = updateLohbsByCode;
exports.updateLohbsHistoryId = updateLohbsHistoryId;
exports.deleteLohbsById = deleteLohbsById;
