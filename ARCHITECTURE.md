# Roadmap
0.1 Electron shell, Monaco and initial workspace UI.
0.2 Project explorer, file reading and multi-tab inspection.
0.3 File editing, save, new file and unsaved-change review.
0.4 Real terminal with explicit user-controlled command execution.
0.5 Groq API integration using secure main-process requests.
0.6 Project indexing and context selection.
0.7 Agent planning and controlled task execution.
0.8 Diff approval, rejection and rollback for agent edits.
0.9 Git and test workflows.
1.0 Stable release and verified platform installers.

## 0.3 security model
- Workspace selection establishes the file access root.
- All file operations resolve and validate paths under that root.
- Opening files over 2 MB is rejected.
- Hidden folders and generated dependency/build directories are excluded from explorer results.
- No shell execution or network/API key handling is present in this milestone.
