# Daily_Tracker Testing Guide

## 🧪 Automated Testing Suite

### Quick Start
1. Open `test-suite.html` in your browser
2. Click "Run All Tests" to execute the full test suite
3. Review results and fix any failures before merging branches

### Test Categories

#### Core Functionality Tests
- **LocalStorage**: Verifies data persistence
- **Task Management**: CRUD operations on tasks
- **XP & Gamification**: Points and streak calculations

#### Feature Branch Tests
These tests detect which features have been merged:
- **Task Editing & Notes**: Edit titles, add notes, manage groups
- **Analytics Dashboard**: Data processing and visualization
- **Import/Export**: JSON data management
- **Notifications**: PWA notification system
- **Achievements**: Gamification achievements

#### UI/UX Tests
- **Responsive Design**: Mobile compatibility
- **Theme Switching**: Light/dark mode
- **Animations**: Confetti and transitions
- **Interactions**: Drag-and-drop, keyboard shortcuts

#### PWA Tests
- **Manifest**: PWA configuration
- **Service Worker**: Offline capability
- **Installation**: App installability

## ✅ Manual Testing Checklist

### Before Each Merge

#### 1. Core Functionality
```
□ Create a new task with each priority level (low/med/high)
□ Mark tasks as complete - verify XP increases
□ Delete a task - verify XP adjusts if task was completed
□ Check that 3 completed tasks = +1 streak
□ Refresh page - verify data persists
□ Clear all tasks and start fresh
```

#### 2. Visual & Interactions
```
□ Drag and drop a task to reorder
□ Switch between Auto Sort and Manual sort modes
□ Verify confetti animation on task completion
□ Test on mobile viewport (responsive design)
□ Press 'N' key to focus new task input
□ Check all hover states and transitions
```

#### 3. After Merging feature/task-editing-notes-groups
```
□ Click on task title to edit inline
□ Press Enter to save, Escape to cancel edit
□ Click notes button (📝) to add/edit notes
□ Create a new group template
□ Add tasks to the group
□ Click group to add all tasks at once
□ Delete a group template
```

#### 4. After Merging feature/analytics-dashboard
```
□ Click analytics button (📊)
□ Switch between Week/Month/All Time views
□ Verify completion rate calculation
□ Check XP totals match actual earned XP
□ Verify streak calculation in analytics
□ Confirm chart renders with correct data
```

#### 5. After Merging feature/data-import-export
```
□ Click export button (📤)
□ Verify JSON file downloads with correct date
□ Open JSON file and verify structure
□ Click import button (📥)
□ Select the exported file
□ Verify data merges (doesn't overwrite)
□ Check that groups are included in export (if merged)
```

#### 6. After Merging feature/notifications
```
□ Click settings button (⚙️)
□ Request notification permission
□ Enable notifications checkbox
□ Create tasks and wait for notification times
□ Verify notifications appear at 8:30 AM, 12 PM, 3 PM
□ Check notification only shows if tasks are open
```

#### 7. After Merging feat/gamification-achievements
```
□ Complete tasks to trigger achievements
□ Verify achievement toast appears
□ Check achievement modal displays unlocked achievements
□ Confirm 7-day streak achievement
□ Test perfect week achievement
□ Verify achievement data persists
```

## 🔄 Testing Workflow

### For Each Branch Merge

1. **Pre-Merge Testing**
   ```bash
   # On main branch
   open test-suite.html
   # Run all tests, note baseline results
   ```

2. **Create Test Branch**
   ```bash
   git checkout -b test/merge-[feature-name]
   git merge origin/feature/[feature-name]
   ```

3. **Post-Merge Testing**
   ```bash
   open test-suite.html
   # Run all tests again
   # Complete manual checklist for the feature
   ```

4. **Fix Issues**
   - Resolve any test failures
   - Fix merge conflicts
   - Update test suite if new features added

5. **Final Verification**
   ```bash
   # Clear browser data
   # Test fresh install experience
   # Test with existing data
   ```

6. **Merge to Main**
   ```bash
   git checkout main
   git merge test/merge-[feature-name]
   git push
   ```

## 🐛 Common Issues & Solutions

### Test Failures

#### "LocalStorage not available"
- Check browser privacy settings
- Disable incognito/private mode
- Clear browser data and retry

#### "Feature not detected"
- Feature may not be merged yet
- Check if feature files are loaded
- Verify merge was successful

#### "Task operations failing"
- Clear localStorage and retry
- Check for data structure changes
- Verify date formatting is correct

### Merge Conflicts

#### Multiple Settings Modals
- Consolidate into single settings panel
- Merge notification settings with other settings

#### Duplicate Functions
- Keep single definition of `getTaskXP()`
- Remove redundant helper functions

#### State Management
- Ensure all AppState properties are included
- Merge settings objects carefully

## 📊 Test Coverage Goals

### Minimum Coverage for Release
- ✅ 100% Core Functionality Tests Pass
- ✅ 90% Feature Tests Pass (for merged features)
- ✅ 100% PWA Tests Pass
- ✅ No Critical UI/UX Issues

### Performance Benchmarks
- Page load: < 1 second
- Task creation: Instant (< 100ms)
- Animation FPS: 60 FPS
- LocalStorage operations: < 50ms

## 🔍 Debugging Tips

### Browser DevTools
```javascript
// Check localStorage data
console.log(JSON.parse(localStorage.getItem('daily_tracker_data')));

// Check settings
console.log(JSON.parse(localStorage.getItem('daily_tracker_settings')));

// Test task creation
const testTask = {
    id: 'debug_' + Date.now(),
    title: 'Debug Task',
    priority: 'high',
    createdAt: Date.now(),
    completedAt: null,
    dateAssigned: new Date().toISOString().split('T')[0]
};
```

### Service Worker Debugging
1. Open Chrome DevTools → Application tab
2. Check Service Workers section
3. Click "Update" to refresh worker
4. Check "Offline" to test offline mode

### PWA Installation Testing
1. Open Chrome → Three dots menu
2. Look for "Install Daily_Tracker..."
3. Check desktop for installed app
4. Test Spotlight search (macOS)

## 📝 Test Reporting

### Report Format
```markdown
## Test Run: [Date]
- Branch: [branch-name]
- Browser: [Chrome/Firefox/Safari]
- OS: [macOS/Windows/Linux]

### Results
- Core Tests: X/Y passed
- Feature Tests: X/Y passed
- UI Tests: X/Y passed
- PWA Tests: X/Y passed

### Issues Found
1. [Issue description]
   - Steps to reproduce
   - Expected vs Actual
   - Fix applied

### Notes
[Any additional observations]
```

## 🚀 Continuous Testing

### After Each Development Session
1. Run automated test suite
2. Check for regressions
3. Update tests for new features
4. Document any new test cases needed

### Before Pull Requests
1. Full test suite must pass
2. Manual checklist completed
3. Cross-browser testing done
4. Mobile testing completed

---

**Remember**: A feature isn't complete until it's tested! 🎯