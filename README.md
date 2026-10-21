# Code Video Studio

A polished web app for turning code into short, cinematic videos in the browser.

## Features
- Paste or upload code
- Auto-split large files into scenes
- Highlight syntax for modern languages
- Set scene count, duration and color theme
- Animate through the code in a preview panel
- Record a short video directly in the browser and download it as WebM
- Works well for code walkthroughs, feature demos, and technical explainers

## Stack
- Next.js + TypeScript
- Tailwind CSS
- Prism.js for syntax highlighting
- MediaRecorder + captureStream for browser-based export

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Notes
This app is optimized for short videos (roughly 10–40 seconds), with best results when you focus on a few relevant code sections rather than every line of a huge file.
