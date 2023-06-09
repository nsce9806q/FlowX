const { dialog } = require("electron");

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
    }
};