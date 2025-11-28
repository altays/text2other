const fs = require('fs');
const util = require('util');
const format = require('./fileFormats');
const utilities = require('./utilities');
const readFile = util.promisify(fs.readFile);
const path = require('path');

function fileRead(file) {
    return readFile(file, 'utf8')
}

let formatType, bentFileName, glitchData, parseType;
[nodePath, filePath, readFileName, outputFileName, ...args] = process.argv;

fileRead(path.join("inputs/",readFileName)).then(data => {
    
    configObj = new Object();
    modData = data;
    parseType = "text"

    args.forEach(arg => {
        let prefix = arg.trim().slice(0,2);
        let postfix = arg.trim().slice(3);
        if (prefix == "-f") {
            formatType = utilities.checkFormatType(postfix);
        }
        if (prefix == "-c") {
            configObj = utilities.checkConfig(postfix);
        }
        if (prefix == "-s") {
            modData = utilities.inputScrambler(data);
        }
        if (prefix == "-t") {
            parseType = utilities.checkInputType(postfix);
        }
    });

    let versionName = utilities.nameVersion(outputFileName)
    bentFileName = `${versionName}.${formatType}`;

    if (parseType == "text") {
        glitchData = format.generateData(modData, formatType, configObj); 
    } else if (parseType == "hex") {
        glitchData = format.generateDataHex(modData, formatType, configObj)
    }   

    fs.writeFile(path.join("outputs/",formatType,"/",bentFileName), glitchData, (err) => {
        if (err) console.log(err);
        console.log('The file has been saved!');
      });
})