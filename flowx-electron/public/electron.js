const { app, BrowserWindow } = require("electron");
const { path } = require("path");

app.whenReady().then(() => {
    const win = new BrowserWindow({ width: 1000, height: 763 });
    // win.removeMenu();
    if (process.env.NODE_ENV === "development") {
        console.log("dev");
        win.loadURL("http://localhost:3000");
        win.webContents.openDevTools();
    } else {
        win.loadFile(
            `${path.join(__dirname, "../build/index.html")}`
        );
    }
});

app.on("window-all-closed", () => {
    app.quit();
});