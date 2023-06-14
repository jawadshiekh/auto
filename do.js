const fs = require("fs");
const ejs = require("ejs");
const pluralize = require('pluralize');

const capitalize = require("./utility/capitalize");
const createOrUpdateFile = require("./utility/createOrUpdateFile");

const entityName = process.argv[2];

const directories = ['route', 'controller', 'service', 'validation'];

const validations = ['create', 'update'];

const folder = ['app.js', 'app.js', 'constants/responses.js'];

const stringToSearch = [
    ".routes\");",
    ");",
    "{"
];

const contentToAdd = [
    `\nconst ${entityName}Routes = require("./routes/${entityName}/${entityName}.routes");`, 
    `\napp.use("/api/${entityName}", ${entityName}Routes);\n`,
    `\n\t${entityName.toUpperCase()}_RESPONSES: {
        CREATE_SUCCESS: "${capitalize(entityName)} created successfully.",
        UPDATE_SUCCESS: "${capitalize(entityName)} updated successfully.",
        DELETE_SUCCESS: "${capitalize(entityName)} deleted successfully.",
        NOT_FOUND: "${capitalize(entityName)} not found."
    \t},`
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

    var appJs = fs.readFileSync(`${folder[index]}`, 'utf8');
    if(index === 2){
        var lastIndex = appJs.indexOf(string);
    } else {
        var lastIndex = appJs.lastIndexOf(string);
    }
    var firstPart = appJs.substring(0, lastIndex) + string;
    var secondPart = appJs.substring(lastIndex + string.length);
    var additionalLine = contentToAdd[index]

    createOrUpdateFile(`${folder[index]}`, firstPart + additionalLine + secondPart);
})

console.log(`All done.`);