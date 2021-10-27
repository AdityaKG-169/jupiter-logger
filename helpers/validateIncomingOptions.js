const validateIncomingOptions = (options) => {
  const { apiKey, logLocation, statusCodes } = options;

  if (!('logLocation' in options)) {
    return {
      type: 'error',
      message:
        'Jupiter-logger: Error....missing logLocation (Code: ERR_INVALID_ARGS)',
    };
  }

  if (!logLocation.trim()) {
    return {
      type: 'error',
      message:
        'Jupiter-logger: Error....missing logLocation (Code: ERR_INVALID_ARGS)',
    };
  }

  if (logLocation !== 'json' && logLocation !== 'server') {
    return {
      type: 'error',
      message:
        'Jupiter-logger: Error....invalid logLocation (Code: ERR_INVALID_ARGS)',
    };
  }

  if (logLocation === 'server') {
    if (!('apiKey' in options)) {
      return {
        type: 'error',
        message:
          'Jupiter-logger: Error....missing apiKey (Code: ERR_INVALID_ARGS)',
      };
    }

    if (!apiKey.trim()) {
      return {
        type: 'error',
        message:
          'Jupiter-logger: Error....missing apiKey (Code: ERR_INVALID_ARGS)',
      };
    }

    // check if api key is valid
  }

  if (!('statusCodes' in options)) {
    return {
      type: 'error',
      message:
        'Jupiter-logger: Error....missing statusCodes (Code: ERR_INVALID_ARGS)',
    };
  }

  if (statusCodes.length === 0) {
    return {
      type: 'error',
      message:
        'Jupiter-logger: Error....missing statusCodes (Code: ERR_INVALID_ARGS)',
    };
  }

  return {
    type: 'success',
    message: 'no error',
  };
};

module.exports = validateIncomingOptions;
