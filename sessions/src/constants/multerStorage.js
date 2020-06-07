var multer = require('multer');
// var path = require('path')

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now()+ '.' +extension)
  }
});

module.exports = storage;