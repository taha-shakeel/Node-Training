const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./module/users/routes');
const verifyRequetMiddleware = require('./middleware/auth');

const port = 4000;

const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('test url');
})
app.use('/user', verifyRequetMiddleware, userRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))