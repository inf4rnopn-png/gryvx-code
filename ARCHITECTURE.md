# Architecture and roadmap

0.1: Electron shell, React UI, Monaco editor, workspace picker.
0.2: Refine the Codex-style agent workspace.
0.3: Safe file open/edit/save, tabs and diffs.
0.4: Real integrated terminal with user-controlled command execution.
0.5: Groq API integration, model selection, streaming and rate-limit handling.
0.6: Project indexing and context selection.
0.7: Agent planning and task execution.
0.8: Diff review, approval, rejection and rollback.
0.9: Git and test workflows.
1.0: Verified stable builds for Windows, macOS and Linux.

Security rules:
- Never expose API secrets to the renderer.
- Scope file access to the selected workspace.
- Show diffs before applying AI edits.
- Require user approval before commands and destructive actions.
