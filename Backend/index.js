const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const BlogModel = require("./model");
require("./connection")

const app = express();
var PORT = 3001;
app.use(express.json());
app.use(cors());



app.post("/add", async (req, res) => {
  try {
    const blog = new BlogModel(req.body);
    await blog.save();
    res.status(201).json({ success: true, message: "Blog created successfully", blog });
  } catch (error) {
    console.error("Create Error:", error);
    res.status(500).json({ success: false, message: "Failed to create blog", error });
  }
});




app.delete("/delete/:id", async (req, res) => {
  try {
    const deletedBlog = await BlogModel.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete blog", error });
  }
});


app.put("/update/:id", async (req, res) => {
  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, message: "Failed to update blog", error });
  }
});



app.get("/get", async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});




app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
