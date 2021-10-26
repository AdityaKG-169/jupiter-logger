const logger = () =>
  function logResponseBody(req, res, next) {
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

module.exports = logger;
