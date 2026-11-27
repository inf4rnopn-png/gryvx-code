import {contextBridge,ipcRenderer} from "electron";
contextBridge.exposeInMainWorld("gryvx",{
  openWorkspace:():Promise<string|null>=>ipcRenderer.invoke("workspace:open"),
  listWorkspace:():Promise<{name:string;relativePath:string;directory:boolean}[]>=>ipcRenderer.invoke("workspace:list"),
  readFile:(relativePath:string):Promise<string>=>ipcRenderer.invoke("workspace:read",relativePath),
  saveFile:(relativePath:string,content:string):Promise<boolean>=>ipcRenderer.invoke("workspace:save",relativePath,content),
  createFile:(relativePath:string):Promise<boolean>=>ipcRenderer.invoke("workspace:create",relativePath)
});
