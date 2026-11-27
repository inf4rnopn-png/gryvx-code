import {app,BrowserWindow,dialog,ipcMain} from "electron";
import path from "node:path";
import fs from "node:fs/promises";

let workspaceRoot:string|null=null;
function insideWorkspace(target:string){
  if(!workspaceRoot) throw new Error("Open a workspace first.");
  const resolved=path.resolve(workspaceRoot,target);
  const relative=path.relative(workspaceRoot,resolved);
  if(relative.startsWith("..")||path.isAbsolute(relative)) throw new Error("That path is outside the selected workspace.");
  return resolved;
}
async function createWindow(){
  const win=new BrowserWindow({width:1500,height:940,minWidth:1050,minHeight:680,backgroundColor:"#101116",
    title:"GryvX Code",webPreferences:{preload:path.join(__dirname,"preload.js"),contextIsolation:true,nodeIntegration:false,sandbox:true}});
  if(app.isPackaged) await win.loadFile(path.join(__dirname,"../dist/index.html"));
  else await win.loadURL("http://localhost:5173");
}
app.whenReady().then(()=>{
  ipcMain.handle("workspace:open",async()=>{
    const result=await dialog.showOpenDialog({properties:["openDirectory"]});
    if(result.canceled||!result.filePaths[0]) return null;
    workspaceRoot=path.resolve(result.filePaths[0]); return workspaceRoot;
  });
  ipcMain.handle("workspace:list",async()=>{
    if(!workspaceRoot) return [];
    async function walk(dir:string,depth:number):Promise<Array<{name:string;relativePath:string;directory:boolean}>>{
      if(depth>5) return [];
      const rows=await fs.readdir(dir,{withFileTypes:true});
      const output:Array<{name:string;relativePath:string;directory:boolean}>=[];
      for(const row of rows.sort((a,b)=>Number(b.isDirectory())-Number(a.isDirectory())||a.name.localeCompare(b.name))){
        if(row.name.startsWith(".")||["node_modules","dist","dist-electron","release",".git"].includes(row.name)) continue;
        const absolute=path.join(dir,row.name),relativePath=path.relative(workspaceRoot!,absolute);
        output.push({name:row.name,relativePath,directory:row.isDirectory()});
        if(row.isDirectory()) output.push(...await walk(absolute,depth+1));
      }
      return output;
    }
    return walk(workspaceRoot,0);
  });
  ipcMain.handle("workspace:read",async(_event,relativePath:string)=>{
    const target=insideWorkspace(relativePath); const stat=await fs.stat(target);
    if(!stat.isFile()||stat.size>2_000_000) throw new Error("Only files up to 2 MB can be opened in this version.");
    return await fs.readFile(target,"utf8");
  });
  ipcMain.handle("workspace:save",async(_event,relativePath:string,content:string)=>{
    const target=insideWorkspace(relativePath);
    const stat=await fs.stat(target);
    if(!stat.isFile()) throw new Error("Target is not a file.");
    await fs.writeFile(target,content,"utf8"); return true;
  });
  ipcMain.handle("workspace:create",async(_event,relativePath:string)=>{
    const target=insideWorkspace(relativePath);
    await fs.mkdir(path.dirname(target),{recursive:true});
    await fs.writeFile(target,"","utf8"); return true;
  });
  createWindow();
  app.on("activate",()=>{if(BrowserWindow.getAllWindows().length===0) void createWindow();});
});
app.on("window-all-closed",()=>{if(process.platform!=="darwin")app.quit();});
