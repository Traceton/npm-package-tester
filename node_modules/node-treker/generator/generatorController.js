const { generateModel } = require("./models/generateModel");
const { generateRouter } = require("./routers/generateRouter");
const { generateRestTest } = require("./tests/generateRestTest");
const { generateEmptyServer } = require("./serverFiles/generateEmptyServer");
const { generateEmptyRouter } = require("./routers/generateEmptyRouter");
const {
  generateRouterWithModel,
} = require("./comboGenerators/generateRouterWithModel");
const {
  generateServerRouterModel,
} = require("./comboGenerators/generateServerRouterModel");

const generatorController = (userInput) => {
  if (userInput[1] === "model" || userInput[1] === "m") {
    generateModel(userInput);
  } else if (userInput[1] === "router" || userInput[1] === "r") {
    generateRouter(userInput);
  } else if (userInput[1] === "tests" || userInput[1] === "t") {
    generateRestTest(userInput);
  } else if (userInput[1] === "empty-server" || userInput[1] === "e-s") {
    generateEmptyServer(userInput);
  } else if (userInput[1] === "empty-router" || userInput[1] === "e-r") {
    generateEmptyRouter(userInput);
  } else if (userInput[1] === "router-with-model" || userInput[1] === "rwm") {
    generateRouterWithModel(userInput);
  } else if (userInput[1] === "server-router-model" || userInput[1] === "srm") {
    generateServerRouterModel(userInput);
  } else {
    console.log("Sorry that command was not found");
  }
};

module.exports = { generatorController, generateModel };
