const mongoose = require('mongoose');

const StockSchema = mongoose.Schema({
    en_name:String,
    symbol:String,
    sector_id:Number
})

module.exports = mongoose.model('Stock', StockSchema);
