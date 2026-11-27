"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("gryvx", {
    openWorkspace: () => electron_1.ipcRenderer.invoke("workspace:open"),
    listWorkspace: () => electron_1.ipcRenderer.invoke("workspace:list"),
    readFile: (relativePath) => electron_1.ipcRenderer.invoke("workspace:read", relativePath),
    saveFile: (relativePath, content) => electron_1.ipcRenderer.invoke("workspace:save", relativePath, content),
    createFile: (relativePath) => electron_1.ipcRenderer.invoke("workspace:create", relativePath)
});
