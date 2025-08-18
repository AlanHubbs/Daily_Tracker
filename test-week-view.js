#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('Testing 5-Day Week View Feature\n');
console.log('================================\n');

// Read the index.html file
const indexPath = path.join(__dirname, 'index.html');
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Test 1: Check if week view elements exist
console.log('Test 1: Checking for week view elements...');
const weekViewElements = [
    'task-week-view',
    'week-grid',
    'week-day-column',
    'prevWeekBtn',
    'nextWeekBtn',
    'weekViewTitle',
    'renderWeekView'
];

let passed = 0;
let failed = 0;

weekViewElements.forEach(element => {
    if (indexContent.includes(element)) {
        console.log(`  ✓ Found: ${element}`);
        passed++;
    } else {
        console.log(`  ✗ Missing: ${element}`);
        failed++;
    }
});

console.log(`\nTest 1 Result: ${passed}/${weekViewElements.length} elements found\n`);

// Test 2: Check if old single-day view is replaced
console.log('Test 2: Checking if single-day view is replaced...');
const oldViewIndicators = [
    'renderTasks()',
    "Today's Tasks"
];

let hasOldView = false;
oldViewIndicators.forEach(indicator => {
    if (indexContent.includes(indicator)) {
        console.log(`  ⚠ Still contains: ${indicator}`);
        hasOldView = true;
    }
});

if (!hasOldView) {
    console.log('  ✓ Old single-day view properly replaced');
    passed++;
} else {
    console.log('  ✗ Old view elements still present');
    failed++;
}

// Test 3: Check CSS for responsive design
console.log('\nTest 3: Checking responsive design CSS...');
if (indexContent.includes('@media') && indexContent.includes('grid-template-columns: 1fr')) {
    console.log('  ✓ Responsive CSS found for mobile view');
    passed++;
} else {
    console.log('  ✗ Missing responsive CSS for mobile');
    failed++;
}

// Test 4: Check drag and drop enhancements
console.log('\nTest 4: Checking drag and drop enhancements...');
const dragDropEnhancements = [
    'task-list-column',
    'dataset.date',
    'dateAssigned'
];

let hasDragDrop = true;
dragDropEnhancements.forEach(enhancement => {
    if (!indexContent.includes(enhancement)) {
        console.log(`  ✗ Missing: ${enhancement}`);
        hasDragDrop = false;
    }
});

if (hasDragDrop) {
    console.log('  ✓ Drag and drop enhancements present');
    passed++;
} else {
    console.log('  ✗ Drag and drop enhancements incomplete');
    failed++;
}

// Test 5: Check week navigation functions
console.log('\nTest 5: Checking week navigation functions...');
if (indexContent.includes('getStartOfWeek') && indexContent.includes('currentWeekStartDate')) {
    console.log('  ✓ Week navigation functions found');
    passed++;
} else {
    console.log('  ✗ Week navigation functions missing');
    failed++;
}

// Summary
console.log('\n================================');
console.log('Test Summary:');
console.log(`  Passed: ${passed}`);
console.log(`  Failed: ${failed}`);
console.log(`  Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);

if (failed === 0) {
    console.log('\n✅ All tests passed! Week view feature appears to be properly implemented.');
} else {
    console.log('\n⚠️  Some tests failed. Please review the implementation.');
}

// Check for potential issues
console.log('\n================================');
console.log('Checking for potential issues...\n');

// Check if functions are properly defined
const requiredFunctions = ['renderWeekView', 'getStartOfWeek'];
requiredFunctions.forEach(func => {
    const funcRegex = new RegExp(`function\\s+${func}\\s*\\(`, 'g');
    if (!funcRegex.test(indexContent)) {
        console.log(`  ⚠️  Warning: Function '${func}' may not be properly defined`);
    }
});

// Check for TODO comments related to week view
const todoRegex = /TODO.*week/gi;
const todos = indexContent.match(todoRegex);
if (todos) {
    console.log(`  ⚠️  Found ${todos.length} TODO comment(s) related to week view`);
    todos.forEach(todo => console.log(`     - ${todo}`));
}

console.log('\n✅ Static analysis complete!');