const validateStatusCodes = (statusCodes) => {
  if (statusCodes.includes('*')) {
    return {
      type: 'success',
      message: ['*'],
    };
  }

  const finalStatusCodes = statusCodes.map((i) => parseInt(i));

  if (finalStatusCodes.includes(NaN)) {
    return {
      type: 'error',
      message:
        'Jupiter-logger: Error....invalid Status Codes (Code: ERR_INVALID_ARGS)',
    };
  }

  return {
    type: 'success',
    message: finalStatusCodes,
  };
};

module.exports = validateStatusCodes;
