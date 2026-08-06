# Requirements Document

## Introduction

A mobile-friendly single-page web application for tracking personal income and expenses.
Users can record transactions, manage multiple wallets, view spending reports by time period,
browse transaction history, and configure app settings.

Built with HTML5, CSS3, and Vanilla JavaScript using browser localStorage for persistence.
No build step, no bundler, and no backend server is required.

## Glossary

- **App**: The Budget Tracker single-page web application
- **Transaction**: A single financial event with a type (income or expense), amount, category, item name, and optional description, linked to one wallet
- **Wallet**: A named fund source (e.g. BRI, Uang Tunai) with a user-set base balance
- **Display Balance**: The computed wallet balance = base balance + income transactions − expense transactions for that wallet
- **Category**: A user-defined or default string label assigned to a transaction (e.g. Makanan, Transportasi)
- **Toast**: A brief auto-dismissing notification shown at the bottom of the screen
- **Tab**: One of five main views (Transaksi, Dompet, Laporan, Riwayat, Pengaturan)
- **State**: In-memory JavaScript object holding all runtime data (transactions, wallets, categories, lang, activeTab, editMode, etc.)
- **localStorage**: Browser-native key-value storage used for all data persistence
- **i18n**: Internationalisation — the app supports Indonesian (`id`) and English (`en`) languages

---

## Requirements

### Requirement 1: Transaction Management (Transaksi Tab)

**User Story:** As a user, I want to view and manage my transactions from a single screen, so that I can stay on top of my daily finances.

#### Acceptance Criteria

1. THE App SHALL display four summary cards: total income (Pemasukkan), total expenses (Pengeluaran), remaining balance (Saldo Tersisa), and item count (Jumlah Item)
2. THE App SHALL compute the remaining balance as total income minus total expenses across all transactions
3. WHEN the Transaksi tab is active, THE App SHALL display today's date in the list header using the current locale
4. THE App SHALL render the transaction list sorted by date and time, newest first
5. WHEN no transactions exist, THE App SHALL display an empty state with a receipt icon and a localised message
6. THE App SHALL provide a "+ New" button that opens the Add Transaction modal
7. THE App SHALL provide an edit-mode toggle button (pencil icon) that reveals per-row edit and delete action buttons
8. WHEN a transaction row or its chevron is clicked, THE App SHALL open the transaction detail modal for that transaction

### Requirement 2: Add / Edit Transaction Modal

**User Story:** As a user, I want to record income and expense transactions through a form, so that I can track every financial event accurately.

#### Acceptance Criteria

1. THE Transaction Modal SHALL contain the following fields: Date, Time, Wallet (dropdown), Type (Pemasukan / Pengeluaran), Amount, Category (datalist combo), Item name, and Description (optional)
2. WHEN a user submits the form with any required field empty, THE App SHALL display an inline error message and prevent saving
3. WHEN a user submits a transaction with Amount equal to zero or less, THE App SHALL display an inline error and prevent saving
4. THE Category field SHALL use an HTML `<input list>` backed by a `<datalist>` containing default options: Makanan, Transportasi, Hiburan, Kendaraan, Kesehatan, Belanja, Tagihan, Lainnya
5. WHEN a user saves a transaction with a category not already in the category list, THE App SHALL append that category to the list and persist it to localStorage under `bgt_categories`
6. WHEN a transaction is saved successfully, THE App SHALL close the modal, re-render the Transaksi tab, and show a "Berhasil disimpan" toast notification
7. WHEN the edit button for a transaction is clicked, THE App SHALL open the modal pre-filled with that transaction's existing data

### Requirement 3: Wallet Management (Dompet Tab)

**User Story:** As a user, I want to manage multiple wallets or bank accounts, so that I can track balances across different fund sources.

#### Acceptance Criteria

1. THE App SHALL display a "Total Saldo" card showing the sum of all wallets' display balances
2. THE App SHALL list every wallet with its name and current display balance
3. THE App SHALL compute each wallet's display balance as: base balance + sum of income transactions linked to that wallet − sum of expense transactions linked to that wallet
4. WHEN localStorage contains no wallet data, THE App SHALL initialise five default wallets: BRI, BNI, Mandiri, BSI, and Uang Tunai, each with a base balance of Rp.0
5. THE App SHALL provide a "+ New" button to open the Add Wallet modal where a name and initial balance can be entered
6. THE App SHALL provide a per-wallet edit button (visible in edit mode) to modify an existing wallet's name and base balance
7. WHEN a user saves a wallet with an empty name, THE App SHALL display an inline error and prevent saving

### Requirement 4: Report / Chart (Laporan Tab)

**User Story:** As a user, I want to see my spending visualised as a pie chart filtered by time period, so that I can understand where my money is going.

#### Acceptance Criteria

