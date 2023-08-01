const fs = require("fs");
const ejs = require("ejs");
const pluralize = require("pluralize");

const capitalize = require("./capitalize");
const createOrUpdateFile = require("./createOrUpdateFile");

const validations = ["create", "update"];

const createApp = () => {
  const appStarterTemplate = fs.readFileSync(
    `${__dirname}/../template/app.template.ejs`,
    "utf8"
  );
  const appTemplate = ejs.render(appStarterTemplate);
  createOrUpdateFile("./app.js", appTemplate);
  console.log(`app created successfully.`);
};
const createServer = () => {
  const serverStarterTemplate = fs.readFileSync(
    `${__dirname}/../template/server.template.ejs`,
    "utf8"
  );
  const serverTemplate = ejs.render(serverStarterTemplate);
  createOrUpdateFile("./server.js", serverTemplate);
  console.log(`server created successfully.`);
};
const createEnv = () => {
  const envStarterTemplate = fs.readFileSync(
    `${__dirname}/../template/env.template.ejs`,
    "utf8"
  );
  const envTemplate = ejs.render(envStarterTemplate);
  createOrUpdateFile("./.env", envTemplate);
  createOrUpdateFile("./.env.development", envTemplate);
  createOrUpdateFile("./.env.staging", envTemplate);
  console.log(`envs created successfully.`);
};
const createMiddleware = () => {
  const authRequiredStarterTemplate = fs.readFileSync(
    `${__dirname}/../template/authRequiredMiddleware.template.ejs`,
    "utf8"
  );
  const authRequiredTemplate = ejs.render(authRequiredStarterTemplate);
  createOrUpdateFile(
    "./middleware/authRequired.middleware.js",
    authRequiredTemplate
  );

  const guestAccessStarterTemplate = fs.readFileSync(
    `${__dirname}/../template/guestAccessMiddleware.template.ejs`,
    "utf8"
  );
  const guestAccessTemplate = ejs.render(guestAccessStarterTemplate);
  createOrUpdateFile(
    "./middleware/guestAccess.middleware.js",
    guestAccessTemplate
  );

  const validateRequestStarterTemplate = fs.readFileSync(
    `${__dirname}/../template/validateRequestMiddleware.template.ejs`,
    "utf8"
  );
  const validateRequestTemplate = ejs.render(validateRequestStarterTemplate);
  createOrUpdateFile(
    "./middleware/validateRequest.middleware.js",
    validateRequestTemplate
  );
  console.log(`middleware created successfully.`);
};
const createRoute = (entityName) => {
  const starterTemplate = fs.readFileSync(
    `${__dirname}/../template/route.template.ejs`,
    "utf8"
  );
  const template = ejs.render(starterTemplate, {
    entityName,
    capitalize,
    plural: pluralize.plural,
  });

  createOrUpdateFile(`routes/${entityName}/${entityName}.routes.js`, template);
  console.log(`${entityName} routes created successfully.`);
};
const createController = (entityName) => {
  const starterTemplate = fs.readFileSync(
    `${__dirname}/../template/controller.template.ejs`,
    "utf8"
  );
  const template = ejs.render(starterTemplate, {
    entityName,
    capitalize,
    plural: pluralize.plural,
  });

  createOrUpdateFile(
    `controllers/${entityName}/${entityName}.controller.js`,
    template
  );
  console.log(`${entityName} controllers created successfully.`);
};
const createService = (entityName) => {
  const starterTemplate = fs.readFileSync(
    `${__dirname}/../template/service.template.ejs`,
    "utf8"
  );
  const template = ejs.render(starterTemplate, {
    entityName,
    capitalize,
    plural: pluralize.plural,
  });

  createOrUpdateFile(
    `services/${entityName}/${entityName}.service.js`,
    template
  );
  console.log(`${entityName} services created successfully.`);
};
const createValidation = (entityName) => {
  validations.forEach((validation) => {
    const starterTemplate = fs.readFileSync(
      `${__dirname}/../template/${validation}Validation.template.ejs`,
      "utf8"
    );
    const template = ejs.render(starterTemplate, {
      entityName,
      capitalize,
      plural: pluralize.plural,
    });

    createOrUpdateFile(
      `validations/${pluralize.plural(entityName)}/${validation}.validation.js`,
      template
    );
  });
  console.log(`${entityName} validations created successfully.`);
};

module.exports = {
  createApp,
  createServer,
  createEnv,
  createMiddleware,
  createController,
  createRoute,
  createService,
  createValidation,
};
