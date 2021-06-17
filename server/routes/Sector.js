const express = require('express');
const router = express.Router();
const Sector = require('../models/Sectors')
const Stock = require('../models/Stock')
const getStockData = require('../apis/getStockData');

router.use(express.json());

/**
 * セクターを全て取得
 */
router.get('/', async (req, res) => {
    const Sectors = await Sector.find({});
    res.json(JSON.stringify(Sectors));
})

/**
 * セクターIDから該当するセクターの上位10株の情報を返す
 */
router.get('/:sectorId/:sectorName', async (req, res) => {
    let stockList = await Stock.find({"sector_id":req.params.sectorId});
    const stockNumInSector = stockList.length;
    if (stockNumInSector > 10) {
        stockList = stockList.slice(0, 10)
    }

    const finalResponse = {}
    for (let index = 0; index < stockList.length; index++) {
        await Promise.all([
            getStockData.getStockQuote(stockList[index]["symbol"]),
            getStockData.getStockLogo(stockList[index]["symbol"]),
        ])
            .then(function (results) {
                //close(終値)とpreviousClose(前日終値)の差分を追加
                let addedQuote = Object.assign(results[0], {close_previousClose_diff :results[0]['close'] - results[0]['previousClose']})
                let quoteAndLogo = Object.assign(addedQuote, results[1])
                const returnKeys = [
                    'symbol',
                    'url',
                    'companyName',
                    'close_previousClose_diff',
                ];
                const responseData = {}
                Object.keys(quoteAndLogo).map(function (key) {
                    if (returnKeys.indexOf(key) >= 0) {
                        responseData[key] = quoteAndLogo[key]
                    }
                })
                finalResponse[quoteAndLogo["companyName"]] = responseData
            });
    }
    res.json(JSON.stringify(finalResponse))
})


module.exports = router;