var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var oliveYoungSchema = new Schema({
    product_ref_code: String,
    brand: String,
    title: String,
    origin_price: Number,
    minimum_price: Number,
    sale_price: Number,
    duration_sale_full: String,
    duration_sale_start: String,
    duration_sale_end: String,
    coupon_price: Number,
    duration_coupon_full: String,
    duration_coupon_start: String,
    duration_coupon_end: String,
    percent: Number,
    tags: [String],
    categorys: [String],
    product_img: String,
    gift_info: String,
    volume: String,
    target_spec: String,
    period_of_use: String,
    how_to_use: String,
    manufacturer: String,
    manufacturing_country: String,
    all_components: String,
    is_safety: String,
    precautions: String,
});

module.exports = oliveYoungSchema;
