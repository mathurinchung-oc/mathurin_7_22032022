const express = require('express');
const router = express.Router();

const { auth, upload } = require('../middlewares');

const { signup, signin, modifyEmail } = require('../controllers/auth.controller');
const { getAllUsers, getOneUser, updateUser, deleteUser } = require('../controllers/user.controller');

router.post('/register', signup);
router.post('/login', signin);
router.put('/:id/email', auth, modifyEmail);
// router.put(':id/password', modifyPassword);

router.get('/', auth, getAllUsers);
router.get('/:id', auth, getOneUser);
router.put('/:id', auth, upload("users"), updateUser);

router.delete('/:id', auth, deleteUser);
// router.get('/:id', auth, disableUser);

module.exports = router;
