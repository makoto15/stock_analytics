const express = require('express');
const router = express.Router();
const getStockData = require('../apis/getStockData');
const Stock = require('../models/Stock')
// const { get } = require('config');
// const { response } = require('express');

router.use(express.json());

router.get('/:symbol', async (req, res) => {
    //正規表現で小文字も許容する　ex)AAPL:aapl
    let stock = await Stock.find({"symbol":new RegExp(String.raw`^${req.params.symbol}$`, "i")});
    const symbol = req.params.symbol
    Promise.all([ 
        getStockData.getStockQuote(symbol),
        getStockData.getStockAdvancedStats(symbol)
    ])
        .then(function (results) {
            //close(終値)とpreviousClose(前日終値)の差分を追加
            let addedQuote = Object.assign(results[0], {close_previousClose_diff :results[0]['close'] - results[0]['previousClose']})
            let quoteAndLogo = Object.assign(addedQuote, {url : stock.length > 0 ? stock[0]['logo_url'] : undefined})
            let allGetData = Object.assign(quoteAndLogo, results[1])
            const returnKeys = [
                'symbol',
                'url',
                'companyName',
                'open',
                'close',
                'close_previousClose_diff',
                'high',
                'low',
                'volume',
                'week52high',
                'week52low',
                'day200MovingAvg',
                'day50MovingAvg',
                'avg10Volume',
                'avg30Volume',
                'enterpriseValue',
                'priceToSales',
                'enterpriseValueToRevenue',
                'EBITDA'
            ];
            const responseData = {}
            Object.keys(allGetData).map(function (key) {
                if (returnKeys.indexOf(key) >= 0) {
                    responseData[key] = allGetData[key]
                }
            })
            res.json(JSON.stringify(responseData))
        });
})

router.get('/test/:symbol', (req, res)=>{
    res.json({
        "symbol": "APPL",
        "url": "https://storage.googleapis.com/iex/api/logos/AAPL.png",
        "companyName": "Apple Inc.",
        "close": 28.81,
        "diff": 3.23,
        "high": 29.12,
        "low": 27.68,
        "volume": 33820759,
        "week52high": 34.68,
        "week52low": 17.50,
        "day200MovingAvg": 140.60541,
        "day50MovingAvg": 156.49678,
        "avg10Volume": 2774000,
        "avg30Volume": 12774000,
        "enterpriseValue": 1022460690000,
        "priceToSales": 3.49,
        "enterpriseValueToRevenue": 3.85,
        "EBITDA": 80342000000
    });
})

module.exports = router;