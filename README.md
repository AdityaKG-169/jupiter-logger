# jupiter-logger

Jupiter-logger is an npm package that lets you save your in-app logs in a csv file

## Installation

Use the package manager [npm](https://www.npmjs.com/package/jupiter-logger) to install jupiter-logger.

```bash
npm install jupiter-logger
```

## Usage

```javascript
const logger = require('jupiter-logger');

const options = {
    logLocation: 'csv',
    statusCodes: ['*']
};
app.use(logger(options));
```

## License
[MIT](https://choosealicense.com/licenses/mit/)