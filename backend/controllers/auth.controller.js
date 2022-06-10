const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const crypto = require('../utils/crypto.util');
const isvalid = require('../utils/isvalid.util');

const { User } = require('../models');

exports.signup = async (request, response) => {
  const { fullname, email, password } = request.body;
  if (!fullname || !email || !password) return response.status(400).json({ error: "missing parameters", });

  // validFullname - lenght && regex

  const validEmail = isvalid.email(email);
  if (!validEmail) return response.status(400).json({ error: "invalid email" });

  const validPassword = isvalid.password(password);
  if (!validPassword) return response.status(400).json({ error: "invalid password" });

  try {
    const encryptedEmail = await crypto.encrypt(email);

    // Query: SELECT email FROM users WHERE email = ?;
    const userFound = await User.findOne({ attributes: ['email'], where: { email: encryptedEmail } });
    if (userFound) return response.status(409).json({ error: "user already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Query: INSERT INTO user (firstname, email, password, admin, avatar) VALUES (?, ?, ?, ?, ?, ?);
    await User.create({ fullname, email: encryptedEmail, password: hashPassword, admin: true });

    response.status(201).json({ message: "user successfully registered" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

exports.signin = async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) return response.status(400).json({ error: "missing parameters" });

  try {
    const encryptedEmail = await crypto.encrypt(email);

    // Query: SELECT * FROM user WHERE email = ?;
    const userFound = await User.findOne({ where: { email: encryptedEmail } });
    if (!userFound) return response.status(404).json({ error: "user not found" });

    const validPassword = await bcrypt.compare(password, userFound.password);
    if (!validPassword) return response.status(401).json({ error: "invalid password" });

    const payload = { userId: userFound.id, role: (userFound.admin ? "admin" : "user") };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

    response.status(200).json({ message: "successfully logged in", success: true, payload, token });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

exports.modifyEmail = async (request, response) => {
  try {
    if (request.user.userId !== parseInt(request.params.id)) return response.status(401).json({ error: "unauthorized request" });

    const { currentEmail, newEmail } = request.body;
    if (!currentEmail || !newEmail) return response.status(400).json({ error: "missing parameters" });

    const currentEmailEncrypted = await crypto.encrypt(currentEmail);
    const userFound = await User.findOne({ attributes: [ 'email' ], where: { id: request.params.id } });
    if (!userFound) return response.status(404).json({ error: "user not found" });
    if (userFound.email !== currentEmailEncrypted) return response.status(401).json({ error: "unauthorized request" });
   
    const newEmailEncrydted  = await crypto.encrypt(newEmail);
    const emailFound = await User.findOne({ where: { email: newEmailEncrydted } });
    if (emailFound) return response.status(409).json({ error: "email already exists" });

    await userFound.update({ email: newEmailEncrydted, id: request.params.id });

    const newEmailDecrypted = await crypto.decrypt(newEmailEncrydted);

    response.status(200).json({ message: "email updated" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

exports.modifyPassword = async (request, response) => {
  try {
    if (request.user.userId !== parseInt(request.params.id)) return response.status(401).json({ error: "unauthorized request" });

    const { currentPassword, newPassword } = request.body;
    if (!currentPassword || !newPassword) return response.status(400).json({ error: "missing parameters" });

    const userFound = await User.findOne({ attributes: [ 'password' ], where: { id: request.params.id } });
    if (!userFound) return response.status(404).json({ error: "user not found" });

    const validPassword = await bcrypt.compare(currentPassword, userFound.password);
    if (!validPassword) return response.status(401).json({ error: "invalid password" });

    const isValidPassword = isvalid.password(newPassword);
    if (!isValidPassword) return response.status(400).json({ error: "invalid password" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    await userFound.update({ password: hashPassword, id: request.params.id });

    response.status(200).json({ message: "password updated" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
