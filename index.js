const logIntoCsv = require('./helpers/logIntoCsv');
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
  if (response.type === 'error') throw new Error(response.message);

  const validatedCodesResponse = validateStatusCodes(options.statusCodes);
  if (validatedCodesResponse.type === 'error')
    throw new Error(validatedCodesResponse.message);

  // eslint-disable-next-line no-unused-vars
  const { apiKey, logLocation } = options;
  const selectedStatusCodes = validatedCodesResponse.message;

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
      const statusCode = res.statusCode.parseInt();

      oldEnd.apply(res, arguments);

      if (
        !body ||
        !statusCode ||
        (!selectedStatusCodes.includes(statusCode) &&
          !selectedStatusCodes.includes('*'))
      ) {
        next();
      }

      if (logLocation === 'csv') {
        logIntoCsv(body, statusCode);
      }
    };

    next();
  };
};

module.exports = logger;
