const fsModule = require("fs");

const inputPath = "/Users/ekkuleivonen/aspartame-code/week05/fun-with-fs/files";

//Part1
logSizes(inputPath);

function logSizes(inputPath) {
    fsModule.readdir(inputPath, { withFileTypes: true }, (err1, files) => {
        if (err1) console.log(err1);
        else {
            files.forEach((file) => {
                fsModule.stat(inputPath + "/" + file.name, (err2, stats) => {
                    if (err2) console.log(err2);
                    else {
                        if (file.name.includes(".DS_Store")) return;
                        if (stats.isFile()) {
                            console.log(
                                inputPath +
                                    "/" +
                                    file.name +
                                    ": " +
                                    stats.size +
                                    " bytes"
                            );
                        } else {
                            logSizes(inputPath + "/" + file.name);
                        }
                    }
                });
            });
        }
    });
}

//Part2
console.log(mapSizes(inputPath));
function mapSizes(inputPath) {
    let contents = fsModule.readdirSync(inputPath, { withFileTypes: true });
    const obj = {};
    contents.forEach(function (item) {
        const nextPath = inputPath + "/" + item.name;
        if (!item.name.includes(".DS_Store")) {
            if (item.isFile()) {
                const size = fsModule.statSync(nextPath).size;
                obj[item.name] = size;
                //if the target is a file --> set target name to property and value to item size (statSync)
            } else {
                obj[item.name] = mapSizes(nextPath);
                //if the target is a dir --> set name to name to property and value to an object within it (by calling mapSizes)
            }
        }
    });
    return obj;
}

fsModule.writeFileSync(
    "filesObj.json",
    JSON.stringify(mapSizes(__dirname + "/files"), null, 4)
);
