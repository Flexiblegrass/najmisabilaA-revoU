/* ================================================================
   app.js — Expense & Budget Tracker
   TC-1: Only 1 JS file (this file), Vanilla JS only
   TC-2: Data stored in localStorage only
================================================================ */


/* ----------------------------------------------------------------
   1. CONSTANTS & CONFIG
      - LocalStorage keys
      - Default values
      - Category list
---------------------------------------------------------------- */

const STORAGE_KEY_EXPENSES = 'expenses';   // TODO: rename if you prefer
const STORAGE_KEY_BUDGET   = 'budget';     // TODO: rename if you prefer

const DEFAULT_BUDGET = 0;

const CATEGORIES = [
  // TODO: Fill in your expense categories
  // Example: 'Food', 'Transport', 'Entertainment', 'Health', 'Other'
];


/* ----------------------------------------------------------------
   2. STATE
      - In-memory representation of the current data
      - Always sync to/from localStorage
---------------------------------------------------------------- */

let expenses = [];   // Array of expense objects
let budget   = 0;    // Current monthly budget (number)


/* ----------------------------------------------------------------
   3. LOCALSTORAGE HELPERS
      - Load and save data to/from localStorage
---------------------------------------------------------------- */

/**
 * Load all data from localStorage into memory.
 * Call once on page load.
 */
function loadFromStorage() {
  // TODO: Read STORAGE_KEY_EXPENSES from localStorage
  //       Parse JSON, assign to `expenses`
  //       Fall back to [] if nothing stored

  // TODO: Read STORAGE_KEY_BUDGET from localStorage
  //       Parse, assign to `budget`
  //       Fall back to DEFAULT_BUDGET if nothing stored
}

/**
 * Save the current `expenses` array to localStorage.
 */
function saveExpenses() {
  // TODO: JSON.stringify `expenses` and store under STORAGE_KEY_EXPENSES
}

/**
 * Save the current `budget` value to localStorage.
 */
function saveBudget() {
  // TODO: Store `budget` under STORAGE_KEY_BUDGET
}


/* ----------------------------------------------------------------
   4. DATA HELPERS
      - Pure functions to compute summary values
---------------------------------------------------------------- */

/**
 * Calculate the total of all expenses.
 * @returns {number}
 */
function getTotalExpenses() {
  // TODO: reduce `expenses` array to sum of all amounts
}

/**
 * Calculate remaining balance.
 * @returns {number}
 */
function getRemainingBalance() {
  // TODO: return budget - getTotalExpenses()
}

/**
 * Generate a simple unique ID for a new expense.
 * @returns {string}
 */
function generateId() {
  // TODO: return a unique string (e.g. Date.now().toString())
}


/* ----------------------------------------------------------------
   5. DOM REFERENCES
      - Grab all elements you need once, store in variables
      - Avoids repeated querySelector calls
---------------------------------------------------------------- */

// Summary cards
const elTotalBudget      = document.getElementById('total-budget');
const elTotalExpenses    = document.getElementById('total-expenses');
const elRemainingBalance = document.getElementById('remaining-balance');

// Chart
const elChart            = document.getElementById('budget-chart');

// Expense form
const expenseForm        = document.getElementById('expense-form');
const elCategory         = document.getElementById('expense-category');
const elAmount           = document.getElementById('expense-amount');
const elDesc             = document.getElementById('expense-desc');
const elDate             = document.getElementById('expense-date');

// Budget form
const budgetForm         = document.getElementById('budget-form');
const elBudgetAmount     = document.getElementById('budget-amount');

// List
const elExpenseList      = document.getElementById('expense-list');
const elEmptyState       = document.getElementById('empty-state');


/* ----------------------------------------------------------------
   6. RENDER FUNCTIONS
      - Update the DOM to reflect current state
      - Call these after any state change
---------------------------------------------------------------- */

/**
 * Render the three summary cards.
 */
function renderSummary() {
  // TODO: Update elTotalBudget.textContent
  // TODO: Update elTotalExpenses.textContent
  // TODO: Update elRemainingBalance.textContent
  // TODO: Optionally add a CSS class when balance is negative
}

/**
 * Render the chart / visualization.
 * Use Canvas API or manipulate a CSS bar — your choice.
 */
function renderChart() {
  // TODO: Draw or update the visual representation
  // Hint for Canvas: get context with elChart.getContext('2d')
}

/**
 * Render the full expense list.
 */
function renderExpenseList() {
  // TODO: Clear elExpenseList innerHTML
  // TODO: Show elEmptyState if expenses.length === 0, else hide it
  // TODO: Loop through `expenses`, call createExpenseItem() for each
  //       and append to elExpenseList
}

/**
 * Create and return a single <li> element for one expense.
 * @param {Object} expense
 * @returns {HTMLElement}
 */
function createExpenseItem(expense) {
  // TODO: Build an <li> with expense details and a delete button
  // TODO: Attach delete event listener to the button
  // TODO: return the <li> element
}

/**
 * Populate the category <select> with options from CATEGORIES.
 */
function populateCategoryOptions() {
  // TODO: Loop CATEGORIES, create <option> for each, append to elCategory
}

/**
 * Master render — call this to refresh the whole UI.
 */
function renderAll() {
  renderSummary();
  renderChart();
  renderExpenseList();
}


/* ----------------------------------------------------------------
   7. EVENT HANDLERS
      - Form submissions
      - Delete expense
---------------------------------------------------------------- */

/**
 * Handle Add Expense form submission.
 * @param {Event} e
 */
function handleAddExpense(e) {
  e.preventDefault();

  // TODO: Read values from elCategory, elAmount, elDesc, elDate
  // TODO: Validate inputs (amount > 0, category selected, etc.)
  // TODO: Build an expense object: { id, category, amount, description, date }
  // TODO: Push to `expenses` array
  // TODO: saveExpenses()
  // TODO: renderAll()
  // TODO: Reset the form
}

/**
 * Handle Set Budget form submission.
 * @param {Event} e
 */
function handleSetBudget(e) {
  e.preventDefault();

  // TODO: Read value from elBudgetAmount
  // TODO: Validate (must be a positive number)
  // TODO: Assign to `budget`
  // TODO: saveBudget()
  // TODO: renderAll()
  // TODO: Reset the form
}

/**
 * Handle Delete Expense button click.
 * @param {string} id - The expense ID to remove
 */
function handleDeleteExpense(id) {
  // TODO: Filter `expenses` to remove the item with matching id
  // TODO: saveExpenses()
  // TODO: renderAll()
}


/* ----------------------------------------------------------------
   8. EVENT LISTENERS
      - Attach handlers to forms and any other interactive elements
---------------------------------------------------------------- */

expenseForm.addEventListener('submit', handleAddExpense);
budgetForm.addEventListener('submit', handleSetBudget);

// TODO: Add any other listeners (e.g. filter/sort controls)


/* ----------------------------------------------------------------
   9. INIT
      - Entry point — runs once when the page loads
---------------------------------------------------------------- */

function init() {
  loadFromStorage();
  populateCategoryOptions();
  renderAll();
}

// Kick everything off
init();
