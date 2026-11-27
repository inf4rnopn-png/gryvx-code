"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const node_path_1 = __importDefault(require("node:path"));
const promises_1 = __importDefault(require("node:fs/promises"));
function createWindow() { const win = new electron_1.BrowserWindow({ width: 1500, height: 940, minWidth: 1000, minHeight: 650, backgroundColor: "#101116", title: "GryvX Code", webPreferences: { preload: node_path_1.default.join(__dirname, "preload.js"), contextIsolation: true, nodeIntegration: false, sandbox: true } }); if (electron_1.app.isPackaged)
    void win.loadFile(node_path_1.default.join(__dirname, "../dist/index.html"));
else {
    void win.loadURL("http://localhost:5173");
    win.webContents.openDevTools({ mode: "detach" });
} }
electron_1.app.whenReady().then(() => { electron_1.ipcMain.handle("workspace:open", async () => { const r = await electron_1.dialog.showOpenDialog({ properties: ["openDirectory"] }); return r.canceled ? null : r.filePaths[0] ?? null; }); electron_1.ipcMain.handle("workspace:list", async (_e, folder) => { const entries = await promises_1.default.readdir(folder, { withFileTypes: true }); return entries.filter(x => !x.name.startsWith(".") && x.name !== "node_modules").map(x => ({ name: x.name, directory: x.isDirectory() })).sort((a, b) => Number(b.directory) - Number(a.directory) || a.name.localeCompare(b.name)); }); createWindow(); electron_1.app.on("activate", () => { if (electron_1.BrowserWindow.getAllWindows().length === 0)
    createWindow(); }); });
electron_1.app.on("window-all-closed", () => { if (process.platform !== "darwin")
    electron_1.app.quit(); });
