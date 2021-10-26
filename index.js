const chalk = require('chalk');
const validateIncomingOptions = require('./helpers/validateIncomingOptions');

const logger = (options) => {
  const response = validateIncomingOptions(options);

  if (response.type === 'error') {
    return console.log(chalk.red(response.message));
  }

  return function logResponseBody(req, res, next) {
    const oldWrite = res.write;
    const oldEnd = res.end;

    const chunks = [];

    res.write = function (chunk) {
      chunks.push(chunk);

      return oldWrite.apply(res, arguments);
    };

    res.end = function (chunk) {
      if (chunk) chunks.push(chunk);

      const body = Buffer.concat(chunks).toString('utf8');
      const { statusCode } = res;

      oldEnd.apply(res, arguments);

      console.log(body, statusCode);
    };

    next();
  };
};

module.exports = logger;
