const cluster = require("cluster");
const os = require("os");

cluster.setupMaster({
    exec: __dirname + "/index.js",
});

for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
}

cluster.on("exit", (worker) => {
    console.log(worker);
    cluster.fork();
});
