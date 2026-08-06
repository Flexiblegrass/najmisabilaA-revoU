# Project: Expense & Budget Visualizer

## Overview
A mobile-friendly web app for tracking daily spending. Users can record income and expenses, view a transaction history, and visualize spending by category through a pie chart.

## Tech Stack
- HTML5 (structure)
- CSS3 (styling — single file: `css/style.css`)
- Vanilla JavaScript (no frameworks — single file: `js/app.js`)
- Browser localStorage (data persistence, no backend)

## Folder Structure
```
revou-bootcamp-training/
├── index.html          # Main entry point
├── css/
│   └── style.css       # All styles (1 file only)
├── js/
│   └── app.js          # All logic (1 file only)
├── .kiro/
│   └── steering/
│       └── project.md  # This file
└── README.md
```

## Features Implemented

### MVP (Required)
- Input form — item name, amount, category (with custom category support via datalist)
- Transaction list — scrollable, shows name/amount/category, delete and edit support
- Total balance — updates automatically on add/delete
- Pie chart — spending distribution by category via Canvas API (no external library)

### Optional Challenges Completed (3 of 5)
- Allow users to add custom categories (datalist combo remembers new entries)
- Monthly summary view (Laporan tab: Harian / Bulanan / Tahunan filter)
- Transaction grouping and search (Riwayat tab with date grouping + live search)

### Bonus Features Beyond Requirements
- 5-tab SPA: Transaksi, Dompet, Laporan, Riwayat, Pengaturan
- Dompet (wallet manager): track balances per wallet/bank, synced with transactions
- Indonesian / English language toggle (full i18n system)
- Export data as CSV (Excel-compatible) — no external library
- Responsive design: desktop top-nav + mobile fixed bottom navigation bar
- Semantic HTML5 with ARIA attributes for accessibility
- localStorage persistence — all data survives page refresh

## Technical Constraints Followed
- TC-1: HTML + CSS + Vanilla JS only (no React, Vue, or other frameworks)
- TC-2: localStorage only, no backend server
- TC-3: Compatible with Chrome, Firefox, Edge, Safari
- NFR-1: Clean, minimal interface — no complex setup
- NFR-2: Fast load, responsive UI, no lag
- NFR-3: Clear visual hierarchy, readable typography
- Folder rule: exactly 1 CSS file (css/style.css) and 1 JS file (js/app.js)

## Built With Kiro
This project was built using Kiro IDE (AI-powered development environment).
The .kiro folder is included as proof of Kiro usage per assignment requirements.
