const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");

// POST /api/generate-trip - Generate AI trip plan
router.post("/generate-trip", aiController.generateTrip);

module.exports = router;
