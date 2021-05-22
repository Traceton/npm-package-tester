const { createDirectory, createFile } = require("../utils");

const generateModel = async (userInput) => {
  // removes commands from start
  userInput.shift();
  userInput.shift();
  let modelName = userInput[0];
  userInput.shift();

  let neWModelSchemaItems = [];

  // maps through each command
  userInput.map((unSplitEntry) => {
    let entry = unSplitEntry.split(":");
    let entryName = entry[0];
    let entryType = entry[1];

    // console.log(JSON.stringify(entryType));
    let modelField = {
      [entryName]: {
        type: entryType,
        required: true,
      },
    };

    let stringField = JSON.stringify(modelField)
      .replace("{", "")
      .replace("}", "");
    neWModelSchemaItems.push(stringField);
  });

  let createdOnField = `createdOn: {
    type: Date,
    required: true,
    default: Date.now(),
  },`;
  neWModelSchemaItems.push(createdOnField);

  let finalSchemaItems = neWModelSchemaItems
    .toString()
    .replace("[", "")
    .replace("]", "")
    .replace(/"/g, "");

  let newModel = `const mongoose = require("mongoose"); \n

  const ${modelName}Schema = new mongoose.Schema({

  ${finalSchemaItems}

  }); \n

  module.exports = mongoose.model("${modelName}", ${modelName}Schema);`;

  createFile(`${modelName}.js`, newModel);

  // trying to get a mongoose model to print using the user entries
  // console.log(JSON.stringify(modelField));
};

module.exports = { generateModel };
