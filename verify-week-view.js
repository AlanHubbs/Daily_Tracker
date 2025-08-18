#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying 5-Day Week View Implementation\n');
console.log('=' .repeat(50) + '\n');

// Read the index.html file
const indexPath = path.join(__dirname, 'index.html');
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Issues found
const issues = [];
const warnings = [];
const successes = [];

// Check 1: Verify getStartOfWeek function exists
console.log('Checking helper functions...');
if (!indexContent.includes('function getStartOfWeek')) {
    issues.push('Missing getStartOfWeek function definition');
} else {
    // Check if it correctly gets Monday
    const funcMatch = indexContent.match(/function getStartOfWeek[\s\S]*?return[^}]+}/);
    if (funcMatch && funcMatch[0].includes('getDay() === 0 ? 6 : date.getDay() - 1')) {
        successes.push('getStartOfWeek correctly calculates Monday as start of week');
    } else {
        warnings.push('getStartOfWeek might not correctly identify Monday as week start');
    }
}

// Check 2: Verify renderWeekView replaces renderTasks everywhere
console.log('Checking function replacements...');
const renderTasksCalls = (indexContent.match(/renderTasks\(\)/g) || []).length;
const renderWeekViewCalls = (indexContent.match(/renderWeekView\(\)/g) || []).length;

if (renderTasksCalls > 0) {
    issues.push(`Found ${renderTasksCalls} remaining calls to renderTasks() that should be renderWeekView()`);
} else {
    successes.push('All renderTasks() calls properly replaced with renderWeekView()');
}

// Check 3: Verify drag and drop setup
console.log('Checking drag and drop implementation...');
if (indexContent.includes('dataset.date') && indexContent.includes('task-list-column')) {
    if (indexContent.includes('column.addEventListener(\'dragover\'')) {
        successes.push('Drag and drop properly configured for columns');
    } else {
        warnings.push('Drag event listeners might not be properly attached to columns');
    }
} else {
    issues.push('Missing drag and drop configuration for week columns');
}

// Check 4: Check for date handling
console.log('Checking date handling...');
if (indexContent.includes('dateAssigned')) {
    const dateAssignedCount = (indexContent.match(/dateAssigned/g) || []).length;
    successes.push(`Found ${dateAssignedCount} references to dateAssigned property`);
    
    // Check if tasks are filtered by date for each column
    if (indexContent.includes('filter(t => t.dateAssigned === dateStr)')) {
        successes.push('Tasks are properly filtered by date for each column');
    } else {
        warnings.push('Task filtering by date might not be implemented correctly');
    }
} else {
    issues.push('Missing dateAssigned property handling');
}

// Check 5: Verify week navigation
console.log('Checking week navigation...');
if (indexContent.includes('prevWeekBtn') && indexContent.includes('nextWeekBtn')) {
    if (indexContent.includes('currentWeekStartDate.setDate')) {
        successes.push('Week navigation buttons properly update the current week');
    } else {
        warnings.push('Week navigation might not update dates correctly');
    }
} else {
    issues.push('Missing week navigation button handlers');
}

// Check 6: Check responsive design
console.log('Checking responsive design...');
if (indexContent.includes('@media') && indexContent.includes('grid-template-columns: 1fr')) {
    successes.push('Responsive design implemented for mobile view');
} else {
    warnings.push('Responsive design for mobile might be missing');
}

// Check 7: Verify currentWeekStartDate initialization
console.log('Checking initialization...');
if (indexContent.includes('currentWeekStartDate')) {
    if (indexContent.includes('AppState.currentWeekStartDate = getStartOfWeek')) {
        successes.push('currentWeekStartDate properly initialized on app start');
    } else {
        issues.push('currentWeekStartDate might not be initialized correctly');
    }
} else {
    issues.push('Missing currentWeekStartDate in AppState');
}

// Check 8: Look for TODO comments or known issues
const todoMatches = indexContent.match(/\/\/\s*TODO.*week/gi) || [];
const fixmeMatches = indexContent.match(/\/\/\s*FIXME.*week/gi) || [];
if (todoMatches.length > 0 || fixmeMatches.length > 0) {
    warnings.push(`Found ${todoMatches.length + fixmeMatches.length} TODO/FIXME comments related to week view`);
}

// Check 9: Verify CSS classes exist
console.log('Checking CSS styles...');
const requiredClasses = ['week-grid', 'week-day-column', 'week-day-header', 'task-list-column', 'week-nav-btn'];
requiredClasses.forEach(className => {
    if (!indexContent.includes(`.${className}`)) {
        issues.push(`Missing CSS for .${className}`);
    }
});

// Check 10: Check for potential bugs
console.log('Checking for potential bugs...');

// Check if empty state is handled
if (!indexContent.includes('No tasks') || !indexContent.includes('empty')) {
    warnings.push('Empty state for days with no tasks might not be handled');
}

// Check if date format is consistent
if (indexContent.includes('toISOString().split(\'T\')[0]')) {
    successes.push('Consistent date formatting using ISO format');
} else {
    warnings.push('Date formatting might be inconsistent');
}

// Summary
console.log('\n' + '=' .repeat(50));
console.log('VERIFICATION SUMMARY\n');

if (successes.length > 0) {
    console.log('✅ SUCCESSES (' + successes.length + ')');
    successes.forEach(s => console.log('  • ' + s));
    console.log();
}

if (warnings.length > 0) {
    console.log('⚠️  WARNINGS (' + warnings.length + ')');
    warnings.forEach(w => console.log('  • ' + w));
    console.log();
}

if (issues.length > 0) {
    console.log('❌ ISSUES (' + issues.length + ')');
    issues.forEach(i => console.log('  • ' + i));
    console.log();
}

// Final verdict
console.log('=' .repeat(50));
if (issues.length === 0) {
    console.log('✅ Week view implementation appears to be complete!');
    console.log('   Minor warnings can be addressed but are not blocking.\n');
    process.exit(0);
} else {
    console.log('❌ Found ' + issues.length + ' issue(s) that need to be fixed.');
    console.log('   Please address these before merging.\n');
    process.exit(1);
}