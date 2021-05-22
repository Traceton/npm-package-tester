const { generateModel } = require("../generator/generateModel");
const { generateEmptyServer } = require("../generator/generateEmptyServer");
const initiateGenerator = async (userInput) => {
  if (userInput[1] === "model" || userInput[1] === "m") {
    generateModel(userInput);
  } else if (userInput[1] === "empty-server" || userInput[1] === "e-s") {
    generateEmptyServer(userInput);
  }
};

module.exports = { initiateGenerator, generateModel };
