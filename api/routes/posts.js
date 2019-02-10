const express = require("express");
const axios = require("axios");
const uniqid = require("uniqid");
const router = express.Router();

router.get("/", (req, res, next) => {
  axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then(posts => {
      res.status(200).json({
        count: posts.data.length,
        posts: posts.data.map(post => {
          return {
            id: post.id,
            user_id: post.user_id,
            title: post.title,
            body: post.body
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const post = {
    id: uniqid(),
    user_id: req.body.user_id,
    title: req.body.title,
    body: req.body.body
  };

  axios
    .post("https://jsonplaceholder.typicode.com/posts", post)
    .then(post => {
      res.status(200).json({
        post: post.data
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:postId", (req, res, next) => {
  let postId = req.params.postId;
  axios
    .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(post => {
      res.status(200).json({
        post: post.data
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:postId", (req, res, next) => {
  const postId = req.params.postId;
  axios
    .delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(post => {
      res.status(200).json({
        id: postId,
        success: true,
        message: "Post borrado con exito!"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
