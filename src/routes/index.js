/* eslint-disable linebreak-style */
const express = require("express");
const blogController = require("../controller/blogController");
const router = express.Router();

// Authentication
router.post("/login", (req, res) => {
  try {
    if (req.body.email && req.body.password) {
      return res.json({
        success: true,
        data: {
          username: "Admin",
        },
        accessToken: "This is just demo token",
      });
    } else {
      return res.status(400).json({
        success: false,
        messgae: "All fields are required",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      messgae: "Internal Server error",
    });
  }
});

// Blogs
router.get("/blogs", blogController.find);
router.post("/blog-create", blogController.create);
router.get("/blog/:slug", blogController.findOne);
router.put("/blog-edit/:slug", blogController.updateOne);
router.delete("/blog-delete/:slug", blogController.delete);

module.exports = router
