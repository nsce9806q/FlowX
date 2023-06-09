const { dialog } = require("electron");
const childProcess = require("child_process");

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
    runFlow: (event,{programPath,csvPath}) => {
        const resultPath = dialog.showSaveDialogSync({
            title: "Save Result",
            filters: [
                {
                    name: "csv",
                    extensions: ["csv"],
                },
            ],
        });
        if(resultPath.canceled) return;
        childProcess.execSync("java -jar ../runtime-java/build/libs/runtime-java-1.0-SNAPSHOT.jar "+programPath+" "+csvPath+" "+resultPath.filePath, { stdio: 'inherit' });
        event.sender.send("run-result","");
        console.log("run result");
    }
};