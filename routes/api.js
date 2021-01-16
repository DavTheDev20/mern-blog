const express = require('express');
const mongoose = require('mongoose');
const BlogPost = require('../models/blogPost');

const router = express.Router();

router.get('/api', (req, res) => {
  BlogPost.find({}, (error, posts) => {
    if (error) {
      console.log(error);
    } else {
      res.json(posts);
    }
  });
});

router.get('/api/name', (req, res) => {
  const data = {
    name: 'Nina',
    age: 21,
  };
  res.json(data);
});

router.post('/api/save', (req, res) => {
  console.log('Body: ', req.body);

  const enteredTitle = req.body.title;
  const enteredBody = req.body.body;

  const newBlogPost = new BlogPost({
    title: enteredTitle,
    body: enteredBody,
  });

  newBlogPost.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Successfully saved new blog post to the DB');
    }
  });

  res.json({
    msg: 'Data has been recieved',
  });
});

module.exports = router;
