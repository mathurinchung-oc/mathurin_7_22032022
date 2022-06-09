const fs = require('fs');
const crypto = require('../utils/crypto.util');
const { User } = require('../models');
const { request, response } = require('express');

exports.getAllUsers = async (request, response) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'fullname', 'avatar', 'bio', 'admin'] });

    response.status(200).json(users);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

exports.getOneUser = async (request, response) => {
  try {
    const userFound = await User.findOne({ attributes: ['id', 'fullname', 'avatar', 'bio', 'admin'], where: { id: request.params.id } });
    if (!userFound) return response.status(404).json({ error: "user not found" });

    let email = "";
    if (userFound.email) {
      email = await crypto.decrypt(userFound.email);
      userFound.email = email;
    }

    response.status(200).json(userFound);
  } catch (error) {
    response.status(401).json({ error: error.message });
  }
};

exports.updateUser = async (request, response) => {
  try {
    const userObject = request.file ? { ...request.body, avatar: `/${request.file.path}` } : { ...request.body };

    const userFound = await User.findOne({ attributes: ['fullname', 'bio', 'avatar'], where: { id: request.params.id } });
    const userUpdated = await userFound.update({ ...userObject, id: request.params.id, email: userFound.email, password: userFound.password, admin: false });

    response.status(200).json({ message: "user successfully updated!", userUpdated});
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
};

exports.deleteUser = async (request, response) => {
  try {
    const userFound = await User.findOne({ where: { id: request.params.id } });
    if (!userFound) return response.status(404).json({ error: "user not found" });

    const filename = userFound.avatar.split('images/users/')[1];
    if (filename !== "avatar.png") {
      fs.unlink(`images/users/${filename}`, async () => {
        try {
          await User.destroy({ where: { id: request.params.id } });
    
          response.status(200).json({ message: "user has been deleted" });
        } catch (error) {
          response.status(400).json({ error: error.message });
        }
      });
    } else {
      try {
        await User.destroy({ where: { id: request.params.id } });
  
        response.status(200).json({ message: "user has been deleted" });
      } catch (error) {
        response.status(400).json({ error: error.message });
      }
    }
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

exports.deleteUserByAdmin = async (request, response) => {};
