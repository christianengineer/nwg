#!/usr/bin/env node

const { version } = require("./package.json");

const createProjectGraph = require("./cli-commands/createProjectGraph");
const createWorkspace = require("./cli-commands/createWorkspace");
const addProjectToWorkspace = require("./cli-commands/addProjectToWorkspace");
const runTasks = require("./cli-commands/runTasks");

/**
 * Converts an array of key-value strings into an object.
 *
 * @param {string[]} restArgs - An array of strings in the format "key=value".
 * @returns {Object} - An object with keys and values based on the input array.
 */
function convertRestArgsToObject(restArgs) {
  const argsObject = {};

  restArgs.forEach((arg) => {
    const [key, value] = arg.split("=");
    if (key && value) {
      argsObject[key] = value;
    }
  });

  return argsObject;
}

/**
 * Handles user commands to perform specific actions.
 *
 * @param {string} command - The command to execute.
 * @param {Array<string>} restArgs - The arguments for the command.
 */
function handleCommand(command, restArgs) {
  const argsObject = convertRestArgsToObject(restArgs);
  console.log("argsObject handlec", argsObject);
  switch (command) {
    case "version":
    case "-v":
    case "--version":
      console.log(`You are running version ${version} of the CLI.`);
      break;
    case "create":
      console.log("Creating a new project...");
      createWorkspace(argsObject); // Assuming createWorkspace accepts arguments
      break;
    case "add":
      console.log("Adding a project to the workspace...");
      // Call the function responsible for adding a project to the workspace here
      addProjectToWorkspace(argsObject);
      break;
    case "build":
      console.log("Building the project...");
      // Call the function responsible for building the project here
      break;
    case "runTask":
      console.log(`Running tasks for projects...`);
      runTasks(argsObject.workspaceDir, argsObject.task); // Assuming argsObject.task is the task like 'build'
      break;
    case "graph":
      console.log("Creating the project dependency graph...");
      createProjectGraph(argsObject); // Assuming you pass the workspace directory as an argument
      break;
    default:
      console.log('Command not recognized. Use "create", "add", or "build".');
  }
}

// Capture the command-line arguments
const [nodePath, scriptPath, command, ...restArgs] = process.argv;

// Call the handler function with the user's command
handleCommand(command, restArgs);
