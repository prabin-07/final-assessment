const mongoose = require("./connection");

// Blog Schema
const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    img_url: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
  },
  {
    timestamps: true, // ✅ Adds createdAt and updatedAt
  }
);

const BlogModel = mongoose.model("Blog", BlogSchema);

module.exports = BlogModel;
