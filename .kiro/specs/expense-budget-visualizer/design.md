# Design Document

## Expense & Budget Visualizer

---

## Overview

A single-page application (SPA) with tab-based navigation, implemented without any build step,
bundler, or JavaScript framework. All logic resides in one Vanilla JS file. The app renders
entirely client-side using browser DOM APIs and persists all data in localStorage.

```
index.html     — HTML structure: all 5 tab views, all modals, bottom nav
css/style.css  — All styling: design tokens, layout, responsive rules
js/app.js      — All state, storage, rendering, event delegation, and i18n logic
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                             │
│                                                             │
│  ┌──────────────┐    reads/writes    ┌──────────────────┐  │
│  │   app.js     │◄──────────────────►│  localStorage    │  │
│  │  (all logic) │                    │  bgt_transactions│  │
│  │              │                    │  bgt_wallets     │  │
│  │  state {}    │                    │  bgt_categories  │  │
│  │  renders     │                    │  bgt_lang        │  │
│  │  events      │                    └──────────────────┘  │
│  └──────┬───────┘                                          │
│         │ manipulates                                       │
│  ┌──────▼───────┐                                          │
│  │  index.html  │                                          │
│  │  (DOM tree)  │                                          │
│  └──────┬───────┘                                          │
│         │ styles                                            │
│  ┌──────▼───────┐                                          │
│  │  style.css   │                                          │
│  └──────────────┘                                          │
└─────────────────────────────────────────────────────────────┘
```

The app follows a unidirectional data flow:
1. User event fires
2. Event handler mutates `state` and calls `localStorage` save helpers
3. Render function re-builds the relevant DOM section from `state`
4. User sees updated UI

There is no virtual DOM or diffing — each render call replaces `innerHTML` of the
relevant list container, then re-attaches any needed delegated listeners.

---

## Components and Interfaces

### Logical Component Tree

```
App
├── Header (desktop nav — hidden ≤600px)
│   └── nav#main-nav  [data-tab] links
├── main#app-main
│   ├── Tab: Transaksi  (tab-view #tab-transaksi)
│   │   ├── SummarySection  — 4 × <article class="card">
│   │   ├── ListHeader      — <time>, edit-mode toggle, + New button
│   │   └── ul#expense-list — transaction rows (delegated click)
│   ├── Tab: Dompet  (#tab-dompet)
│   │   ├── TotalSaldoCard  — <article class="saldo-card">
│   │   ├── DompetHeader    — edit-mode toggle, + New button
│   │   └── ul#wallet-list  — wallet rows (delegated click)
│   ├── Tab: Laporan  (#tab-laporan)
│   │   ├── PeriodTabGroup  — 3 × <button class="period-tab">
│   │   ├── h2#laporan-period-label
│   │   ├── canvas#pie-chart  — pie chart (Canvas 2D)
│   │   └── ul#category-legend
│   ├── Tab: Riwayat  (#tab-riwayat)
│   │   ├── SearchInput  — live-filter input
│   │   └── ul#riwayat-list  — date-grouped collapsible rows
│   └── Tab: Pengaturan  (#tab-pengaturan)
│       ├── Accordion: Data   — Hapus data, Export data
│       └── Accordion: Bahasa — id / en toggle buttons
├── nav#bottom-nav  (mobile only — fixed, ≤600px)
├── div#transaction-modal-overlay  (role="dialog")
├── div#wallet-modal-overlay       (role="dialog")
├── div#detail-modal-overlay       (role="dialog")
├── div#export-modal-overlay       (role="dialog")
├── div#confirm-overlay            (role="alertdialog")
└── div#toast                      (role="status", aria-live="polite")
```

### Key JavaScript Functions

| Function | Responsibility |
|---|---|
| `init()` | Load storage, apply translations, bind events, render initial tab |
| `loadStorage()` | Hydrate `state` from localStorage; fall back to defaults |
| `switchTab(name)` | Hide all tab views, show target, trigger its render function |
| `renderTransaksi()` | Compute summary totals, rebuild `#expense-list` |
| `renderDompet()` | Compute display balances, rebuild `#wallet-list` |
| `renderLaporan()` | Filter expenses by period, draw pie chart, build legend |
| `renderRiwayat(query)` | Group transactions by date, apply search filter, build collapsible list |
| `drawPieChart(canvas, cats, colorMap, total)` | Draw arc slices with white dividers using Canvas 2D |
| `openTransactionModal(txId)` | Pre-fill form for edit or clear for new; show overlay |
| `saveTransaction()` | Validate, persist, close modal, re-render, show toast |
| `deleteTransaction(txId)` | Remove from state, persist, re-render, show toast |
| `openWalletModal(walletId)` | Pre-fill or clear wallet form; show overlay |
| `saveWallet()` | Validate, persist, close modal, re-render, show toast |
| `getWalletDisplayBalance(walletId)` | Compute balance = base + income tx − expense tx |
| `getTotalDisplaySaldo()` | Sum of all wallet display balances |
| `getFilteredExpenses(period)` | Filter expense transactions by harian/bulanan/tahunan |
| `applyTranslations()` | Update all `data-i18n` and `data-i18n-placeholder` elements |
| `showToast(msgKey)` | Show toast, auto-dismiss after 2500ms |
| `showConfirm(msgKey, cb)` | Show confirm dialog; call `cb` on OK |
| `exportCSV()` | Build CSV string, download via Blob + `<a>` click |
| `exportPDF()` | Call `window.print()` |
| `uid()` | Generate a unique ID: `Date.now().toString(36) + random` |
| `t(key)` | Look up translation key in current language |
| `formatRp(amount)` | Format number as `Rp.1.000.000` |
| `escHtml(str)` | Escape `&`, `<`, `>`, `"` to prevent XSS in innerHTML |

