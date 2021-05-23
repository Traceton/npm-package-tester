const { createDirectory, createFile } = require("../utils");
const { existsSync } = require("fs");

const { generateEmptyRouter } = require("./generateEmptyRouter");
const { generateModel } = require("./generateModel");

// example command below
// use command --> g router-with-model user id:String name:String
// use command --> g router-with-model blogPost id:String name:String
// use command --> g router-with-model car id:String name:String

const generateRouterWithModel = (userInput) => {
  generateEmptyRouter(userInput);
  generateModel(userInput);
};

module.exports = { generateRouterWithModel };
