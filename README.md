# GryvX Code 0.3

## What's new
- Editable Monaco editor tabs.
- Save active file with Ctrl+S / Cmd+S.
- New file creation inside the selected workspace.
- Unsaved-change indicators.
- Review unsaved changes in a preview before saving.
- Workspace path validation in Electron main process.
- File size limit of 2 MB for opening files.
- Hidden folders, `.git`, `node_modules`, and build output excluded from explorer.

## Not yet included
The terminal panel is still a preview, not a shell. There is no AI/Groq API connection, autonomous agent, Git integration, or test runner yet. The assistant panel does not execute prompts.

## Run
```bash
npm install
npm run typecheck
npm run dev
```

## Build
```bash
npm run build
npm run dist
```

## Safety
- Renderer has no direct Node.js access.
- File reads and writes are handled by Electron main process.
- Paths are restricted to the selected workspace.
- AI edits are not applied automatically; AI integration is not enabled in this release.
