const {
  createApp,
  createServer,
  createEnv,
  createMiddleware,
  createRoute,
  createController,
  createService,
  createValidation,
} = require("./utility/createFiles");

const checkFileExists = require("./utility/checkFileExists");

const entityName = process.argv[2];

if (!entityName) {
  createApp();
  createServer();
  createEnv();
  createMiddleware();
} else {
  if (!checkFileExists("./app.js")) return;

  createRoute(entityName);
  createController(entityName);
  createService(entityName);
  createValidation(entityName);
  // const folder = ["app.js", "app.js", "constants/responses.js"];

  // const stringToSearch = ['");', ");", "{"];

  // const contentToAdd = [
  //   `\nconst ${entityName}Routes = require("./routes/${entityName}/${entityName}.routes");`,
  //   `\napp.use("/api/${entityName}", ${entityName}Routes);\n`,
  //   `\n\t${entityName.toUpperCase()}_RESPONSES: {
  //           CREATE_SUCCESS: "${capitalize(entityName)} created successfully.",
  //           UPDATE_SUCCESS: "${capitalize(entityName)} updated successfully.",
  //           DELETE_SUCCESS: "${capitalize(entityName)} deleted successfully.",
  //           NOT_FOUND: "${capitalize(entityName)} not found."
  //       \t},`,
  // ];

  // stringToSearch.forEach((string, index) => {
  //   var appJs = fs.readFileSync(`${folder[index]}`, "utf8");
  //   if (index === 2) {
  //     var lastIndex = appJs.indexOf(string);
  //   } else {
  //     var lastIndex = appJs.lastIndexOf(string);
  //   }
  //   var firstPart = appJs.substring(0, lastIndex) + string;
  //   var secondPart = appJs.substring(lastIndex + string.length);
  //   var additionalLine = contentToAdd[index];

  //   createOrUpdateFile(
  //     `${folder[index]}`,
  //     firstPart + additionalLine + secondPart
  //   );
  // });
}

console.log(`All done.`);
