const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const path = require('path');
const utilities = require('./utilities');

// generates a file using hex characters from a file. breaks source down into groups of characters, rebuilds based on number of those groups. 
// i.e., can break a file down into sets of 2 characters, then rebuild with 100 random sets

// node generateFile glitchtest-wav.wavchars.txt -s=2 -f=w -w=100 
    // use the glitchtest-wav.wav file, file gouped into 2 letter chunks, 100 randomly selected chunks thrown into new file

function fileRead(file) {
    return readFile(file, 'utf8')
}

[nodePath, filePath, readFileName, ...args] = process.argv;

fileRead(path.join('inputs/', readFileName)).then(data => {
    let formatType;
    let readFileNameNoExt = readFileName.slice(0,readFileName.length-4);
    let whileLimit = 100 // for the while loop later
    let bufIndexSize = 2;
    let remixedData = ""    
    let bufArray = []

    args.forEach(arg => {
        let prefix = arg.trim().slice(0,2);
        let postfix = arg.trim().slice(3);
        if (prefix == "-f") {
            formatType = postfix
        }
        if (prefix == "-s") {
            bufIndexSize = parseInt(postfix);  
        }
        if (prefix == "-w" ) {
            whileLimit = parseInt(postfix);
        }
    });

    if (formatType = "wav" || "w") { // taking off the head
        body = data.slice(45,data.length)
    } else { // space for other options. defaults to wav for now
        body = data.slice(45,data.length)
    }

    const buf = Buffer.from(body, 'utf-8')
    let bufStr = buf.toString('hex');

    for ( let bufIndex = 0; bufIndex < bufStr.length; bufIndex += bufIndexSize) {
        let bufSlice = bufStr.slice(bufIndex, bufIndex + bufIndexSize);
        bufArray.push(bufSlice)
    }
    const bufSetArray = [...new Set(bufArray)];

    let i = 0
    while (i < whileLimit) {
        let randomIndex = utilities.getRandomIntInclusive(0,bufSetArray.length-1)
        // let randomIndex = utilities.getRandomIntInclusive(0,)
        remixedData += bufSetArray[randomIndex]
        i++
    }

    let versionName = utilities.nameVersion(readFileNameNoExt)

    fs.writeFile("inputs/" + readFileNameNoExt + versionName + ".txt", remixedData, (err) => {
        if (err) console.log(err);
        else console.log('The file has been saved!');
    });

})