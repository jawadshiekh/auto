const fs = require("fs");
const ejs = require("ejs");
const pluralize = require('pluralize');

const capitalize = require("./utility/capitalize");
const createOrUpdateFile = require("./utility/createOrUpdateFile");

const entityName = process.argv[2];

const directories = ['route', 'controller', 'service', 'validation'];

directories.forEach(directory => {
    const starterTemplate = fs.readFileSync(`template/${directory}.template.ejs`, 'utf8');
    const template = ejs.render(starterTemplate, { entityName, capitalize, plural: pluralize.plural });

    createOrUpdateFile(
        `${directory}s/${entityName}/${entityName}.${directory === 'route' ? directory + 's' : directory}.js`, template
    );

    console.log(`${entityName} ${directory}s created successfully.`);
});

var find1 = ".routes\");";
var appJs = fs.readFileSync(`app.js`, 'utf8');
var lastIndex = appJs.lastIndexOf(find1);
var firstPart = appJs.substring(0, lastIndex) + find1;
var secondPart = appJs.substring(lastIndex + find1.length);
var additionalLine = `\nconst ${entityName}Routes = require("./routes/${entityName}/${entityName}.routes");`

createOrUpdateFile('app.js', firstPart + additionalLine + secondPart);

var find2 = ");"
var appJs = fs.readFileSync(`app.js`, 'utf8');
var lastIndex = appJs.lastIndexOf(find2);
var firstPart = appJs.substring(0, lastIndex) + find2;
var secondPart = appJs.substring(lastIndex + find2.length);
var additionalLine = `\napp.use("/api/${entityName}", ${entityName}Routes);\n`

createOrUpdateFile('app.js', firstPart + additionalLine + secondPart);

console.log(`All done.`);