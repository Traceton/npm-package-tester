const { generateModel } = require("./generateModel");
const { generateEmptyServer } = require("./generateEmptyServer");
const { generateEmptyRouter } = require("./generateEmptyRouter");
const initiateGenerator = async (userInput) => {
  if (userInput[1] === "model" || userInput[1] === "m") {
    generateModel(userInput);
  } else if (userInput[1] === "empty-server" || userInput[1] === "e-s") {
    generateEmptyServer(userInput);
  } else if (userInput[1] === "empty-router" || userInput[1] === "e-r") {
    generateEmptyRouter(userInput);
  }
};

module.exports = { initiateGenerator, generateModel };
