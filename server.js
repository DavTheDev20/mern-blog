const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const apiRoute = require('./routes/apiRoute.js');
const BlogPost = require('./models/blogPost');

const app = express();
const port = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost:27017/mern-blogDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Successfully connected to mern-blogDB');
});

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', apiRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));
