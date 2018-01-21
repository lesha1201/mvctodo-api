const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');

const todos = require('./routes/todos');

dotenv.config();

const app = express();
app.use(helmet());
app.use(compression());
app.use(express.json({ inflate: true }));
app.use(cors());

mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URL, { useMongoClient: true });

app.use('/api/todos', todos);

const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
      ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.listen(port, ip, () => console.log('Server running on http://%s:%s', ip, port));