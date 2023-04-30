var _a = require("electron"), contextBridge = _a.contextBridge, ipcRenderer = _a.ipcRenderer;
contextBridge.exposeInMainWorld("versions", {
    node: function () { return process.versions.node; },
    chrome: function () { return process.versions.chrome; },
    electron: function () { return process.versions.electron; },
    // for render process to invoke
    ping: function () { return ipcRenderer.invoke("ping"); },
    // we can also expose variables, not just functions
});
contextBridge.exposeInMainWorld("darkMode", {
    toggle: function () { return ipcRenderer.invoke("dark-mode:toggle"); },
    system: function () { return ipcRenderer.invoke("dark-mode:system"); },
});
