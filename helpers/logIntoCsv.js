const fs = require('fs');

const logIntoCsv = (body, statusCode) => {
  const objectToStore = { ...body, statusCode, logCreatedAt: new Date() };
  const objectToString = JSON.stringify(objectToStore);
  fs.appendFileSync('./logs.csv', `${objectToString}\n`);
};

module.exports = logIntoCsv;
