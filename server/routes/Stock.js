const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock')
const getStockData = require('../apis/getStockData');

router.use(express.json());

router.get('/', async (req, res) => {
    console.log(
		Stock.estimatedDocumentCount(function (err, count) {
			if (err){
				console.log(err)
			}else{
				console.log("Estimated Count :", count)
			}
		})
	)

    const Stocks = await Stock.find({});
    res.json(Stocks);
})

/**
 * 企業ロゴをmongoDBへ格納する処理
 */
router.get('/batch/logo', async (req, res) => {
	let stockList = await Stock.find({});
	for (let index = 0;index<stockList.length; index++) {
		await Promise.all([
			getStockData.getStockLogo(stockList[index]["symbol"]),
		]).then( async function (results) {
			await Stock.updateOne(
				{symbol: stockList[index]['symbol']},
				{$set:{logo_url:results[0]['url']}}
			);
			console.log(stockList[index]['symbol'])
		})
  };

})

module.exports = router;