const Resource = require("../models/Resource");

// POST /api/resources
exports.createResource = async (req, res) => {
  try {
    const { title, description, url } = req.body;

    if (!title?.trim() || !description?.trim() || !url?.trim()) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const resource = new Resource({
      title,
      description,
      url,
      uploadedBy: req.user.id,
    });

    const saved = await resource.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Create resource error:", err.message);
    res.status(500).json({ message: "Upload failed" });
  }
};

// GET /api/resources/my
exports.getMyResources = async (req, res) => {
  try {
    const resources = await Resource.find({ uploadedBy: req.user.id }).sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    console.error("Get my resources error:", err.message);
    res.status(500).json({ message: "Failed to fetch resources" });
  }
};
