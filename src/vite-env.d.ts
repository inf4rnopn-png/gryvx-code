/// <reference types="vite/client" />
interface Window { gryvx?: { openWorkspace: () => Promise<string|null>; listWorkspace: (folder:string) => Promise<{name:string;directory:boolean}[]> } }
