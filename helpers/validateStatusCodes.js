const validateStatusCodes = (statusCodes) => {
  if (statusCodes.includes('*')) {
    return {
      type: 'success',
      message: ['*'],
    };
  }

  const finalStatusCodes = statusCodes.map((i) => {
    const numberReg = /^[0-9]+$/;
    if (numberReg.test(i)) return parseInt(i);
    return NaN;
  });

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