1. THE App SHALL provide three period filter buttons: Harian (today), Bulanan (current month), and Tahunan (current year)
2. WHEN a period is selected, THE App SHALL display a human-readable period label (e.g. "Kamis, 6 Agustus 2026" for daily, "1 – 31 Agustus 2026" for monthly, "2026" for yearly)
3. THE App SHALL draw a pie chart on an HTML5 `<canvas>` element using only expense transactions within the selected period
4. WHEN no expense transactions exist for the selected period, THE App SHALL show an empty state message and hide the canvas
5. THE App SHALL render a category legend below the chart listing each category name and its percentage of total expenses for the period
6. EACH category slice and its corresponding legend badge SHALL use a distinct colour from a predefined 10-colour palette

### Requirement 5: Transaction History (Riwayat Tab)

**User Story:** As a user, I want to browse all past transactions grouped by date, so that I can review and search my spending history.

#### Acceptance Criteria

1. THE App SHALL group all transactions by date, with the most recent date shown first
2. EACH date group SHALL be collapsible; clicking the date row SHALL toggle the visibility of that day's transactions
3. THE App SHALL provide a live search input that filters visible transactions by category, item name, or description
4. WHEN a transaction row in the history list is clicked, THE App SHALL open the transaction detail modal
5. WHEN no transactions match the active search query, THE App SHALL display an empty state message

### Requirement 6: Settings (Pengaturan Tab)

**User Story:** As a user, I want to manage app data and preferences, so that I can maintain the app according to my needs.

#### Acceptance Criteria

1. THE App SHALL display a "Data" accordion section that expands to show "Hapus data" and "Export data" action buttons
2. WHEN "Hapus data" is clicked, THE App SHALL show a confirmation dialog; only upon confirmation SHALL THE App delete all transactions and reset wallets to defaults
3. THE App SHALL display a "Bahasa" accordion section that allows switching between Indonesian and English
4. WHEN a language is selected, THE App SHALL persist the preference to localStorage under `bgt_lang` and re-render all translated text immediately
5. WHEN "Export data" is clicked, THE App SHALL open an export modal offering PDF and Excel (CSV) options
6. WHEN the Excel option is selected, THE App SHALL generate and download a CSV file named `budget-tracker.csv`
7. WHEN the PDF option is selected, THE App SHALL invoke `window.print()` to open the browser's print dialog

### Requirement 7: Navigation

**User Story:** As a user, I want intuitive navigation that works on both desktop and mobile, so that I can switch between views effortlessly on any device.

#### Acceptance Criteria

1. WHILE the viewport width is greater than 600px, THE App SHALL display a horizontal navigation bar in the dark header at the top of the page with the active tab underlined in the primary colour
2. WHILE the viewport width is 600px or less, THE App SHALL hide the desktop header navigation and show a fixed bottom navigation bar with an icon and label for each tab
3. THE active tab SHALL be visually highlighted in both the desktop and mobile navigation bars

### Requirement 8: Toast Notifications

**User Story:** As a user, I want brief confirmation messages after actions, so that I know my operations completed successfully.

#### Acceptance Criteria

1. THE App SHALL display a toast notification at the bottom-centre of the screen after any save, delete, or export action
2. WHEN a toast is shown, THE App SHALL automatically dismiss it after 2500 milliseconds
3. THE toast message text SHALL reflect the current language setting

### Requirement 9: Data Persistence

**User Story:** As a user, I want my data to survive page refreshes and browser restarts, so that I never lose my records unexpectedly.

#### Acceptance Criteria

1. THE App SHALL store all transactions in localStorage under the key `bgt_transactions` as a JSON array
2. THE App SHALL store all wallets in localStorage under the key `bgt_wallets` as a JSON array
3. THE App SHALL store the categories list in localStorage under the key `bgt_categories` as a JSON array
4. THE App SHALL store the language preference in localStorage under the key `bgt_lang` as a string
5. WHEN the page is loaded, THE App SHALL restore all state from localStorage before rendering any tab

### Requirement 10: Accessibility

**User Story:** As a user relying on assistive technologies, I want the app to be screen-reader friendly, so that I can use all features without barriers.

#### Acceptance Criteria

1. THE App SHALL use semantic HTML5 elements throughout, including `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<time>`, and `<ul>`
2. ALL form inputs SHALL have an associated `<label>` element; labels not visible in the design SHALL use the `sr-only` utility class
3. ALL modal dialogs SHALL have `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` pointing to the modal's heading
4. ALL decorative icons and emoji SHALL carry `aria-hidden="true"` to hide them from screen readers
5. DYNAMIC list regions and the date display SHALL carry `aria-live="polite"` so screen readers announce updates
6. THE `<html>` element SHALL carry `lang="id"` as the default document language
