const jwt = require('jsonwebtoken');

exports.generateAccessToken = (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

exports.generateRefreshToken = (payload) =>  jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
