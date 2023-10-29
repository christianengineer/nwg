const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * Run tasks like build for each project in the workspace.
 *
 * @param {string} [workspaceDir='./'] - The directory where the workspace.json and project-graph.json files are located.
 * @param {string} task - The task to run (e.g., 'build').
 * @returns {boolean} - Returns true if tasks were successfully run, otherwise false.
 */
function runTasks(workspaceDir = "./", task) {
  try {
    // Read the existing project-graph.json file
    const projectGraphJsonStr = fs.readFileSync(
      path.join(workspaceDir, "project-graph.json"),
      "utf-8"
    );
    const projectGraph = JSON.parse(projectGraphJsonStr);

    // Iterate through each project in the graph
    for (const [projectName, projectData] of Object.entries(projectGraph)) {
      // Here, you could implement logic to check if the project is affected by the latest changes
      // For demonstration, we'll assume all projects are affected

      // Run the task for the project
      // (Replace this with the actual command to run your tasks)
      console.log(`Running ${task} for project ${projectName}...`);
      execSync(
        `cd ${path.join(workspaceDir, projectData.path)} && npm run ${task}`
      );

      console.log(`Successfully ran ${task} for project ${projectName}`);
    }

    return true;
  } catch (error) {
    console.error(`Could not run tasks: ${error}`);
    return false;
  }
}

module.exports = runTasks;