---

## Data Models

### Transaction

```js
{
  id:       string,    // uid() — e.g. "lf3k2abc9xz"
  date:     string,    // ISO date "YYYY-MM-DD"
  time:     string,    // "HH:MM"
  walletId: string,    // references wallet.id
  type:     "income" | "expense",
  amount:   number,    // positive integer or decimal
  category: string,    // e.g. "Makanan"
  item:     string,    // e.g. "Nasi Goreng"
  desc:     string     // optional, may be empty string
}
```

### Wallet

```js
{
  id:      string,    // "w1"–"w5" for defaults; uid() for user-created wallets
  name:    string,    // e.g. "BRI", "Uang Tunai"
  balance: number     // base / initial balance set by user (not the computed display balance)
}
```

### In-Memory State

```js
{
  transactions:    Transaction[],
  wallets:         Wallet[],
  categories:      string[],          // default + user-added categories
  lang:            "id" | "en",
  activeTab:       string,            // "transaksi" | "dompet" | "laporan" | "riwayat" | "pengaturan"
  editMode:        boolean,           // Transaksi tab edit mode
  dompetEditMode:  boolean,           // Dompet tab edit mode
  laporan:         { period: "harian" | "bulanan" | "tahunan" },
  editingTxId:     string | null,     // ID of transaction being edited
  editingWalletId: string | null      // ID of wallet being edited
}
```

### localStorage Keys

| Key | Type | Default |
|---|---|---|
| `bgt_transactions` | `Transaction[]` JSON | `[]` |
| `bgt_wallets` | `Wallet[]` JSON | 5 default wallets |
| `bgt_categories` | `string[]` JSON | 8 default categories |
| `bgt_lang` | `"id"` \| `"en"` string | `"id"` |

---

## Key Design Decisions

### Wallet balance is computed, not stored

`wallet.balance` holds only the user-set base value. The displayed balance is always computed
at render time:

```
displayBalance = wallet.balance + Σ(income tx for this wallet) − Σ(expense tx for this wallet)
```

This keeps the Dompet tab automatically in sync with Transaksi without requiring a balance
update on every transaction mutation.

### i18n without a library

A plain `TRANSLATIONS` constant is keyed by `"id"` and `"en"`. The `t(key)` helper looks
up the active language. On language change, `applyTranslations()` walks all
`[data-i18n]` and `[data-i18n-placeholder]` elements and updates them, then
`switchTab()` triggers a full re-render of the current tab.

### Pie chart with Canvas API only

No Chart.js or any external charting library is used. `drawPieChart()` uses the Canvas 2D
context to draw arc slices proportional to each category's share of total expenses, with
white stroke dividers between slices for visual clarity. Colours are drawn from a fixed
10-entry `CATEGORY_COLORS` array, cycling if there are more than 10 categories.

### Category datalist

The category input uses `<input list="category-datalist">` + `<datalist id="category-datalist">`.
Default options are defined in `DEFAULT_CATEGORIES`. When a user types a new category and
saves a transaction, it is appended to `state.categories`, persisted via `saveCategories()`,
and `populateCategoryDatalist()` refreshes the datalist the next time the modal opens.

### Event delegation

All per-row interactions (edit, delete, detail on transactions; edit on wallets; expand on
riwayat date rows) use delegated listeners on the parent `<ul>` rather than per-item
listeners. This avoids listener leaks when `innerHTML` is replaced during re-renders.

---

## Visual Design

### CSS Custom Properties (Design Tokens)

| Token | Value | Usage |
|---|---|---|
| `--color-primary` | `#4f46e5` | Buttons, active state, underline |
| `--color-edit` | `#f6ac36` | Edit mode buttons |
| `--color-danger` | `#ef4444` | Delete buttons, expense amounts |
| `--color-success` | `#10b981` | Income amounts, toast checkmark |
| `--color-header` | `#1e293b` | App header, dark nav bar |
| `--color-panel` | `#1f2937` | Transaction list dark panel |
| `--color-bg` | `#f3f4f6` | Page background |
| `--color-surface` | `#ffffff` | Cards, list items, modals |

### Responsive Breakpoints

| Breakpoint | Layout change |
|---|---|
| `> 768px` | 4-column summary card grid; full desktop nav visible |
| `≤ 768px` | 2-column summary card grid; compact nav |
| `≤ 600px` | Desktop header nav hidden; fixed bottom nav shown; padding reduced |

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions
of a system — essentially, a formal statement about what the system should do. Properties
serve as the bridge between human-readable specifications and machine-verifiable correctness
guarantees.*

