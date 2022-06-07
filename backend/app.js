require('./config/env.config');
require('./config/db.config');
const { helmetOptions, corsOptions } = require('./config/options.config');

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const path = require('path');

const { userRoutes, postRoutes } = require('./routes');

const app = express();

app.use(helmet(helmetOptions));
app.use(cors(corsOptions));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

app.get('/api', (request, response) => response.json({ message: "Groupomania Rest API" }));
app.get('/', (request, response) => response.json({ message: "Hello world!" }));

module.exports = app;
