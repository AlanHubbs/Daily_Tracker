# Daily_Tracker – Specification & Build Brief

## Overview
**Daily_Tracker** is a single-file **HTML/CSS/JavaScript** application that runs fully offline and installs as a **PWA** (Spotlight-launchable on macOS).  
It uses **localStorage** for persistence and requires no server or build step.

---

## Core UX & Data

### Today List
- Create, edit, delete, **check off**, and **drag-and-drop reorder** (mouse + touch).
- **Completion behavior**: checked tasks **stay visible** and **snap to the bottom of the day's pane** in both **Added→Priority** and **Manual** views.

### Sorting
- Default: **Added time/date → Priority** (low < med < high).
- Toggleable **Manual (drag)** view with last view preference saved.

### Priority
- Default: **Low**.
- Per-task **dropdown** selector.
- **Mouse-wheel cycling** (Low → Med → High) on hover over the priority badge.

### Task Groups (Templates)
- Create reusable templates.
- Insert entire template into Today (tasks cloned as independent items).

### Recurrence
- Options: **Daily**, **Weekdays**, **Specific weekdays**, **Monthly-by-date**.
- Auto-add applicable tasks as independent instances.

### History & Analytics
- Timezone: **MST**, week starts **Monday**.
- **Count by completion day**.
- Views: **Day / Week / Month** with totals, completion rate, per-group stats.
- **Streaks**: +1 streak for every **3 tasks completed** per day (another +1 for each additional block of 3).

### Search & Filters
- Search: text.
- Filters: status (open/done), group, date range, **priority**.

### Notifications (PWA)
- Opt-in local notifications for **open tasks** at:
  - **8:30 AM** – Plan
  - **12:00 PM** – Midday check-in
  - **3:00 PM** – Wrap-up

### Data Management
- **Import/export JSON** (default filename: `daily_tracker_export_YYYY-MM-DD.json`).
- **Import behavior**: **Merge** with existing data (do not wipe).
- Clear/reset all data.
- Seed demo data toggle.

---

## Styling & Theme

### Visual Style
- **Sleek modern HUD** gaming theme:
  - Progress **XP bar**.
  - Streak **combo** meter.
  - **Confetti** on completion (light).
  - **Celebration mode** for milestones: 7-day streak, perfect week, 30-day streak.

### Sounds
- **Level-up sound** enabled by default at **40% volume**.
- Global mute toggle + volume slider.

### Privacy
- **Privacy mode**: blur/hide task titles for screen-sharing.

### Accessibility
- Responsive (desktop & mobile).
- **Light theme by default** with **dark mode** toggle.
- Accessible focus states, ARIA roles, full keyboard navigation.

---

## Keyboard Shortcuts
- `N` → New task
- `G` → Add group template
- `Cmd/Ctrl+K` → Quick add
- `Enter` → Toggle complete
- `Alt/Option+↑/↓` → Reorder (Manual view)
- `/` → Focus search

---

## Data Model (localStorage)

**Task**
```json
{
  "id": "uuid",
  "title": "string",
  "notes": "string | null",
  "priority": "low | med | high",  // default: low
  "createdAt": "timestamp",
  "completedAt": "timestamp | null",
  "orderIndex": "number",
  "groupId": "string | null",
  "dateAssigned": "date string"
}
```

**GroupTemplate**
```json
{
  "id": "uuid",
  "name": "string",
  "tasks": []
}
```

**RecurrenceRule**
```json
{
  "id": "uuid",
  "name": "string",
  "pattern": "object",
  "enabled": true
}
```

---

## PWA & Install
- **Manifest**:
  - Name: Daily_Tracker
  - Default gaming-style icon set
- Service worker for offline caching.
- Installable via browser → runs standalone → Spotlight searchable.

---

## Archiving & Backups
- History kept indefinitely.
- Manual archive: move selected date ranges into a separate exportable JSON.
- Monthly backup nudge ("Export a backup") → on by default, toggleable.

---

## Nice-to-haves
- Print/PDF daily checklist.
- Achievements (7-day streak, perfect week).
- CSS variables for quick palette tweaks.

---

## Deliverables
- **index.html**:
  - All HTML/CSS/JS inline or linked.
  - Embedded/linked manifest + service worker.
  - Clean, commented code.
  - Small modules via IIFE/ES modules.
  - Inline README in top comment with:
    - Schema
    - Shortcuts
    - PWA install & notifications
    - MST/week-start settings