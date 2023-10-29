const fs = require("fs");
const path = require("path");

/**
 * Sets up the project by creating a package.json file with specified devDependencies.
 *
 * @param {string} projectName - The name of the project to set up.
 */
function setupProject(projectName) {
  // Create a new folder with the project name inside 'apps'
  const projectDir = path.join(process.cwd(), "apps", projectName);
  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
  } else {
    console.error(
      "Project folder already exists. Choose a different project name."
    );
    return;
  }

  // Create package.json content with projectName and devDependencies
  const packageJsonContent = {
    name: projectName,
    version: "1.0.0",
    devDependencies: {
      next: "latest",
      react: "latest",
      "react-dom": "latest",
    },
  };

  // Write package.json file to the project folder
  try {
    fs.writeFileSync(
      path.join(projectDir, "package.json"),
      JSON.stringify(packageJsonContent, null, 2)
    );
    console.log(`Successfully created package.json for project ${projectName}`);
  } catch (error) {
    console.error("Failed to create package.json:", error);
  }
}

module.exports = setupProject