const logIntoJson = require('./helpers/logIntoJson');
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
    const oldEnd = res.send;

    res.send = function (chunk) {
      const body = JSON.stringify(chunk);
      const statusCode = parseInt(res.statusCode);
      oldEnd.apply(res, arguments);

      if (
        !body ||
        !statusCode ||
        (!selectedStatusCodes.includes(statusCode) &&
          !selectedStatusCodes.includes('*'))
      ) {
        next();
      }

      if (logLocation === 'json') {
        logIntoJson(body, statusCode);
      }
    };

    next();
  };
};

module.exports = logger;
