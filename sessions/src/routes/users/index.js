const router = require('express').Router();
const controller = require('../../controllers/users.controller');

router.get('/', controller.getRecord);
router.post('/', controller.postRecord);
router.put('/', controller.putRecord);
router.delete('/:id', controller.deleteRecord);

module.exports = router;
