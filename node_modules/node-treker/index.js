const { createDirectory, createFile } = require("./utils");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Command name:  \n", (commandName) => {
  if (commandName.trim() === "scaffold") {
    rl.question("variableType : variableName", (commands) => {
      console.log(`scaffold initiated \n`);
      createDirectory("/scaffold");
      createFile(`scaffold/index.js`, "index created");
    });
  }
  rl.close();
});
