const { createDirectory, createFile } = require("../utils");

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
  createDirectory("/routes");
  createFile(`routes/${routerName}.js`, emptyRouter);
};

module.exports = { generateEmptyRouter };

// g empty-router cupcakes
