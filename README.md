# Expense & Budget Visualizer

**RevoU Software Engineering Fundamentals — Coding Camp Assignment**  
**Batch: 3 August 2026**

Name : Najmi Sabila Almusfiroh
Github Repository : https://github.com/Flexiblegrass/najmisabilaA-revoU.git

## About

A mobile-friendly single-page web application for tracking personal income and expenses.
Built from scratch with HTML, CSS, and Vanilla JavaScript — no frameworks, no backend, no build step.

You can record daily transactions, manage multiple wallets, see a breakdown of your spending
by category through a live pie chart, and browse your full transaction history.

---

## Live Demo

> 🔗 GitHub Pages link — coming soon

---

## Features

### Required (MVP)
- **Input Form** — Add transactions with item name, amount, and category; validates all fields before saving
- **Transaction List** — Scrollable list showing all transactions with name, amount, and category; supports edit and delete
- **Total Balance** — Summary cards at the top update automatically when transactions are added or removed
- **Pie Chart** — Visual spending breakdown by category, drawn with the Canvas API (no external chart library)

### Optional Challenges (3 of 5 completed)
- ✅ Allow users to add custom categories
- ✅ Monthly summary view (Daily / Monthly / Yearly report filter)
- ✅ Transaction history with grouping and live search

### Bonus Features
- 5-tab navigation: Transaksi, Dompet, Laporan, Riwayat, Pengaturan
- Wallet manager — track balances across multiple banks/accounts, synced with transactions
- Indonesian / English language toggle
- Export data as CSV (Excel-compatible)
- Responsive design: desktop top nav + mobile bottom navigation bar
- Semantic HTML5 with ARIA accessibility attributes
- All data persists in `localStorage` across page refreshes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (1 file: `css/style.css`) |
| Logic | Vanilla JavaScript (1 file: `js/app.js`) |
| Storage | Browser `localStorage` |
| Chart | HTML5 Canvas API |

No frameworks. No libraries. No build tools.

---

## Folder Structure

```
revou-bootcamp-training/
├── index.html          # Main entry point
├── css/
│   └── style.css       # All styles
├── js/
│   └── app.js          # All logic
├── .kiro/
│   ├── specs/
│   │   └── expense-budget-visualizer/
│   │       ├── .config.kiro
│   │       ├── requirements.md
│   │       ├── design.md
│   │       └── tasks.md
│   ├── steering/
│   │   └── project.md
│   └── hooks/
│       └── post-save.json
└── README.md
```

---

## How to Run

No installation needed. Just open `index.html` in any modern browser:

```
Chrome / Firefox / Edge / Safari
```

Or visit the GitHub Pages link above once deployed.

---

## Constraints Met

- ✅ TC-1: HTML + CSS + Vanilla JS only
- ✅ TC-2: `localStorage` only, no backend
- ✅ TC-3: Works in Chrome, Firefox, Edge, Safari
- ✅ NFR-1: Clean, minimal interface — no setup required
- ✅ NFR-2: Fast load, responsive UI
- ✅ NFR-3: Clear visual hierarchy, readable typography
- ✅ Folder rule: exactly 1 CSS file and 1 JS file

---

## Built With Kiro

This project was built using **Kiro IDE**, an AI-powered development environment.  
The `.kiro` folder is included in the repository as proof of Kiro usage per assignment requirements.

---

*RevoU Software Engineering Fundamentals Coding Camp — August 2026*
