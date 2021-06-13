const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock')

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
    console.log(Stocks)
    res.json(Stocks);
})

module.exports = router;