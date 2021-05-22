const { generateModel } = require("../generator/generateModel");

const initiateGenerator = async (userInput) => {
  if (userInput[1] === "model" || userInput[1] === "m") {
    generateModel(userInput);
  }
};

module.exports = { initiateGenerator, generateModel };
