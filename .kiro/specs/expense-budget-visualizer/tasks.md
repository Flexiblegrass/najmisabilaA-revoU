# Implementation Plan: Expense & Budget Visualizer

## Overview

Retrospective task list documenting all work completed to build the Expense & Budget Visualizer.
Every task below was implemented in a single-file Vanilla JS + HTML + CSS stack with no build
step, no bundler, and no external libraries.

All tasks are marked complete.

---

## Tasks

- [x] 1. Project setup
  - [x] 1.1 Create folder structure (`css/`, `js/`, `.kiro/`)
    - Created `index.html`, `css/style.css`, `js/app.js` as the only source files
    - _Requirements: all_
  - [x] 1.2 Create skeleton `index.html` with placeholder tab sections and modal containers
    - Includes `<head>` with viewport meta, stylesheet link, and `sr-only` utility style
    - _Requirements: 7.1, 7.2, 10.1_
  - [x] 1.3 Create skeleton `css/style.css` with section comment blocks
    - _Requirements: 7.1, 7.2_
  - [x] 1.4 Create skeleton `js/app.js` with empty function stubs and section comments
    - _Requirements: all_

- [x] 2. Core styling and design tokens
  - [x] 2.1 Define CSS custom properties (color tokens, spacing, typography)
    - `--color-primary`, `--color-edit`, `--color-danger`, `--color-success`, `--color-header`, `--color-panel`, `--color-bg`, `--color-surface`
    - _Requirements: 7.1, 7.2, 7.3_
  - [x] 2.2 Style header and desktop navigation bar with active-tab underline
    - _Requirements: 7.1, 7.3_
  - [x] 2.3 Style 4-column summary cards section with responsive 2-column fallback
    - _Requirements: 1.1, 7.1, 7.2_
  - [x] 2.4 Style dark transaction list panel (`--color-panel`)
    - _Requirements: 1.3_
  - [x] 2.5 Style mobile fixed bottom navigation bar with icon + label
    - _Requirements: 7.2, 7.3_
  - [x] 2.6 Add responsive breakpoints at 768px and 600px
    - _Requirements: 7.1, 7.2_
  - [x] 2.7 Style modal overlay, form fields, and action buttons
    - _Requirements: 2.1, 3.5, 3.6_
  - [x] 2.8 Style toast notification (bottom-centre, fade in/out)
    - _Requirements: 8.1, 8.2_

- [x] 3. HTML structure
  - [x] 3.1 Write all 5 tab view sections in `index.html` with `role="tabpanel"` and `aria-labelledby`
    - _Requirements: 10.1, 10.3_
  - [x] 3.2 Add transaction modal with all 8 form fields, `sr-only` labels, and error paragraph
    - _Requirements: 2.1, 2.2, 10.2, 10.3_
  - [x] 3.3 Add wallet modal with name and balance fields
    - _Requirements: 3.5, 3.6, 10.2, 10.3_
  - [x] 3.4 Add transaction detail modal
    - _Requirements: 1.7, 5.4, 10.3_
  - [x] 3.5 Add export choice modal with PDF and Excel buttons
    - _Requirements: 6.5, 10.3_
  - [x] 3.6 Add confirm `alertdialog` for data deletion
    - _Requirements: 6.2, 10.3_
  - [x] 3.7 Add toast element with `role="status"` and `aria-live="polite"`
    - _Requirements: 8.1, 10.5_
  - [x] 3.8 Add bottom nav with `aria-current` attributes
    - _Requirements: 7.2, 7.3, 10.4_

- [x] 4. JavaScript — state, storage, and helpers
  - [x] 4.1 Define `TRANSLATIONS` object with all `id` and `en` string keys
    - _Requirements: 6.3, 6.4, 8.3_
  - [x] 4.2 Define `state` object, `KEYS`, `DEFAULT_WALLETS`, `DEFAULT_CATEGORIES`, `CATEGORY_COLORS`
    - _Requirements: 3.4, 4.6, 9.1–9.4_
  - [x] 4.3 Implement `loadStorage()` — parse all four localStorage keys with `try/catch` fallbacks
    - _Requirements: 9.1–9.5_
  - [x] 4.4 Implement `saveTransactions()`, `saveWallets()`, `saveCategories()`, `saveLang()`
    - _Requirements: 9.1–9.4_
  - [x] 4.5 Implement helper functions: `uid()`, `t()`, `formatRp()`, `formatRpSign()`, `formatDateLabel()`, `formatDateShort()`, `escHtml()`, `todayISO()`, `nowTime()`
    - _Requirements: 1.3, 2.6, 8.3_

- [x] 5. Checkpoint — core infrastructure complete
  - Ensure helpers, state, storage load/save, and HTML skeleton are all wired up correctly before continuing.

- [x] 6. JavaScript — Transaksi tab
  - [x] 6.1 Implement `renderTransaksi()` — compute summary totals, render sorted transaction list with edit-mode actions
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_
  - [x] 6.2 Implement `openTransactionModal(txId)` — populate wallet dropdown, pre-fill for edit or clear for new, call `populateCategoryDatalist()`
    - _Requirements: 2.1, 2.7_
  - [x] 6.3 Implement `saveTransaction()` — validate required fields and amount > 0, handle add vs edit, auto-save new category, persist, re-render, toast
    - _Requirements: 2.2, 2.3, 2.5, 2.6_
  - [x] 6.4 Implement `deleteTransaction(txId)` — remove from state, persist, re-render, toast
    - _Requirements: 1.6_
  - [x] 6.5 Implement `openDetailModal(txId)` — build detail rows from transaction fields, show overlay
    - _Requirements: 1.7_

