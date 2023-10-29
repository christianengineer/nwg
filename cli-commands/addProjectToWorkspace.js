const fs = require("fs");
const path = require("path");
const setupProject = require("./setupProject");

/**
 * Adds a new project to an existing workspace.json file.
 *
 * @param {Object} restArgs - Arguments for adding a new project.
 * @param {string} restArgs.projectName - The name of the new project.
 * @param {string} [restArgs.workspaceDir='./'] - The directory where the workspace.json file is located.
 * @param {Object} [restArgs.projectConfig={}] - The configuration settings for the new project.
 * @returns {boolean} - Returns true if the project was successfully added, otherwise false.
 */
function addProjectToWorkspace(restArgs) {
  console.log(process.argv);
  console.log("Debugging restArgs: ", restArgs);

  // Extracting and setting default values for arguments
  const { projectName, projectConfig = {} } = restArgs;
  const workspaceDir = restArgs.workspaceDir || "./";

  if (!projectName) {
    console.error("Project name is required.");
    return false;
  }

  // Read the existing workspace.json file
  try {
    const workspaceJsonStr = fs.readFileSync(
      path.join(workspaceDir, "workspace.json"),
      "utf-8"
    );
    const workspace = JSON.parse(workspaceJsonStr);

    // Check if project already exists
    if (workspace.projects && workspace.projects[projectName]) {
      console.error("Project already exists in the workspace.");
      return false;
    }

    // Add the new project to the 'projects' object
    workspace.projects[projectName] = projectConfig;

    // Convert the updated workspace object back to a JSON string
    const updatedWorkspaceJsonStr = JSON.stringify(workspace, null, 2);

    // Write the updated JSON string back to the workspace.json file
    fs.writeFileSync(
      path.join(workspaceDir, "workspace.json"),
      updatedWorkspaceJsonStr
    );

    setupProject(projectName);

    console.log(`Successfully added project ${projectName}`);
    return true;
  } catch (error) {
    console.error("Could not update workspace.json:", error);
    return false;
  }
}

module.exports = addProjectToWorkspace;
