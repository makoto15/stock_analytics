require('dotenv').config();
const axios = require('axios');

async function execStockApi(symbol, type){
    return new Promise(function(resolve, reject) {
        axios
            .get(process.env.IEX_API_SANDBOX_BASE_URL + 'stock/' + symbol + '/' + type + '?token=' + process.env.IEX_SANDBOX_SECRET_TOKEN)
            .then(response => resolve(response.data))
            .catch(error => reject(error.response))
    });
}

async function execSimpleChartApi(symbol, range) {
    return new Promise(function (resolve, reject) {
        axios
            .get(process.env.IEX_API_SANDBOX_BASE_URL + 'stock/' + symbol + '/chart/' + range + '?chartCloseOnly=true&token=' + process.env.IEX_SANDBOX_SECRET_TOKEN)
            .then(response => resolve(response.data))
            .catch(error => reject(error.response))
    })
}

exports.getStockQuote = function(symbol){
    return execStockApi(symbol, "quote")
}

exports.getStockLogo = function(symbol){
    return execStockApi(symbol, 'logo')
}

exports.getStockStats = function(symbol) {
    return execStockApi(symbol, 'stats')
}

exports.getStockAdvancedStats = function(symbol) {
    return execStockApi(symbol, 'advanced-stats')
}

exports.getSimpleChartData = function(symbol, range) {
    return execSimpleChartApi(symbol, range)
}