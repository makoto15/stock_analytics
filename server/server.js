const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const symbolRouter = require('./routes/Symbol');
const { logger } = require('../server/logger');

app.use(express.static(publicPath));

app.use('/api/symbol', symbolRouter);

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