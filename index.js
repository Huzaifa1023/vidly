const express = require('express');
const app = express();

require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()
require('./startup/logging');

const port = process.env.PORT || 3000

const server = app.listen(port, () => { console.log(`App is listening on port ${port}...`) });

module.exports = server