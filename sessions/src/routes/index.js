const router = require('express').Router();
const apiRoutes = require('./tasks');

router.get('/', (req, res) => {
  res.send('hello world');
});

router.use('/api/tasks', apiRoutes);

module.exports = router;
