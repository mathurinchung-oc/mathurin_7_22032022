const express = require('express');
const router = express.Router();

const { auth, upload } = require('../middlewares');

const { signup, signin } = require('../controllers/auth.controller');
const { getAllUsers, getOneUser, updateUser, deleteUser } = require('../controllers/user.controller');

router.post('/register', signup);
router.post('/login', signin);

router.get('/', auth, getAllUsers);
router.get('/:id', auth, getOneUser);
router.put('/:id', auth, upload("users"), updateUser);
// router.put('/:id/email', modifyEmail);
// router.put('/:id/password', modifyPassword);
router.delete('/:id', auth, deleteUser);
// router.get('/:id', auth, disableUser);

module.exports = router;
