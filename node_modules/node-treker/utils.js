const fs = require("fs");

const createDirectory = (directoryPath) => {
  fs.mkdir(process.cwd() + directoryPath, { recursive: false }, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`${directoryPath} created`);
    }
  });
};

const createFile = (filePath, fileContent) => {
  fs.writeFile(filePath, fileContent, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`${filePath} created`);
    }
  });
};

module.exports = { createDirectory, createFile };
