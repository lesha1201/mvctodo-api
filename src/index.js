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

const port = process.env.PORT || 8080

app.listen(port, () => console.log("Server is running on port 8080."));