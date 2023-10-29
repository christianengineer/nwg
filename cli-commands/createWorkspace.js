const fs = require("fs");
const path = require("path");

/**
 * Generates an initial workspace.json file with default or provided values.
 *
 * @param {Object} [args] - Optional arguments to customize the workspace.
 * @param {string} [args.workspaceDir='./'] - The directory where the workspace.json file will be created.
 * @param {number} [args.version=1] - The version of the workspace schema.
 * @returns {boolean} - Returns true if the file was successfully created, otherwise false.
 */
function createWorkspace(args = {}) {
  // Set default values
  const workspaceDir = args.workspaceDir || "./";
  const version = args.version || 1;

  // Define the initial structure of workspace.json
  const workspace = {
    version,
    projects: {},
  };

  // Convert the JavaScript object to a JSON string
  const workspaceJsonStr = JSON.stringify(workspace, null, 2);

  try {
    // Write the JSON string to a workspace.json file in the specified directory
    fs.writeFileSync(
      path.join(workspaceDir, "workspace.json"),
      workspaceJsonStr
    );
    console.log("Successfully created workspace.json");
    return true;
  } catch (error) {
    console.error("Could not create workspace.json:", error);
    return false;
  }
}

module.exports = createWorkspace;