### Property 1: Transaction persistence round-trip

*For any* valid transaction object added to the app, serialising state to localStorage and
then deserialising it on the next `loadStorage()` call SHALL produce an equivalent transaction
object with all fields intact.

**Validates: Requirements 9.1, 9.5**

### Property 2: Wallet display balance consistency

*For any* set of transactions and wallets, the display balance computed for a wallet SHALL
always equal its base balance plus the sum of all income transactions linked to that wallet
minus the sum of all expense transactions linked to that wallet.

**Validates: Requirements 3.3**

### Property 3: Summary totals consistency

*For any* list of transactions, the remaining balance shown in the summary card SHALL always
equal total income minus total expenses across all transactions.

**Validates: Requirements 1.2**

### Property 4: Total saldo consistency

*For any* set of wallets, the "Total Saldo" value displayed on the Dompet tab SHALL equal
the sum of the individual display balances of all wallets.

**Validates: Requirements 3.1, 3.3**

### Property 5: Category auto-save

*For any* transaction saved with a category string not already present in `state.categories`,
querying `state.categories` after saving SHALL include that new category string.

**Validates: Requirements 2.5**

### Property 6: Expense filter correctness

*For any* period (harian, bulanan, tahunan) and any set of transactions, `getFilteredExpenses(period)`
SHALL return only transactions whose `type` is `"expense"` and whose `date` falls within
the boundaries of the selected period.

**Validates: Requirements 4.3**

### Property 7: Search filter correctness

*For any* non-empty search query, every transaction row rendered in the Riwayat tab SHALL
have at least one of the following fields containing the query string (case-insensitive):
`category`, `item`, or `desc`.

**Validates: Requirements 5.3**

### Property 8: Invalid transaction rejection

*For any* form submission with an empty required field or an amount ≤ 0, THE App SHALL
not add a new transaction to `state.transactions` and SHALL display an error message.

**Validates: Requirements 2.2, 2.3**

---

## Error Handling

| Scenario | Handling |
|---|---|
| `localStorage` parse failure on load | `try/catch` in `loadStorage()`; falls back to empty array or default values |
| Empty required transaction field | Inline error shown in `#form-error`; save blocked |
| Amount ≤ 0 | Inline error shown; save blocked |
| Empty wallet name | Inline error shown in `#wallet-form-error`; save blocked |
| Transaction or wallet ID not found | Guard clauses in `openTransactionModal`, `deleteTransaction`, `openDetailModal` return early |
| Canvas context unavailable | `drawPieChart()` is only called after checking `expenses.length > 0` and the canvas element exists |

---

## Testing Strategy

### Unit Tests (example-based)

Focus on specific, concrete scenarios:

- `formatRp(1500000)` returns `"Rp.1.500.000"`
- `getWalletDisplayBalance("w1")` with no transactions returns the base balance
- `saveTransaction()` with an empty `item` field does not push to `state.transactions`
- `getFilteredExpenses("harian")` returns only today's expense transactions
- `getLaporanPeriodLabel("tahunan")` returns the current year as a string
- `escHtml('<script>')` returns `"&lt;script&gt;"`

### Property-Based Tests

Validate universal correctness properties across randomly generated inputs:

- **Property 1** (persistence round-trip): Generate random transaction objects, serialise and
  deserialise, assert deep equality. Min 100 iterations.
  *Tag: Feature: expense-budget-visualizer, Property 1: Transaction persistence round-trip*

- **Property 2** (wallet display balance): Generate random base balance + random income/expense
  transactions linked to a wallet, assert `getWalletDisplayBalance` matches manual sum.
  *Tag: Feature: expense-budget-visualizer, Property 2: Wallet display balance consistency*

- **Property 3** (summary totals): Generate random transaction arrays, assert
  `income − expense === remaining balance`.
  *Tag: Feature: expense-budget-visualizer, Property 3: Summary totals consistency*

- **Property 6** (expense filter): Generate random transaction lists with mixed dates and types,
  assert every returned item is an expense within the correct date range.
  *Tag: Feature: expense-budget-visualizer, Property 6: Expense filter correctness*

- **Property 7** (search filter): Generate random transactions and search queries, assert
  every rendered row matches the query in at least one field.
  *Tag: Feature: expense-budget-visualizer, Property 7: Search filter correctness*

- **Property 8** (invalid rejection): Generate invalid inputs (empty strings, zero/negative amounts),
  assert no transaction is added to state.
  *Tag: Feature: expense-budget-visualizer, Property 8: Invalid transaction rejection*

### Integration / Smoke Tests

- On `init()`, localStorage is read and default wallets are created when no wallet data exists
- Switching tabs renders the correct view and hides all others
- Saving a transaction updates both the Transaksi summary cards and the Dompet display balances
- Clearing all data resets transactions to `[]` and wallets to the five defaults
- CSV export produces a downloadable file with a header row and one row per transaction
