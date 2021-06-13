const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const symbolRouter = require('./routes/Symbol');
const StockRouter = require('./routes/Stock');
const { logger } = require('../server/logger');
const mongoose = require('mongoose');

app.use(express.static(publicPath));

app.use('/api/symbol', symbolRouter);
app.use('/api/stock', StockRouter);

app.get('/api', (req, res) => {
  res.send({api: 'test'});
})

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  logger.info('logger is coming')
  console.log('Server is up!');
});

const options = {
	useUnifiedTopology : true,
	useNewUrlParser : true
}

mongoose.connect('mongodb://localhost:27017/stock_analytics',options);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', () => console.log('DB connection successful'));
