const { createDirectory, createFile } = require("../../utils");
const { existsSync } = require("fs");

const generateRouter = async (userInput) => {
  // router name is also the model name.
  const routerName = userInput[2];
  let upperCaseModelName =
    routerName.charAt(0).toUpperCase() + routerName.slice(1);

  let ModelAttributes = userInput.slice(3);

  let finalAttributesForJSON = [];
  let preAttributesForPatchMethod = [];

  let idForJSON = `${routerName}_id : req.body.${routerName}_id`;
  let idForPatch = `if (req.body.${routerName}_id != null) { 
    res.${routerName}.${routerName}_id = req.body.${routerName}_id;
  }`;
  preAttributesForPatchMethod.push(idForPatch);
  finalAttributesForJSON.push(idForJSON);
  ModelAttributes.map((item) => {
    let modelAttribute = item.split(":");
    let attributeName = modelAttribute[0];
    let attributeType = modelAttribute[1];
    let AttributesForJSON = `${attributeName} : req.body.${attributeName}`;
    let attributesForPatchMethod = `if (req.body.${attributeName} != null) { 
      res.${routerName}.${attributeName} = req.body.${attributeName};
    }`;
    finalAttributesForJSON.push(AttributesForJSON);
    preAttributesForPatchMethod.push(attributesForPatchMethod);
  });

  let finalAttributesForPatchMethod = preAttributesForPatchMethod
    .toString()
    .replace("[", "")
    .replace("]", "")
    .replace(/,/g, "");

  let router = ` const express = require("express"); 
const router = express(); \n

const ${upperCaseModelName} = require("../models/${routerName}"); \n

// middleware for finding ${routerName} by id
let findById = async (req, res, next) => {
  let ${routerName};
  try {
    ${routerName} = await ${upperCaseModelName}.find({ ${routerName}_id: req.params.id });

    if (!${routerName}[0]) {
      res.status(404).json({
        message_type: "warning",
        message: "could not find a ${routerName}",
    });
    return
    }
  } catch (error) {
    res.status(500).json({
            message_type: "error",
            message: "Internal server error",
            error: error
        });
  }
  res.${routerName} = ${routerName}[0];
  next();
};

// GET all of the instances of a certain model
router.get("/", async (req, res) => { \n
    const ${routerName}s = await ${upperCaseModelName}.find()
    try{
        if(${routerName}s) {
            res.status(201).json({
                message_type: "success",
                message: "good response",
                ${routerName}s:${routerName}s
              });
        } else {
            res.status(404).json({
                message_type: "warning",
                message: "could not find a ${routerName}",
            }); 
        }
        
    } catch (error) {
        res.status(500).json({
            message_type: "error",
            message: "Internal server error",
            error: error
        });
    } \n
}) \n

// GET a single instance of a certain model by id
router.get("/:id",findById, async (req, res) => { \n
 
  try{
      res.status(201).json({
          message_type: "success",
          message: "good response",
          ${routerName}: res.${routerName}
      });
  } catch (error) {
      res.status(500).json({
          message_type: "error",
          message: "Internal server error",
          error: error
      });
  } \n
}) \n


// POST a single new instance of a certain model
router.post("/", async (req, res) => {
  const ${routerName} = await new ${upperCaseModelName}({
    ${finalAttributesForJSON}
  })

  try {
    const new_${routerName} = await ${routerName}.save();
    if(new_${routerName}) {
      res.status(201).json({
        message_type: "success",
        message: "good response",
        ${routerName}: new_${routerName}
    });
    } else {
      res.status(500).json({
        message_type: "error",
        message: "could not save to database"
      })
    }
    
  } catch (error) {
    res.status(500).json({
      message_type: "error",
      message: "Internal server error",
      error: error
    });
  }
})

// PATCH a single instance of a certain model
router.patch(
  "/:id",
  findById,
  async (req, res) => {

    ${finalAttributesForPatchMethod}

    try {
      const updated_${routerName} = await res.${routerName}.save();

      if (updated_${routerName}) {
        res.status(201).json({
          message_type: "success",
          message: "good response",
          ${routerName}: updated_${routerName}
        });
      } else {
        res.status(500).json({
          message_type: "error",
          message: "could not save to database"
        })
      }
    } catch (error) {
      res.status(500).json({
        message_type: "error",
        message: "Internal server error",
        error: error
      });
    }
  }
);

// DELETE a single instance of a certain model
router.delete("/:id", async (req, res) => {
  try {
    let deleted = await ${upperCaseModelName}.findOneAndDelete({
      ${routerName}_id: req.params.id,
    });
    if (deleted) {
      res.status(201).json({
        message_type: "success",
        message: "${routerName} deleted",
      });
    } else {
      res.status(404).json({
        message_type: "error",
        message: "could not find ${routerName}",
      });
    }

  } catch (error) {
    res.status(500).json({
      message_type: "error",
      message: "Internal server error",
      error: error
    });
  }
});

module.exports = router;
  `;

  if (existsSync(`routes`)) {
    // console.log("/routes path exists");
    await createFile(`routes/${routerName}s.js`, router);
  } else {
    // console.log("/routes path does NOT exist");
    await createDirectory("routes");
    await createFile(`routes/${routerName}s.js`, router);
  }
};

module.exports = { generateRouter };
