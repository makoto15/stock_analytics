const { getLogger, configure } = require('log4js');
const config = require('config');
configure(config.get('log'));

class Log {
  constructor() {
    this.logger = getLogger();
  }
   info(log) {
    this.logger.info(log);
  }
   error(log) {
    this.logger.error(log);
  }
}

module.exports = new Log();