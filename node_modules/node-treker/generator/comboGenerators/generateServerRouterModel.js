const { generateServer } = require("../serverFiles/generateServer");
const { generateRouter } = require("../routers/generateRouter");
const { generateModel } = require("../models/generateModel");
const { generateRestTest } = require("../tests/generateRestTest");

// example command below
// use command --> g server-router-model blogPost fullName:String firstName:String lastName:String

const generateServerRouterModel = (userInput) => {
  generateServer(userInput);
  generateRouter(userInput);
  generateModel(userInput);
  generateRestTest(userInput);
};

module.exports = { generateServerRouterModel };
