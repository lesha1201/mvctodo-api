const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const compression = require('compression');
const helmet = require('helmet');

const todos = require('./routes/todos');

dotenv.config();

const app = express();
app.use(helmet());
app.use(compression());
app.use(express.json({ inflate: true }));

mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URL, { useMongoClient: true });

app.use('/api/todos', todos);

const server_port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;
const server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(server_port, () => console.log( "Listening on port " + server_port ));