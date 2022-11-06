const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const blogSchema = new Schema({
  _id: ObjectId,
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  blog_status: {
    type: String,
    required: true,
    enum: ["draft", "published"],
    default: "draft",
  },
  content: {
    type: String,
    required: true,
  },
  read_count: {
    type: Number,
    default: 0,
  },
  reading_time: {
    type: Number,
    default: 0,
  },
  tags: {
    type: Array,
    default: [],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
