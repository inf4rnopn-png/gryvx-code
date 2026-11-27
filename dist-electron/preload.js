"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("gryvx", { openWorkspace: () => electron_1.ipcRenderer.invoke("workspace:open"), listWorkspace: (folder) => electron_1.ipcRenderer.invoke("workspace:list") });
