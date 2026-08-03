# 📝 Capstone To-Do App

A clean, responsive to-do list app built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools. Add, search, filter, sort, and track tasks, with everything saved locally in your browser.

## Features

- ➕ **Add tasks** – type a task and hit "Add" or press Enter
- ✅ **Mark complete** – check off tasks as done (with strikethrough styling)
- 🗑️ **Delete tasks** – remove tasks individually
- 🔍 **Search** – filter tasks live by text
- ↕️ **Sort** – newest first or oldest first
- 🧰 **Filter** – view All, Pending, or Completed tasks
- 📊 **Stats dashboard** – live counts of total, completed, and pending tasks
- 📈 **Progress bar** – visual completion percentage
- 🧹 **Clear completed** – bulk-remove all completed tasks
- 💾 **Persistent storage** – tasks are saved to `localStorage`, so they survive a page refresh
- 📱 **Responsive design** – adapts layout for smaller screens

## Tech Stack

- HTML5
- CSS3 (glassmorphism-style UI, CSS Grid/Flexbox, media queries)
- Vanilla JavaScript (DOM manipulation, `localStorage`, no dependencies)

## Project Structure

```
capstone-todo-app/
├── index.html    # App markup/structure
├── style.css     # Styling and responsive layout
└── script.js     # App logic (add, delete, filter, sort, search, stats, storage)
```

## Getting Started

No build step or installation required.

1. Download/clone the three files (`index.html`, `style.css`, `script.js`) into the same folder.
2. Open `index.html` directly in your browser — or serve it with a simple local server, e.g.:

   ```bash
   npx serve .
   ```

That's it — the app runs entirely client-side.

## How It Works

- Tasks are stored as objects (`id`, `text`, `completed`, `date`) in an array, persisted to `localStorage` under the `tasks` key.
- The task list is re-rendered on every change (add, delete, toggle, search, sort, filter) by filtering/sorting the in-memory array and rebuilding the DOM.
- Stats (total/completed/pending) and the progress bar are recalculated on every render.

## Notes

- Data is stored only in the browser's `localStorage` on the device/browser you use — it won't sync across devices or browsers.
- Clearing browser storage/cache will remove saved tasks.
