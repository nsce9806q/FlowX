const { dialog } = require("electron");
const java = require("java");
java.classpath.push("../../runtime-java/build/libs/runtime-java-1.0-SNAPSHOT.jar");
const fs = require("fs");

module.exports = { 
    saveDialog: (event,contents) => {
        const options = {
            title: "Save Flow",
            filters: [
                {
                    name: "FlowX",
                    extensions: ["json"],
                },
            ],
        };
        dialog.showSaveDialog(options).then((file) => {
            event.sender.send("saved-file", file);
        });
    },
    runFlow: (event,{functions,types,csvPath}) => {
        const runtime = java.import("org.flowxlang.runtime.Main");
        console.log(runtime.runtimeSync());
        //fs.writeFile(path.filePath, JSON.stringify(file), (err) => {});
    }
};