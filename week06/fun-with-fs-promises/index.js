const { readdir, stat } = require("fs").promises;

const inputPath = "/Users/ekkuleivonen/aspartame-code/week05/fun-with-fs/files";

//Part1
logSizes(inputPath);

function logSizes(inputPath) {
    readdir(inputPath, { withFileTypes: true })
        .then((files) => {
            files.forEach((file) => {
                stat(`${inputPath}/${file.name}`)
                    .then((itemData) => {
                        if (file.name.includes(".DS_Store")) return;
                        if (itemData.isFile()) {
                            console.log(
                                inputPath +
                                    "/" +
                                    file.name +
                                    ": " +
                                    itemData.size +
                                    " bytes"
                            );
                        } else {
                            logSizes(`${inputPath}/${file.name}`);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
        })
        .catch((error) => {
            console.log(error);
        });
}