- [x] 7. JavaScript — Dompet tab
  - [x] 7.1 Implement `getWalletDisplayBalance(walletId)` — base balance + income tx − expense tx
    - _Requirements: 3.3_
  - [x] 7.2 Implement `getTotalDisplaySaldo()` — sum of all wallet display balances
    - _Requirements: 3.1_
  - [x] 7.3 Implement `renderDompet()` — total saldo card, wallet list with edit-mode buttons
    - _Requirements: 3.1, 3.2, 3.4, 3.6_
  - [x] 7.4 Implement `openWalletModal(walletId)`, `saveWallet()`, `closeWalletModal()` — validate non-empty name, handle add vs edit, persist, re-render, toast
    - _Requirements: 3.5, 3.6, 3.7_

- [x] 8. JavaScript — Laporan tab
  - [x] 8.1 Implement `getFilteredExpenses(period)` — filter by harian (today), bulanan (current month), tahunan (current year)
    - _Requirements: 4.1, 4.3_
  - [x] 8.2 Implement `getLaporanPeriodLabel(period)` — human-readable date range string per period
    - _Requirements: 4.2_
  - [x] 8.3 Implement `renderLaporan()` — period button toggle, canvas show/hide, empty state, legend rebuild
    - _Requirements: 4.1, 4.2, 4.4, 4.5, 4.6_
  - [x] 8.4 Implement `drawPieChart(canvas, cats, colorMap, total)` — arc slices + white donut hole via Canvas 2D API
    - _Requirements: 4.3, 4.6_

- [x] 9. JavaScript — Riwayat tab
  - [x] 9.1 Implement `renderRiwayat(searchQuery)` — group transactions by date, newest first, with collapsible date rows
    - _Requirements: 5.1, 5.2_
  - [x] 9.2 Add live search filtering — match query (case-insensitive) against category, item, and desc fields
    - _Requirements: 5.3, 5.5_
  - [x] 9.3 Wire delegated click handler on `#riwayat-list` for date-row collapse toggle and transaction detail open
    - _Requirements: 5.2, 5.4_

- [x] 10. JavaScript — Pengaturan tab
  - [x] 10.1 Implement `toggleAccordion(accordionId)` — toggle `hidden` on body, update arrow character, sync `aria-expanded`
    - _Requirements: 6.1_
  - [x] 10.2 Implement `clearAllData()` — reset transactions and wallets, persist, re-render both tabs, toast
    - _Requirements: 6.2_
  - [x] 10.3 Implement `exportCSV()` — build CSV with header row, resolve wallet names, download via Blob + anchor click, toast
    - _Requirements: 6.6_
  - [x] 10.4 Implement `exportPDF()` — call `window.print()`
    - _Requirements: 6.7_
  - [x] 10.5 Implement language switch — update `state.lang`, `saveLang()`, `applyTranslations()`, re-render active tab, toast
    - _Requirements: 6.3, 6.4_

- [x] 11. i18n and accessibility
  - [x] 11.1 Implement `applyTranslations()` — walk `[data-i18n]` and `[data-i18n-placeholder]`, update text content and placeholders, mark active language button
    - _Requirements: 6.3, 6.4, 8.3_
  - [x] 11.2 Verify semantic HTML5 elements throughout: `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<time>`, `<ul>`
    - _Requirements: 10.1_
  - [x] 11.3 Add ARIA attributes: `role="tabpanel"`, `aria-labelledby`, `aria-modal`, `role="dialog"`, `role="alertdialog"`, `aria-live="polite"`, `aria-expanded`, `aria-controls`, `aria-current`
    - _Requirements: 10.3, 10.5_
  - [x] 11.4 Add `<label class="sr-only">` for all form inputs in transaction modal and wallet modal
    - _Requirements: 10.2_
  - [x] 11.5 Add `aria-hidden="true"` to all decorative icons, emoji, and SVG elements
    - _Requirements: 10.4_

- [x] 12. Bug fixes and polish
  - [x] 12.1 Fix Dompet wallet row alignment — apply `flex: 1` to `.wallet-name` so amounts align right
    - _Requirements: 3.2_
  - [x] 12.2 Fix wallet balance sync — switch from stored balance to computed display balance in `renderDompet()`
    - _Requirements: 3.3_
  - [x] 12.3 Replace plain category text input with datalist combo; implement `populateCategoryDatalist()`
    - _Requirements: 2.4, 2.5_
  - [x] 12.4 Auto-persist new categories — append to `state.categories` and call `saveCategories()` in `saveTransaction()`
    - _Requirements: 2.5_

- [x] 13. Final checkpoint
  - All features implemented, all tabs functional, all modals working, data persists across page reload.

---

## Notes

- All tasks are complete — this document is retrospective documentation of the finished app
- Tasks marked with `*` would be optional during a forward-looking implementation run
- Property tests and unit tests are listed in the design document Testing Strategy section
- Each task references specific requirements for full traceability

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3", "1.4"] },
    { "id": 1, "tasks": ["2.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "2.8"] },
    { "id": 3, "tasks": ["3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7", "3.8"] },
    { "id": 4, "tasks": ["4.1", "4.2"] },
    { "id": 5, "tasks": ["4.3", "4.4", "4.5"] },
    { "id": 6, "tasks": ["6.1", "6.2", "7.1", "7.2", "8.1", "8.2", "9.1", "9.2", "10.1", "10.2", "10.3", "10.4", "10.5"] },
    { "id": 7, "tasks": ["6.3", "6.4", "6.5", "7.3", "7.4", "8.3", "8.4", "9.3"] },
    { "id": 8, "tasks": ["11.1", "11.2", "11.3", "11.4", "11.5"] },
    { "id": 9, "tasks": ["12.1", "12.2", "12.3", "12.4"] }
  ]
}
```
