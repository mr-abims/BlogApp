const Blog = require("../models/blogModel");

router.get("/", (req, res) => {
  Blog.find()
    .then((blogs) => {
      res.json(blogs);
      console.log("get all blogs");
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// GET one blog by id
router.get("/blogs/:id", async (req, res) => {
  try {
    const blogSeen = await Blog.findById(req.params.id);
    res.json(blogSeen);
    console.log("get one blog by id", blogSeen);
  } catch (err) {
    res.status(500).json({ message: err.message });
    res.render("blog", { blog: res.blog });
  }
});

//  Get blogs by author
router.get("/blogs/author/:author", async (req, res) => {
  try {
    const blogSeen = await Blog.find({ author: req.params.author });
    res.json(blogSeen);
    console.log("get blogs by author", blogSeen);
  } catch (err) {
    res.status(500).json({ message: err.message });
    res.render("blog", { blog: res.blog });
  }

  // POST one blog
  router.post("/blogs", async (req, res) => {
    const {
      title,
      description,
      author,
      blog_status,
      content,
      read_count,
      reading_time,
      tags,
    } = req.body;
    const blog = new Blog({
      title,
      description,
      author,
      blog_status,
      content,
      read_count,
      reading_time,
      tags,
    });
    try {
      const newBlog = await blog.save();
      res.status(201).json(newBlog);
      console.log("post one blog", newBlog);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // PATCH one blog by id
  router.patch("/blogs/:id", async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (req.body.title != null) {
        blog.title = req.body.title;
      }
      if (req.body.description != null) {
        blog.description = req.body.description;
      }
      if (req.body.author != null) {
        blog.author = req.body.author;
      }
      if (req.body.blog_status != null) {
        blog.blog_status = req.body.blog_status;
      }
      if (req.body.content != null) {
        blog.content = req.body.content;
      }
      if (req.body.read_count != null) {
        blog.read_count = req.body.read_count;
      }
      if (req.body.reading_time != null) {
        blog.reading_time = req.body.reading_time;
      }
      if (req.body.tags != null) {
        blog.tags = req.body.tags;
      }
      const updatedBlog = await blog.save();
      res.json(updatedBlog);
      console.log("patch one blog by id", updatedBlog);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  // DELETE one blog by id
  router.delete("/blogs/:id", async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (blog == null) {
        return res.status(404).json({ message: "Cannot find blog" });
      }
      await blog.remove();
      res.json({ message: "Deleted blog" });
      console.log("delete one blog by id", blog);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
});
