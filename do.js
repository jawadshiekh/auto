const fs = require("fs");
const ejs = require("ejs");
const pluralize = require('pluralize');

const capitalize = require("./utility/capitalize");
const createOrUpdateFile = require("./utility/createOrUpdateFile");

const entityName = process.argv[2];

const directories = ['route', 'controller', 'service', 'validation'];

const validations = ['create', 'update'];

const stringToSearch = [
    ".routes\");",
    ");"
];

const contentToAdd = [
    `\nconst ${entityName}Routes = require("./routes/${entityName}/${entityName}.routes");`, 
    `\napp.use("/api/${entityName}", ${entityName}Routes);\n`
]

directories.forEach(directory => {
    if (directory === 'validation') {

        validations.forEach(validation =>{

            const starterTemplate = fs.readFileSync(`template/${validation}${capitalize(directory)}.template.ejs`, 'utf8');
            const template = ejs.render(starterTemplate, { entityName, capitalize, plural: pluralize.plural });
    
            createOrUpdateFile(
                `${directory}s/${pluralize.plural(entityName)}/${validation}.${directory}.js`, template
            );
        })
        
    } else {

        const starterTemplate = fs.readFileSync(`template/${directory}.template.ejs`, 'utf8');
        const template = ejs.render(starterTemplate, { entityName, capitalize, plural: pluralize.plural });
        
        createOrUpdateFile(
            `${directory}s/${entityName}/${entityName}.${directory === 'route' ? directory + 's' : directory}.js`, template
        );
    }

    console.log(`${entityName} ${directory}s created successfully.`);
});

stringToSearch.forEach((string,index) => {

    var appJs = fs.readFileSync(`app.js`, 'utf8');
    var lastIndex = appJs.lastIndexOf(string);
    var firstPart = appJs.substring(0, lastIndex) + string;
    var secondPart = appJs.substring(lastIndex + string.length);
    var additionalLine = contentToAdd[index]

    createOrUpdateFile('app.js', firstPart + additionalLine + secondPart);
})

// var find1 = ".routes\");";
// var appJs = fs.readFileSync(`app.js`, 'utf8');
// var lastIndex = appJs.lastIndexOf(find1);
// var firstPart = appJs.substring(0, lastIndex) + find1;
// var secondPart = appJs.substring(lastIndex + find1.length);
// var additionalLine = `\nconst ${entityName}Routes = require("./routes/${entityName}/${entityName}.routes");`

// createOrUpdateFile('app.js', firstPart + additionalLine + secondPart);

// var find2 = ");"
// var appJs = fs.readFileSync(`app.js`, 'utf8');
// var lastIndex = appJs.lastIndexOf(find2);
// var firstPart = appJs.substring(0, lastIndex) + find2;
// var secondPart = appJs.substring(lastIndex + find2.length);
// var additionalLine = `\napp.use("/api/${entityName}", ${entityName}Routes);\n`

// createOrUpdateFile('app.js', firstPart + additionalLine + secondPart);

var find3 = "{";
var responsesFile = fs.readFileSync(`constants/responses.js`, 'utf8');
console.log(responsesFile)
var index = responsesFile.indexOf(find3);
console.log(index)
var firstPart = responsesFile.substring(0, index) + find3;
var secondPart = responsesFile.substring(index + find3.length);
var additionalLine =
    `\n\t${entityName.toUpperCase()}_RESPONSES: {
    CREATE_SUCCESS: "${capitalize(entityName)} created successfully.",
    UPDATE_SUCCESS: "${capitalize(entityName)} updated successfully.",
    DELETE_SUCCESS: "${capitalize(entityName)} deleted successfully.",
    NOT_FOUND: "${capitalize(entityName)} not found."
\t},`;

createOrUpdateFile('constants/responses.js', firstPart + additionalLine + secondPart);

console.log(`All done.`);