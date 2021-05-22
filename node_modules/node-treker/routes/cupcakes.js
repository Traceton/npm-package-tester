const express = require("express");
const mongoose = require("mongoose");
const router = express();

router.get("/", async (req, res) => {
  try {
    res.status(201).json({
      message_type: "success",
      message: "good response",
    });
  } catch (error) {
    res.status(500).json({
      message_type: "error",
      message: "Internal server error",
    });
  }
});

module.exports = router;
