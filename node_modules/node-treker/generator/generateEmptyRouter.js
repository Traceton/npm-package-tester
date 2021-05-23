const { createDirectory, createFile } = require("../utils");
const { existsSync } = require("fs");

const generateEmptyRouter = async (userInput) => {
  const routerName = userInput[2];

  let emptyRouter = ` const express = require("express"); 
const mongoose = require("mongoose");
const router = express(); \n

router.get("/", async (req, res) => { \n
    try{
        res.status(201).json({
            message_type: "success",
            message: "good response"

          });
    } catch (error) {
        res.status(500).json({
            message_type: "error",
            message: "Internal server error",
        });
    } \n
}) \n
module.exports = router;
  `;

  if (existsSync(`routes`)) {
    console.log("/routes path exists");
    await createFile(`routes/${routerName}s.js`, emptyRouter);
  } else {
    console.log("/routes path does NOT exist");
    await createDirectory("routes");
    await createFile(`routes/${routerName}s.js`, emptyRouter);
  }
};

module.exports = { generateEmptyRouter };

// g empty-router cupcakes
