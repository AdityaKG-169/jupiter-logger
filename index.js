const chalk = require('chalk');
const validateIncomingOptions = require('./helpers/validateIncomingOptions');
const validateStatusCodes = require('./helpers/validateStatusCodes');

/**
 * @param
 * - logLocation
 * - statusCodes
 * - apiKey
 */

const logger = (options) => {
  const response = validateIncomingOptions(options);
  if (response.type === 'error') {
    console.log(chalk.red(response.message));
    throw new Error(response.message);
  }

  const validatedCodesResponse = validateStatusCodes(options.statusCodes);
  if (validatedCodesResponse.type === 'error') {
    console.log(chalk.red(response.message));
    throw new Error(response.message);
  }

  const { apiKey, logLocation } = options;
  const trueStatusCodes = validatedCodesResponse.message;

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

      console.log(
        body,
        parseInt(statusCode),
        apiKey,
        logLocation,
        trueStatusCodes
      );
    };

    next();
  };
};

module.exports = logger;
