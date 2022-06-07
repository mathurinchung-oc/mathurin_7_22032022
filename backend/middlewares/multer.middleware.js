const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const mimetypes = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

exports.upload = (directory) => {
  return multer({
    storage: multer.diskStorage({
      destination: `images/${ directory }`,
      filename: (request, file, callback) => {
        const name = uuidv4();
        const extension = mimetypes[file.mimetype];
        callback(null, `${name}.${extension}`);
      }
    }),
  }).single('file');
};
