"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("versions", {
    node: function () { return process.versions.node; },
    chrome: function () { return process.versions.chrome; },
    electron: function () { return process.versions.electron; },
    // for render process to invoke
    ping: function () { return electron_1.ipcRenderer.invoke("ping"); },
    // we can also expose variables, not just functions
});
electron_1.contextBridge.exposeInMainWorld("darkMode", {
    toggle: function () { return electron_1.ipcRenderer.invoke("dark-mode:toggle"); },
    system: function () { return electron_1.ipcRenderer.invoke("dark-mode:system"); },
});
