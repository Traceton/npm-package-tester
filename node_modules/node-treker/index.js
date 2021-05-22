const { createDirectory, createFile } = require("./utils");
const { initiateGenerator } = require("./generator/index");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// generate model user:string

rl.question("node-treker command:  \n", (commandName) => {
  let userInput = commandName.trim().split(" ");
  if (userInput[0] === "generate" || userInput[0] === "g") {
    initiateGenerator(userInput);
  } else if (userInput[0] === "generate" || userInput[0] === "g") {
    initiateGenerator(userInput);
  }
  rl.close();
});
