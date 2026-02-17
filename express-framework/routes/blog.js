const express = require("express");
const router = express.Router();

let posts = [];

router.get("/", (req, res) => {
  res.render("blog/index", { posts: posts });
});

router.get("/new", (req, res) => {
  res.render("blog/new");
});

router.post("/", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  posts.push({
    id: posts.length + 1,
    title: title,
    content: content
  });

  res.redirect("/blog");
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const post = posts.find(p => p.id == id);

  if (!post) {
    return res.send("Post not found");
  }

  res.render("blog/show", { post: post });
});

module.exports = router;
