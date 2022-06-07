const mysql = require('mysql2/promise');
const { sequelize } = require('../models');
const env = process.env.NODE_ENV || 'development';
const { username, password, database } = require('./database')[env];

connectDB();

async function connectDB() {
  const mysqlOptions = { user: username, password };

  try {
    const connection = await mysql.createConnection(mysqlOptions);
    await connection.query(`create database if not exists ${database};`);

    await sequelize.authenticate({ logging: false });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database: \n" + error);
  }
};
