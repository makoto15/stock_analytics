const mongoose = require('mongoose');

const StockSchema = mongoose.Schema({
    en_name:String,
    symbol:String,
    sector_id:Number,
    logo_url:String
})

module.exports = mongoose.model('Stock', StockSchema);
