const fs = require('fs');

const logIntoJson = (body, statusCode) => {
  const objectToStore = {
    responseBody: body,
    statusCode,
    logCreatedAt: new Date(),
  };

  // log objectToStore into json file
  fs.appendFile('./logs/log.json', JSON.stringify(objectToStore), (err) => {
    if (err) throw err;
  });
};

module.exports = logIntoJson;
