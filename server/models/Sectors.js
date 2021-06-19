const mongoose = require('mongoose');

const SectorSchema = mongoose.Schema({
    sector_id:Number,
    name_en:String,
    name_jp:String
})

module.exports = mongoose.model('Sector', SectorSchema);