# GryvX Code 0.1

Cross-platform desktop foundation for GryvX Code by GryvX AI.

## Included
- Electron + React + TypeScript + Vite
- Monaco editor
- Three-panel coding workspace UI
- Workspace folder picker and top-level file listing
- Terminal panel preview with Ctrl+T / Cmd+T shortcut
- Electron Builder targets for Windows, macOS and Linux
- GitHub Actions CI matrix for all three operating systems

## Not included yet
The AI agent, Groq API requests, real terminal process execution, file editing/saving, and Git operations are future milestones. The assistant panel is a preview. Do not enter API keys into it.

## Requirements
Node.js 20+ and npm.

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

Platform targets:
```bash
npm run dist:win
npm run dist:mac
npm run dist:linux
```

Build native installers on their target operating system where practical. macOS signing/notarization requires Apple credentials.

## Codespaces
Use Codespaces for editing and CI checks. Electron GUI display may not be available in a standard browser Codespace session.

## Security
- Electron context isolation and sandbox enabled
- Renderer has no direct Node.js access
- No API keys included
- Groq integration will use a secure main-process boundary in a later milestone
