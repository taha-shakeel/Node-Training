const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./module/users/routes');

const port = 4000;

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('test url');
})
app.use(userRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))