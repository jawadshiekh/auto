const fs = require("fs");
const ejs = require("ejs");
const pluralize = require("pluralize");

const capitalize = require("./utility/capitalize");
const createOrUpdateFile = require("./utility/createOrUpdateFile");

const entityName = process.argv[2];

if (!entityName) {
  const appStarterTemplate = fs.readFileSync(
    `${__dirname}/template/app.template.ejs`,
    "utf8"
  );
  const appTemplate = ejs.render(appStarterTemplate);
  createOrUpdateFile("./app.js", appTemplate);

  const serverStarterTemplate = fs.readFileSync(
    `${__dirname}/template/server.template.ejs`,
    "utf8"
  );
  const serverTemplate = ejs.render(serverStarterTemplate);
  createOrUpdateFile("./server.js", serverTemplate);

  const envStarterTemplate = fs.readFileSync(
    `${__dirname}/template/env.template.ejs`,
    "utf8"
  );
  const envTemplate = ejs.render(envStarterTemplate);
  createOrUpdateFile("./.env", envTemplate);
  createOrUpdateFile("./.env.development", envTemplate);
  createOrUpdateFile("./.env.staging", envTemplate);
} else {
  const directories = ["route", "controller", "service", "validation"];

  const validations = ["create", "update"];

  const folder = ["app.js", "app.js", "constants/responses.js"];

  const stringToSearch = ['");', ");", "{"];

  const contentToAdd = [
    `\nconst ${entityName}Routes = require("./routes/${entityName}/${entityName}.routes");`,
    `\napp.use("/api/${entityName}", ${entityName}Routes);\n`,
    `\n\t${entityName.toUpperCase()}_RESPONSES: {
            CREATE_SUCCESS: "${capitalize(entityName)} created successfully.",
            UPDATE_SUCCESS: "${capitalize(entityName)} updated successfully.",
            DELETE_SUCCESS: "${capitalize(entityName)} deleted successfully.",
            NOT_FOUND: "${capitalize(entityName)} not found."
        \t},`,
  ];

  //   directories.forEach((directory) => {
  //     if (directory === "validation") {
  //       validations.forEach((validation) => {
  //         const starterTemplate = fs.readFileSync(
  //           `${__dirname}/template/${validation}${capitalize(
  //             directory
  //           )}.template.ejs`,
  //           "utf8"
  //         );
  //         const template = ejs.render(starterTemplate, {
  //           entityName,
  //           capitalize,
  //           plural: pluralize.plural,
  //         });

  //         createOrUpdateFile(
  //           `${directory}s/${pluralize.plural(
  //             entityName
  //           )}/${validation}.${directory}.js`,
  //           template
  //         );
  //       });
  //     } else {
  //       const starterTemplate = fs.readFileSync(
  //         `${__dirname}/template/${directory}.template.ejs`,
  //         "utf8"
  //       );
  //       const template = ejs.render(starterTemplate, {
  //         entityName,
  //         capitalize,
  //         plural: pluralize.plural,
  //       });

  //       createOrUpdateFile(
  //         `${directory}s/${entityName}/${entityName}.${
  //           directory === "route" ? directory + "s" : directory
  //         }.js`,
  //         template
  //       );
  //     }

  //     console.log(`${entityName} ${directory}s created successfully.`);
  //   });

  stringToSearch.forEach((string, index) => {
    var appJs = fs.readFileSync(`${folder[index]}`, "utf8");
    if (index === 2) {
      var lastIndex = appJs.indexOf(string);
    } else {
      var lastIndex = appJs.lastIndexOf(string);
    }
    var firstPart = appJs.substring(0, lastIndex) + string;
    var secondPart = appJs.substring(lastIndex + string.length);
    var additionalLine = contentToAdd[index];

    createOrUpdateFile(
      `${folder[index]}`,
      firstPart + additionalLine + secondPart
    );
  });
}

console.log(`All done.`);
