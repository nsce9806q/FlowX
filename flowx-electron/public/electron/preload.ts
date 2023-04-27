const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    // for render process to invoke
    ping: () => ipcRenderer.invoke("ping"),
    // we can also expose variables, not just functions
});
