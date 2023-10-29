const fs = require("fs");
const path = require("path");

/**
 * Creates a project dependency graph based on workspace.json and stores it in a separate JSON file.
 *
 * @param {Object} args - Arguments for adding a new project.
 * @param {string} [args.workspaceDir='./'] - The directory where the workspace.json file is located.
 * @returns {boolean} - Returns true if the project graph was successfully created, otherwise false.
 */
function createProjectGraph(args) {
  const workspaceDir = args.workspaceDir || "./";

  try {
    // Read the existing workspace.json file
    const workspaceJsonStr = fs.readFileSync(
      path.join(workspaceDir, "workspace.json"),
      "utf-8"
    );
    const workspace = JSON.parse(workspaceJsonStr);

    // Initialize an empty project graph
    const projectGraph = {};

    // Populate the project graph based on the 'projects' in workspace.json
    for (const [projectName, projectConfig] of Object.entries(
      workspace.projects
    )) {
      projectGraph[projectName] = {
        dependencies: projectConfig.dependencies || [],
        // ... any other project-related metadata you want to include
      };
    }

    // Convert the project graph object to a JSON string
    const projectGraphJsonStr = JSON.stringify(projectGraph, null, 2);

    // Write the JSON string to a project-graph.json file in the specified directory
    fs.writeFileSync(
      path.join(workspaceDir, "project-graph.json"),
      projectGraphJsonStr
    );

    console.log("Successfully created project-graph.json");
    return true;
  } catch (error) {
    console.error("Could not create project-graph.json:", error);
    return false;
  }
}

module.exports = createProjectGraph;
