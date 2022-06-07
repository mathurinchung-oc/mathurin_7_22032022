const { auth } = require('./auth.middleware');
const { upload } = require('./multer.middleware');

module.exports = { auth, upload };
