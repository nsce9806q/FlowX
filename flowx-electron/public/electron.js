const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { saveDialog } = require("./ipcFunctions");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 763,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
    });
    if (process.env.NODE_ENV === "development") {
        console.log("dev");
        win.loadURL("http://localhost:3000");
        win.webContents.openDevTools();
    } else {
        win.loadFile(
            `${path.join(__dirname, "../build/index.html")}`
        );
    }
};

app.whenReady().then(() => {
    createWindow();
    ipcMain.on("save-dialog", saveDialog);

});

app.on("window-all-closed", () => {
    app.quit();
});
