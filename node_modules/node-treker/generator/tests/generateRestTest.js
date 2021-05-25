const { createDirectory, createFile } = require("../../utils");
const { existsSync } = require("fs");

// commands- generate tests user id:String name:String

const generateRestTest = async (userInput) => {
  const modelName = userInput[2];

  let ModelAttributes = userInput.slice(3);

  let finalAttributesForJSON = [];

  ModelAttributes.map((item) => {
    let modelAttribute = item.split(":");
    let attributeName = modelAttribute[0];
    let AttributesForJSON = `\n \t \t ${JSON.stringify(
      attributeName
    )} : "Test value" `;
    finalAttributesForJSON.push(AttributesForJSON);
  });

  let restFile = `
    # generated rest file from node-treker
    #model name - ${modelName}

   # GET all of the instances of a certain model
    GET http://localhost:3001/${modelName}s
    Content-Type: application/json


    ###



    # GET a single instance of a certain model by id
    GET http://localhost:3001/${modelName}s/1
    Content-Type: application/json


    ###



    # POST a single new instance of a certain model
    POST http://localhost:3001/${modelName}s
    Content-Type: application/json
    {
      ${finalAttributesForJSON}
    }



    ###



    # PATCH a single instance of a certain model
    PATCH http://localhost:3001/${modelName}s/1
    Content-Type: application/json
    {
      ${finalAttributesForJSON}
    }



    ###



    # DELETE a single instance of a certain model
    DELETE http://localhost:3001/${modelName}s/1
    Content-Type: application/json

    `;

  if (!existsSync(`tests`)) {
    // console.log("/tests path does NOT exist");
    await createDirectory("tests");
    await createFile(`tests/${modelName}.rest`, restFile);
  } else {
    // console.log("/tests path exists");
    await createFile(`tests/${modelName}.rest`, restFile);
  }
};
module.exports = { generateRestTest };
