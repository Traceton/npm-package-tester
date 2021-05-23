const { createDirectory, createFile } = require("../utils");
const { existsSync } = require("fs");

const generateEmptyRouter = async (userInput) => {
  userInput.shift();
  userInput.shift();
  const routerName = userInput[0];

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
    createFile(`routes/${routerName}.js`, emptyRouter);
  } else {
    console.log("/routes path does NOT exist");
    createDirectory("/routes");
    createFile(`routes/${routerName}.js`, emptyRouter);
  }
};

module.exports = { generateEmptyRouter };

// g empty-router cupcakes
