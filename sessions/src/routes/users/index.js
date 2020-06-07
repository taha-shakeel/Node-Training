var multer  = require('multer')
const router = require('express').Router();
const controller = require('../../controllers/users.controller');
const storage = require('../../constants/multerStorage');
console.log('storage here', storage);
const upload = multer({ storage: storage });

router.get('/', controller.getRecord);
router.post('/', controller.postRecord);
router.put('/', controller.putRecord);
router.delete('/:id', controller.deleteRecord);
router.post('/upload/profile-pic', upload.single('profile-picture'), controller.uploadProfilePicture);

module.exports = router;
