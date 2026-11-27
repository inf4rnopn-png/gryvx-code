/// <reference types="vite/client" />
interface Window { gryvx?: {
 openWorkspace:()=>Promise<string|null>;
 listWorkspace:()=>Promise<{name:string;relativePath:string;directory:boolean}[]>;
 readFile:(relativePath:string)=>Promise<string>;
 saveFile:(relativePath:string,content:string)=>Promise<boolean>;
 createFile:(relativePath:string)=>Promise<boolean>;
}}
