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
    try {
      let sectorInfo = await Sector.find({"sector_id":req.params.sectorId});
      let stockList = await Stock.find({"sector_id":req.params.sectorId}); 
      const stockNumInSector = stockList.length;
      if (stockNumInSector > 10) {
        stockList = stockList.slice(0, 10)
      }

      let symbolsList = []
      for (let index = 0; index < stockList.length; index++) {
        try{
          await Promise.all([
            getStockData.getStockQuote(stockList[index]["symbol"]),
        ])
          .then(function (results) {
            //close(終値)とpreviousClose(前日終値)の差分を追加
              let addedQuote = Object.assign(results[0], {close_previousClose_diff :results[0]['close'] - results[0]['previousClose']})
              let quoteAndLogo = Object.assign(addedQuote, {url :stockList[index]['logo_url']})
              const returnKeys = [
                'symbol',
                'url',
                'companyName',
                'close_previousClose_diff',
              ];
              const responseData = {}
              for (let index = 0;index<returnKeys.length; index++) {
                responseData[returnKeys[index]] = quoteAndLogo[returnKeys[index]]
              };
              symbolsList.push(responseData)
            })
        } catch(err) {
          res.status(400).send("error has occured in for block");
        }

      }
      const finalResponse = {
        sector: sectorInfo[0]['name_jp'],
        symbols: symbolsList
      }
      res.json(JSON.stringify(finalResponse))
    } catch(err) {
      res.status(400).send("error has occured");
    }
})

/**
 * セクター別人気ランキングAPI numパラメータによって返却する個数を変更可
 */
router.get('/symbol/ranking/:num', async (req, res) => {
  const sectors = await Sector.find({});
  let finalResponse = []
  for (let index = 0;index<sectors.length; index++) {
    let stockList = await Stock.find({"sector_id":sectors[index]['sector_id']},{_id:0, sector_id:0});
    const stockNumInSector = stockList.length;
    if (!stockNumInSector) {
      continue;
    }
    if (stockNumInSector > req.params.num) {
      stockList = stockList.slice(0, req.params.num)
    }
    
    const responseData = {
      sector_name: sectors[index]['name_jp'],
      sector_id: sectors[index]['sector_id'],
      name_en: sectors[index]['name_en'],
      symbols: stockList
    }
    finalResponse.push(responseData)
  };
  res.json(JSON.stringify(finalResponse))
})


/**
 * おすすめセクター一覧情報を返す
 */
router.get('/recommends', async (req, res) => {
  const sectors = await Sector.find({});
  let finalResponse = []
  for (let index = 0;index<sectors.length; index++) {
    const responseData = {}
    let stock = await Stock.findOne({"sector_id":sectors[index]['sector_id']});
    if (stock) {
      responseData['sector_name'] = sectors[index]['name_jp'];
      //ゼロパディングする
      responseData['sector_id'] = String(sectors[index]['sector_id']).padStart(4, '0');
      responseData['logo_url'] = stock['logo_url'];
      //正規表現で空白を詰める
      responseData['name_en'] = sectors[index]['name_en'].replace(/\s+/g, "");
      finalResponse.push(responseData)
    }
  };
  res.json(JSON.stringify(finalResponse))
})



module.exports = router;