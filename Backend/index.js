const express = require("express");
const cors = require("cors");
const BlogModel = require("./model");

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(cors());

// ✅ POST API to Add a New Blog
app.post("/add", async (req, res) => {
  try {
    const { title, content, img_url } = req.body;

    // Validate input
    if (!title || !content || !img_url) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const newBlog = new BlogModel({ title, content, img_url });
    await newBlog.save();

    res.status(201).send({ message: "Blog added successfully!", newBlog });
  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// GET API to Fetch All Blogs
app.get("/get", async (req, res) => {
  try {
    const data = await BlogModel.find();
    res.send(data);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// DELETE API to Delete a Blog
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await BlogModel.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).send({ message: "Blog not found" });
    }

    res.status(200).send({ message: "Blog deleted successfully!" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// PUT API to Update a Blog
app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, img_url } = req.body;

    if (!title || !content || !img_url) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      { title, content, img_url },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).send({ message: "Blog not found" });
    }

    res.status(200).send({ message: "Blog updated successfully!", updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
