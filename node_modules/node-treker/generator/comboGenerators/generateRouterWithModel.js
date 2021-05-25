const { createDirectory, createFile } = require("../../utils");
const { existsSync } = require("fs");

const { generateRouter } = require("../routers/generateRouter");
const { generateModel } = require("../models/generateModel");
const { generateRestTest } = require("../tests/generateRestTest");

// example command below
// use command --> g router-with-model blogPost fullName:String firstName:String lastName:String

const generateRouterWithModel = (userInput) => {
  generateRouter(userInput);
  generateModel(userInput);
  generateRestTest(userInput);
};

module.exports = { generateRouterWithModel };
