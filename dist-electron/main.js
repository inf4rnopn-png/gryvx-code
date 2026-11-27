"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const node_path_1 = __importDefault(require("node:path"));
const promises_1 = __importDefault(require("node:fs/promises"));
let workspaceRoot = null;
function insideWorkspace(target) {
    if (!workspaceRoot)
        throw new Error("Open a workspace first.");
    const resolved = node_path_1.default.resolve(workspaceRoot, target);
    const relative = node_path_1.default.relative(workspaceRoot, resolved);
    if (relative.startsWith("..") || node_path_1.default.isAbsolute(relative))
        throw new Error("That path is outside the selected workspace.");
    return resolved;
}
async function createWindow() {
    const win = new electron_1.BrowserWindow({ width: 1500, height: 940, minWidth: 1050, minHeight: 680, backgroundColor: "#101116",
        title: "GryvX Code", webPreferences: { preload: node_path_1.default.join(__dirname, "preload.js"), contextIsolation: true, nodeIntegration: false, sandbox: true } });
    if (electron_1.app.isPackaged)
        await win.loadFile(node_path_1.default.join(__dirname, "../dist/index.html"));
    else
        await win.loadURL("http://localhost:5173");
}
electron_1.app.whenReady().then(() => {
    electron_1.ipcMain.handle("workspace:open", async () => {
        const result = await electron_1.dialog.showOpenDialog({ properties: ["openDirectory"] });
        if (result.canceled || !result.filePaths[0])
            return null;
        workspaceRoot = node_path_1.default.resolve(result.filePaths[0]);
        return workspaceRoot;
    });
    electron_1.ipcMain.handle("workspace:list", async () => {
        if (!workspaceRoot)
            return [];
        async function walk(dir, depth) {
            if (depth > 5)
                return [];
            const rows = await promises_1.default.readdir(dir, { withFileTypes: true });
            const output = [];
            for (const row of rows.sort((a, b) => Number(b.isDirectory()) - Number(a.isDirectory()) || a.name.localeCompare(b.name))) {
                if (row.name.startsWith(".") || ["node_modules", "dist", "dist-electron", "release", ".git"].includes(row.name))
                    continue;
                const absolute = node_path_1.default.join(dir, row.name), relativePath = node_path_1.default.relative(workspaceRoot, absolute);
                output.push({ name: row.name, relativePath, directory: row.isDirectory() });
                if (row.isDirectory())
                    output.push(...await walk(absolute, depth + 1));
            }
            return output;
        }
        return walk(workspaceRoot, 0);
    });
    electron_1.ipcMain.handle("workspace:read", async (_event, relativePath) => {
        const target = insideWorkspace(relativePath);
        const stat = await promises_1.default.stat(target);
        if (!stat.isFile() || stat.size > 2_000_000)
            throw new Error("Only files up to 2 MB can be opened in this version.");
        return await promises_1.default.readFile(target, "utf8");
    });
    electron_1.ipcMain.handle("workspace:save", async (_event, relativePath, content) => {
        const target = insideWorkspace(relativePath);
        const stat = await promises_1.default.stat(target);
        if (!stat.isFile())
            throw new Error("Target is not a file.");
        await promises_1.default.writeFile(target, content, "utf8");
        return true;
    });
    electron_1.ipcMain.handle("workspace:create", async (_event, relativePath) => {
        const target = insideWorkspace(relativePath);
        await promises_1.default.mkdir(node_path_1.default.dirname(target), { recursive: true });
        await promises_1.default.writeFile(target, "", "utf8");
        return true;
    });
    createWindow();
    electron_1.app.on("activate", () => { if (electron_1.BrowserWindow.getAllWindows().length === 0)
        void createWindow(); });
});
electron_1.app.on("window-all-closed", () => { if (process.platform !== "darwin")
    electron_1.app.quit(); });
