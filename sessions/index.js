const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const baseRoutes = require('./src/routes');
const errorHandler = require('./src/middlewares/error.middleware');
require('dotenv').config();

app.use(bodyParser.json());
app.use('', baseRoutes);

console.log('preocess env vars', process.env.DB_NAME);

app.use(() => errorHandler);

app.listen(4000, () => console.log('listening on port 4000'));
