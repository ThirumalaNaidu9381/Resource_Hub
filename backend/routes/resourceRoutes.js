const express = require("express");
const router = express.Router();
const Resource = require("../models/Resource");
const auth = require("../middleware/authMiddleware");

// POST /api/resources - Upload a new resource (creator only)
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, url } = req.body;

    if (!title?.trim() || !description?.trim() || !url?.trim()) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const resource = new Resource({
      title,
      description,
      url,
      creator: req.user.id, // ✅ Updated from uploadedBy to creator
    });

    const saved = await resource.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Resource upload error:", err.message);
    res.status(500).json({ message: "Server error while uploading resource" });
  }
});

// GET /api/resources/my - Fetch resources uploaded by the logged-in creator
router.get("/my", auth, async (req, res) => {
  try {
    const resources = await Resource.find({ creator: req.user.id }) // ✅ Updated from uploadedBy to creator
      .sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    console.error("Fetch my resources error:", err.message);
    res.status(500).json({ message: "Failed to fetch resources" });
  }
});

// GET /api/resources - Public access for search or display
router.get("/", async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    console.error("Fetch all resources error:", err.message);
    res.status(500).json({ message: "Failed to fetch resources" });
  }
});

module.exports = router;
