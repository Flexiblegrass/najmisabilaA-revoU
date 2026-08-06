/* ================================================================
   app.js — Budget Tracker
   TC-1: Vanilla JS only, 1 file | TC-2: localStorage only
================================================================ */

/* ----------------------------------------------------------------
   1. TRANSLATIONS (i18n)
---------------------------------------------------------------- */
const TRANSLATIONS = {
  id: {
    'nav.transaksi':    'Transaksi',
    'nav.dompet':       'Dompet',
    'nav.laporan':      'Laporan',
    'nav.riwayat':      'Riwayat',
    'nav.pengaturan':   'Pengaturan',
    'summary.income':   'Pemasukkan',
    'summary.expense':  'Pengeluaran',
    'summary.balance':  'Saldo Tersisa',
    'summary.items':    'Jumlah Item',
    'btn.new':          'New',
    'btn.simpan':       'Simpan',
    'btn.batal':        'Batal',
    'btn.hapus':        'Hapus',
    'empty.transaction':'Belum ada Transaksi',
    'empty.wallet':     'Belum ada Dompet',
    'empty.laporan':    'Belum ada data pengeluaran',
    'empty.riwayat':    'Belum ada riwayat transaksi',
    'dompet.totalSaldo':'Total Saldo',
    'laporan.harian':   'Harian',
    'laporan.bulanan':  'Bulanan',
    'laporan.tahunan':  'Tahunan',
    'modal.addTitle':   'Tambah Transaksi',
    'modal.editTitle':  'Edit Transaksi',
    'modal.addWallet':  'Tambah Dompet',
    'modal.editWallet': 'Edit Dompet',
    'modal.pilihDompet':'Pilih Opsi Dompet',
    'modal.income':     'Pemasukan',
    'modal.expense':    'Pengeluaran',
    'modal.nominal':    'Masukkan nominal',
    'modal.kategori':   'Masukkan kategori',
    'modal.item':       'Masukkan jenis item',
    'modal.deskripsi':  'Deskripsi (opsional)',
    'modal.sumberBaru': 'Sumber baru',
    'setting.data':     'Data',
    'setting.bahasa':   'Bahasa',
    'setting.hapusData':'Hapus data',
    'setting.exportData':'Export data',
    'export.title':     'Export',
    'confirm.hapusData':'Hapus semua data? Tindakan ini tidak dapat dibatalkan.',
    'riwayat.search':   'Cari',
    'toast.saved':      'Berhasil disimpan',
    'toast.deleted':    'Berhasil dihapus',
    'toast.allDeleted': 'Semua data dihapus',
    'toast.exported':   'Data berhasil diekspor',
    'err.required':     'Semua field wajib diisi.',
    'err.amount':       'Nominal harus lebih dari 0.',
    'err.walletName':   'Nama dompet tidak boleh kosong.',
    'detail.date':      'Tanggal',
    'detail.time':      'Waktu',
    'detail.wallet':    'Dompet',
    'detail.amount':    'Nominal',
    'detail.category':  'Kategori',
    'detail.item':      'Item',
    'detail.desc':      'Deskripsi',
  },
  en: {
    'nav.transaksi':    'Transactions',
    'nav.dompet':       'Wallet',
    'nav.laporan':      'Report',
    'nav.riwayat':      'History',
    'nav.pengaturan':   'Settings',
    'summary.income':   'Income',
    'summary.expense':  'Expenses',
    'summary.balance':  'Balance',
    'summary.items':    'Total Items',
    'btn.new':          'New',
    'btn.simpan':       'Save',
    'btn.batal':        'Cancel',
    'btn.hapus':        'Delete',
    'empty.transaction':'No Transactions Yet',
    'empty.wallet':     'No Wallets Yet',
    'empty.laporan':    'No expense data yet',
    'empty.riwayat':    'No transaction history yet',
    'dompet.totalSaldo':'Total Balance',
    'laporan.harian':   'Daily',
    'laporan.bulanan':  'Monthly',
    'laporan.tahunan':  'Yearly',
    'modal.addTitle':   'Add Transaction',
    'modal.editTitle':  'Edit Transaction',
    'modal.addWallet':  'Add Wallet',
    'modal.editWallet': 'Edit Wallet',
    'modal.pilihDompet':'Select Wallet',
    'modal.income':     'Income',
    'modal.expense':    'Expense',
    'modal.nominal':    'Enter amount',
    'modal.kategori':   'Enter category',
    'modal.item':       'Enter item name',
    'modal.deskripsi':  'Description (optional)',
    'modal.sumberBaru': 'New source',
    'setting.data':     'Data',
    'setting.bahasa':   'Language',
    'setting.hapusData':'Delete data',
    'setting.exportData':'Export data',
    'export.title':     'Export',
    'confirm.hapusData':'Delete all data? This action cannot be undone.',
    'riwayat.search':   'Search',
    'toast.saved':      'Saved successfully',
    'toast.deleted':    'Deleted successfully',
    'toast.allDeleted': 'All data deleted',
    'toast.exported':   'Data exported successfully',
    'err.required':     'All required fields must be filled.',
    'err.amount':       'Amount must be greater than 0.',
    'err.walletName':   'Wallet name cannot be empty.',
    'detail.date':      'Date',
    'detail.time':      'Time',
    'detail.wallet':    'Wallet',
    'detail.amount':    'Amount',
    'detail.category':  'Category',
    'detail.item':      'Item',
    'detail.desc':      'Description',
  }
};

/* ----------------------------------------------------------------
   2. CONSTANTS & STATE
---------------------------------------------------------------- */
const KEYS = {
  transactions: 'bgt_transactions',
  wallets:      'bgt_wallets',
  lang:         'bgt_lang',
  categories:   'bgt_categories',
};

const CATEGORY_COLORS = [
  '#ef4444','#3b82f6','#ec4899','#a855f7',
  '#f97316','#06b6d4','#84cc16','#f59e0b',
  '#14b8a6','#6366f1',
];

const DEFAULT_WALLETS = [
  { id: 'w1', name: 'BRI',       balance: 0 },
  { id: 'w2', name: 'BNI',       balance: 0 },
  { id: 'w3', name: 'Mandiri',   balance: 0 },
  { id: 'w4', name: 'BSI',       balance: 0 },
  { id: 'w5', name: 'Uang Tunai',balance: 0 },
];

const DEFAULT_CATEGORIES = ['Makanan', 'Transportasi', 'Hiburan', 'Kendaraan', 'Kesehatan', 'Belanja', 'Tagihan', 'Lainnya'];

let state = {
  transactions: [],   // { id, date, time, walletId, type, amount, category, item, desc }
  wallets:      [],   // { id, name, balance }
  categories:   [],
  lang:         'id',
  activeTab:    'transaksi',
  editMode:     false,      // transaksi edit mode
  dompetEditMode: false,    // dompet edit mode
  laporan: { period: 'harian' },
  editingTxId:  null,       // id of transaction being edited
  editingWalletId: null,    // id of wallet being edited
};

/* ----------------------------------------------------------------
   3. LOCALSTORAGE
---------------------------------------------------------------- */
function loadStorage() {
  try {
    const tx = localStorage.getItem(KEYS.transactions);
    state.transactions = tx ? JSON.parse(tx) : [];
  } catch(e) { state.transactions = []; }

  try {
    const wl = localStorage.getItem(KEYS.wallets);
    state.wallets = wl ? JSON.parse(wl) : JSON.parse(JSON.stringify(DEFAULT_WALLETS));
  } catch(e) { state.wallets = JSON.parse(JSON.stringify(DEFAULT_WALLETS)); }

  try {
    const cats = localStorage.getItem(KEYS.categories);
    state.categories = cats ? JSON.parse(cats) : [...DEFAULT_CATEGORIES];
  } catch(e) { state.categories = [...DEFAULT_CATEGORIES]; }

  state.lang = localStorage.getItem(KEYS.lang) || 'id';
}

function saveTransactions() {
  localStorage.setItem(KEYS.transactions, JSON.stringify(state.transactions));
}
function saveWallets() {
  localStorage.setItem(KEYS.wallets, JSON.stringify(state.wallets));
}
function saveCategories() {
  localStorage.setItem(KEYS.categories, JSON.stringify(state.categories));
}

function populateCategoryDatalist() {
  const dl = document.getElementById('category-datalist');
  if (!dl) return;
  dl.innerHTML = '';
  state.categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    dl.appendChild(opt);
  });
}
function saveLang() {
  localStorage.setItem(KEYS.lang, state.lang);
}

/* ----------------------------------------------------------------
   4. HELPERS
---------------------------------------------------------------- */
function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function t(key) {
  return (TRANSLATIONS[state.lang] || TRANSLATIONS.id)[key] || key;
}

function formatRp(amount) {
  return 'Rp.' + Number(amount).toLocaleString('id-ID');
}

function formatRpSign(amount, type) {
  const sign = type === 'income' ? '+' : '-';
  return sign + 'Rp. ' + Number(amount).toLocaleString('id-ID');
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function nowTime() {
  const d = new Date();
  return d.toTimeString().slice(0, 5);
}

function formatDateLabel(isoDate) {
  const d = new Date(isoDate + 'T00:00:00');
  return d.toLocaleDateString(state.lang === 'id' ? 'id-ID' : 'en-GB',
    { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function formatDateShort(isoDate) {
  const d = new Date(isoDate + 'T00:00:00');
  return d.toLocaleDateString(state.lang === 'id' ? 'id-ID' : 'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' });
}

/* ----------------------------------------------------------------
   5. i18n — apply translations to DOM
---------------------------------------------------------------- */
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });
  // mark active language button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active-lang', btn.dataset.lang === state.lang);
  });
  // update current date label
  const cd = document.getElementById('current-date');
  if (cd) cd.textContent = formatDateLabel(todayISO());
}

/* ----------------------------------------------------------------
   6. TAB NAVIGATION
---------------------------------------------------------------- */
function switchTab(tabName) {
  state.activeTab = tabName;
  // hide all views
  document.querySelectorAll('.tab-view').forEach(v => v.classList.add('hidden'));
  const target = document.getElementById('tab-' + tabName);
  if (target) { target.classList.remove('hidden'); }
  // update desktop nav
  document.querySelectorAll('#main-nav .nav-link').forEach(a => {
    a.classList.toggle('active', a.dataset.tab === tabName);
  });
  // update bottom nav
  document.querySelectorAll('#bottom-nav .bnav-item').forEach(a => {
    a.classList.toggle('active', a.dataset.tab === tabName);
  });
  // render the target tab
  if (tabName === 'transaksi') renderTransaksi();
  if (tabName === 'dompet')    renderDompet();
  if (tabName === 'laporan')   renderLaporan();
  if (tabName === 'riwayat')   renderRiwayat();
}

/* ----------------------------------------------------------------
   7. TOAST
---------------------------------------------------------------- */
let toastTimer = null;
function showToast(msgKey) {
  const toast = document.getElementById('toast');
  const msg   = document.getElementById('toast-message');
  msg.textContent = t(msgKey);
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

/* ----------------------------------------------------------------
   8. TRANSAKSI TAB — render
---------------------------------------------------------------- */
function getTransaksiSummary() {
  let income = 0, expense = 0;
  state.transactions.forEach(tx => {
    if (tx.type === 'income')  income  += Number(tx.amount);
    else                       expense += Number(tx.amount);
  });
  return { income, expense, balance: income - expense, items: state.transactions.length };
}

function renderTransaksi() {
  const { income, expense, balance, items } = getTransaksiSummary();
  document.getElementById('total-income').textContent    = formatRp(income);
  document.getElementById('total-expense').textContent   = formatRp(expense);
  const balEl = document.getElementById('remaining-balance');
  balEl.textContent = formatRp(balance);
  balEl.classList.toggle('negative', balance < 0);
  document.getElementById('total-items').textContent     = items;

  const list = document.getElementById('expense-list');
  const empty = document.getElementById('empty-state');
  list.innerHTML = '';

  if (state.transactions.length === 0) {
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  // sort newest first
  const sorted = [...state.transactions].sort((a, b) =>
    (b.date + b.time).localeCompare(a.date + a.time));

  sorted.forEach(tx => {
    const li = document.createElement('li');
    const isIncome = tx.type === 'income';
    li.innerHTML = `
      <div class="expense-info" data-id="${tx.id}" style="cursor:pointer">
        <span class="expense-name">${escHtml(tx.category)}</span>
        <span class="expense-desc">${escHtml(tx.item)}</span>
      </div>
      <span class="expense-amount ${isIncome ? 'income' : 'expense'}">
        ${formatRpSign(tx.amount, tx.type)}
      </span>
      <span class="tx-chevron" data-id="${tx.id}" style="cursor:pointer;color:#94a3b8">›</span>
      ${state.editMode ? `
        <div class="item-actions">
          <button class="btn-edit"   data-id="${tx.id}" title="Edit">✏️</button>
          <button class="btn-delete" data-id="${tx.id}" title="Hapus">🗑</button>
        </div>` : ''}
    `;
    list.appendChild(li);
  });
}

function escHtml(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ----------------------------------------------------------------
   9. TRANSACTION MODAL — open / save / close
---------------------------------------------------------------- */
function openTransactionModal(txId) {
  state.editingTxId = txId || null;
  const overlay = document.getElementById('transaction-modal-overlay');
  const title   = document.getElementById('modal-title');
  const errEl   = document.getElementById('form-error');
  errEl.classList.add('hidden');
  errEl.textContent = '';

  // populate wallet dropdown
  const walletSel = document.getElementById('field-wallet');
  walletSel.innerHTML = `<option value="">${t('modal.pilihDompet')}</option>`;
  state.wallets.forEach(w => {
    const opt = document.createElement('option');
    opt.value = w.id;
    opt.textContent = w.name;
    walletSel.appendChild(opt);
  });

  if (txId) {
    // edit mode — prefill
    title.textContent = t('modal.editTitle');
    const tx = state.transactions.find(t => t.id === txId);
    if (tx) {
      document.getElementById('field-date').value     = tx.date;
      document.getElementById('field-time').value     = tx.time;
      document.getElementById('field-wallet').value   = tx.walletId;
      document.getElementById('field-type').value     = tx.type;
      document.getElementById('field-amount').value   = tx.amount;
      document.getElementById('field-category').value = tx.category;
      document.getElementById('field-item').value     = tx.item;
      document.getElementById('field-desc').value     = tx.desc || '';
    }
  } else {
    // new transaction — defaults
    title.textContent = t('modal.addTitle');
    document.getElementById('field-date').value     = todayISO();
    document.getElementById('field-time').value     = nowTime();
    document.getElementById('field-wallet').value   = '';
    document.getElementById('field-type').value     = 'income';
    document.getElementById('field-amount').value   = '';
    document.getElementById('field-category').value = '';
    document.getElementById('field-item').value     = '';
    document.getElementById('field-desc').value     = '';
  }
  populateCategoryDatalist();
  overlay.classList.remove('hidden');
}

function closeTransactionModal() {
  document.getElementById('transaction-modal-overlay').classList.add('hidden');
  state.editingTxId = null;
}

function saveTransaction() {
  const errEl    = document.getElementById('form-error');
  const date     = document.getElementById('field-date').value.trim();
  const time     = document.getElementById('field-time').value.trim();
  const walletId = document.getElementById('field-wallet').value;
  const type     = document.getElementById('field-type').value;
  const amount   = Number(document.getElementById('field-amount').value);
  const category = document.getElementById('field-category').value.trim();
  const item     = document.getElementById('field-item').value.trim();
  const desc     = document.getElementById('field-desc').value.trim();

  if (!date || !walletId || !category || !item) {
    errEl.textContent = t('err.required');
    errEl.classList.remove('hidden');
    return;
  }
  if (!amount || amount <= 0) {
    errEl.textContent = t('err.amount');
    errEl.classList.remove('hidden');
    return;
  }

  if (state.editingTxId) {
    // update existing
    const idx = state.transactions.findIndex(t => t.id === state.editingTxId);
    if (idx !== -1) {
      state.transactions[idx] = { ...state.transactions[idx], date, time, walletId, type, amount, category, item, desc };
    }
  } else {
    // add new
    state.transactions.push({ id: uid(), date, time, walletId, type, amount, category, item, desc });
  }

  if (category && !state.categories.includes(category)) {
    state.categories.push(category);
    saveCategories();
  }
  saveTransactions();
  closeTransactionModal();
  renderTransaksi();
  showToast('toast.saved');
}

/* ----------------------------------------------------------------
   10. DELETE TRANSACTION
---------------------------------------------------------------- */
function deleteTransaction(txId) {
  state.transactions = state.transactions.filter(t => t.id !== txId);
  saveTransactions();
  renderTransaksi();
  showToast('toast.deleted');
}

/* ----------------------------------------------------------------
   11. DOMPET TAB — render
---------------------------------------------------------------- */
function getTotalSaldo() {
  return state.wallets.reduce((s, w) => s + Number(w.balance), 0);
}

function getWalletDisplayBalance(walletId) {
  const wallet = state.wallets.find(w => w.id === walletId);
  if (!wallet) return 0;
  let balance = Number(wallet.balance);
  state.transactions.forEach(tx => {
    if (tx.walletId !== walletId) return;
    if (tx.type === 'income')  balance += Number(tx.amount);
    else                       balance -= Number(tx.amount);
  });
  return balance;
}

function getTotalDisplaySaldo() {
  return state.wallets.reduce((sum, w) => sum + getWalletDisplayBalance(w.id), 0);
}

function renderDompet() {
  document.getElementById('total-saldo').textContent = formatRp(getTotalDisplaySaldo());

  const list  = document.getElementById('wallet-list');
  const empty = document.getElementById('wallet-empty-state');
  list.innerHTML = '';

  if (state.wallets.length === 0) {
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  state.wallets.forEach(w => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="wallet-name">${escHtml(w.name)}</span>
      <span class="wallet-amount">${formatRp(getWalletDisplayBalance(w.id))}</span>
      <span style="color:#94a3b8;margin-left:8px">›</span>
      ${state.dompetEditMode ? `
        <div class="item-actions">
          <button class="btn-edit btn-edit-wallet" data-id="${w.id}" title="Edit">✏️</button>
        </div>` : ''}
    `;
    list.appendChild(li);
  });
}

/* ----------------------------------------------------------------
   12. WALLET MODAL — open / save / close
---------------------------------------------------------------- */
function openWalletModal(walletId) {
  state.editingWalletId = walletId || null;
  const overlay = document.getElementById('wallet-modal-overlay');
  const title   = document.getElementById('wallet-modal-title');
  const errEl   = document.getElementById('wallet-form-error');
  errEl.classList.add('hidden');

  if (walletId) {
    title.textContent = t('modal.editWallet');
    const w = state.wallets.find(w => w.id === walletId);
    if (w) {
      document.getElementById('field-wallet-name').value   = w.name;
      document.getElementById('field-wallet-amount').value = w.balance;
    }
  } else {
    title.textContent = t('modal.addWallet');
    document.getElementById('field-wallet-name').value   = '';
    document.getElementById('field-wallet-amount').value = '';
  }
  overlay.classList.remove('hidden');
}

function closeWalletModal() {
  document.getElementById('wallet-modal-overlay').classList.add('hidden');
  state.editingWalletId = null;
}

function saveWallet() {
  const errEl  = document.getElementById('wallet-form-error');
  const name   = document.getElementById('field-wallet-name').value.trim();
  const amount = Number(document.getElementById('field-wallet-amount').value);

  if (!name) {
    errEl.textContent = t('err.walletName');
    errEl.classList.remove('hidden');
    return;
  }

  if (state.editingWalletId) {
    const idx = state.wallets.findIndex(w => w.id === state.editingWalletId);
    if (idx !== -1) {
      state.wallets[idx] = { ...state.wallets[idx], name, balance: isNaN(amount) ? 0 : amount };
    }
  } else {
    state.wallets.push({ id: uid(), name, balance: isNaN(amount) ? 0 : amount });
  }

  saveWallets();
  closeWalletModal();
  renderDompet();
  showToast('toast.saved');
}

/* ----------------------------------------------------------------
   13. LAPORAN TAB — render with Canvas pie chart
---------------------------------------------------------------- */
function getFilteredExpenses(period) {
  const now = new Date();
  return state.transactions.filter(tx => {
    if (tx.type !== 'expense') return false;
    const d = new Date(tx.date + 'T00:00:00');
    if (period === 'harian')  return tx.date === todayISO();
    if (period === 'bulanan') return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    if (period === 'tahunan') return d.getFullYear() === now.getFullYear();
    return false;
  });
}

function getLaporanPeriodLabel(period) {
  const now = new Date();
  if (period === 'harian') {
    return formatDateLabel(todayISO());
  }
  if (period === 'bulanan') {
    const y = now.getFullYear();
    const m = now.getMonth();
    const first = new Date(y, m, 1);
    const last  = new Date(y, m + 1, 0);
    const opts = { day: 'numeric', month: 'long', year: 'numeric' };
    const loc  = state.lang === 'id' ? 'id-ID' : 'en-GB';
    return `${first.toLocaleDateString(loc, opts)} - ${last.toLocaleDateString(loc, opts)}`;
  }
  if (period === 'tahunan') return String(now.getFullYear());
  return '';
}

function renderLaporan() {
  const period = state.laporan.period;

  // period label
  document.getElementById('laporan-period-label').textContent = getLaporanPeriodLabel(period);

  // active tab button
  document.querySelectorAll('.period-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.period === period);
  });

  const expenses = getFilteredExpenses(period);
  const canvas   = document.getElementById('pie-chart');
  const emptyMsg = document.getElementById('chart-empty-msg');
  const legend   = document.getElementById('category-legend');
  legend.innerHTML = '';

  if (expenses.length === 0) {
    emptyMsg.classList.remove('hidden');
    canvas.classList.add('hidden');
    return;
  }
  emptyMsg.classList.add('hidden');
  canvas.classList.remove('hidden');

  // group by category
  const catMap = {};
  expenses.forEach(tx => {
    const cat = tx.category || 'Lainnya';
    catMap[cat] = (catMap[cat] || 0) + Number(tx.amount);
  });
  const total = Object.values(catMap).reduce((s, v) => s + v, 0);
  const cats  = Object.entries(catMap).sort((a, b) => b[1] - a[1]);

  // assign colors
  const colorMap = {};
  cats.forEach(([cat], i) => { colorMap[cat] = CATEGORY_COLORS[i % CATEGORY_COLORS.length]; });

  // draw pie chart
  drawPieChart(canvas, cats, colorMap, total);

  // build legend
  cats.forEach(([cat, val]) => {
    const pct = Math.round((val / total) * 100);
    const li  = document.createElement('li');
    li.innerHTML = `
      <span class="legend-name">${escHtml(cat)}</span>
      <span class="legend-pct" style="background:${colorMap[cat]}">${pct}%</span>
    `;
    legend.appendChild(li);
  });
}

function drawPieChart(canvas, cats, colorMap, total) {
  const ctx = canvas.getContext('2d');
  const cx  = canvas.width  / 2;
  const cy  = canvas.height / 2;
  const r   = Math.min(cx, cy) - 10;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let startAngle = -Math.PI / 2;
  cats.forEach(([cat, val]) => {
    const slice = (val / total) * 2 * Math.PI;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, startAngle, startAngle + slice);
    ctx.closePath();
    ctx.fillStyle = colorMap[cat];
    ctx.fill();
    startAngle += slice;
  });

  // white donut hole
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.5, 0, 2 * Math.PI);
  ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--color-bg').trim() || '#f3f4f6';
  ctx.fill();
}

/* ----------------------------------------------------------------
   14. RIWAYAT TAB — render
---------------------------------------------------------------- */
function renderRiwayat(searchQuery) {
  const list  = document.getElementById('riwayat-list');
  const empty = document.getElementById('riwayat-empty-state');
  list.innerHTML = '';
  const query = (searchQuery || '').toLowerCase().trim();

  // group transactions by date
  const grouped = {};
  state.transactions.forEach(tx => {
    if (query) {
      const match = tx.category.toLowerCase().includes(query) ||
                    tx.item.toLowerCase().includes(query) ||
                    (tx.desc || '').toLowerCase().includes(query);
      if (!match) return;
    }
    if (!grouped[tx.date]) grouped[tx.date] = [];
    grouped[tx.date].push(tx);
  });

  const dates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  if (dates.length === 0) {
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  dates.forEach(date => {
    const txs = grouped[date].sort((a, b) => b.time.localeCompare(a.time));
    const li  = document.createElement('li');
    li.className = 'riwayat-date-row';

    const bodyId = 'rw-body-' + date;
    li.innerHTML = `
      <button class="riwayat-date-trigger" data-body="${bodyId}">
        <span>${formatDateLabel(date)}</span>
        <span class="riwayat-arrow">›</span>
      </button>
      <div class="riwayat-date-body hidden" id="${bodyId}">
        ${txs.map(tx => `
          <div class="riwayat-tx-row" data-id="${tx.id}">
            <div class="riwayat-tx-info">
              <span class="riwayat-tx-name">${escHtml(tx.category)}</span>
              <span class="riwayat-tx-cat">${escHtml(tx.item)}</span>
            </div>
            <span class="riwayat-tx-amount ${tx.type === 'income' ? 'income' : 'expense'}">
              ${formatRpSign(tx.amount, tx.type)}
            </span>
          </div>
        `).join('')}
      </div>
    `;
    list.appendChild(li);
  });
}

/* ----------------------------------------------------------------
   15. DETAIL MODAL (from Riwayat)
---------------------------------------------------------------- */
function openDetailModal(txId) {
  const tx = state.transactions.find(t => t.id === txId);
  if (!tx) return;
  const overlay = document.getElementById('detail-modal-overlay');
  const title   = document.getElementById('detail-modal-title');
  const body    = document.getElementById('detail-modal-body');
  const isIncome = tx.type === 'income';

  title.textContent = isIncome ? t('modal.income') : t('modal.expense');

  const wallet = state.wallets.find(w => w.id === tx.walletId);
  const rows = [
    [t('detail.date'),     formatDateShort(tx.date)],
    [t('detail.time'),     tx.time],
    [t('detail.wallet'),   wallet ? wallet.name : tx.walletId],
    [t('detail.amount'),   formatRp(tx.amount)],
    [t('detail.category'), tx.category],
    [t('detail.item'),     tx.item],
  ];
  if (tx.desc) rows.push([t('detail.desc'), tx.desc]);

  body.innerHTML = `
    <div class="detail-type-icon">${isIncome ? '💰' : '💸'}</div>
    <div class="detail-type-label" style="color:${isIncome ? '#10b981' : '#ef4444'}">
      ${isIncome ? t('modal.income') : t('modal.expense')}
    </div>
    <div class="detail-body" style="margin-top:12px">
      ${rows.map((r, i) => `
        <div class="detail-row ${i === 0 ? 'detail-row-first' : ''} ${i === rows.length-1 ? 'detail-row-last' : ''}">
          <strong>${escHtml(r[0])}: </strong>${escHtml(r[1])}
        </div>
      `).join('')}
    </div>
  `;
  overlay.classList.remove('hidden');
}

function closeDetailModal() {
  document.getElementById('detail-modal-overlay').classList.add('hidden');
}

/* ----------------------------------------------------------------
   16. PENGATURAN — accordion, language, export, delete
---------------------------------------------------------------- */
function toggleAccordion(accordionId) {
  const el    = document.getElementById(accordionId);
  const body  = el.querySelector('.accordion-body');
  const arrow = el.querySelector('.accordion-arrow');
  const open  = body.classList.toggle('hidden') === false;
  arrow.textContent = open ? '▼' : '▶';
}

function clearAllData() {
  state.transactions = [];
  state.wallets = JSON.parse(JSON.stringify(DEFAULT_WALLETS));
  saveTransactions();
  saveWallets();
  renderTransaksi();
  renderDompet();
  showToast('toast.allDeleted');
}

/* Export helpers — no external library, pure browser APIs */
function exportCSV() {
  const headers = ['Date','Time','Wallet','Type','Amount','Category','Item','Description'];
  const rows = state.transactions.map(tx => {
    const wallet = state.wallets.find(w => w.id === tx.walletId);
    return [
      tx.date, tx.time,
      wallet ? wallet.name : tx.walletId,
      tx.type, tx.amount,
      tx.category, tx.item, tx.desc || ''
    ].map(v => `"${String(v).replace(/"/g,'""')}"`).join(',');
  });
  const csv  = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'budget-tracker.csv';
  a.click();
  URL.revokeObjectURL(url);
  showToast('toast.exported');
}

function exportPDF() {
  // use browser's print dialog — clean print stylesheet could be added later
  window.print();
}

/* ----------------------------------------------------------------
   17. CONFIRM DIALOG
---------------------------------------------------------------- */
let confirmCallback = null;
function showConfirm(msgKey, callback) {
  confirmCallback = callback;
  document.getElementById('confirm-message').textContent = t(msgKey);
  document.getElementById('confirm-overlay').classList.remove('hidden');
}
function closeConfirm() {
  document.getElementById('confirm-overlay').classList.add('hidden');
  confirmCallback = null;
}

/* ----------------------------------------------------------------
   18. EVENT LISTENERS
---------------------------------------------------------------- */
function bindEvents() {

  /* ---- TAB NAVIGATION ---- */
  document.querySelectorAll('[data-tab]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      switchTab(el.dataset.tab);
    });
  });

  /* ---- TRANSAKSI: edit mode toggle ---- */
  document.getElementById('btn-toggle-edit').addEventListener('click', () => {
    state.editMode = !state.editMode;
    renderTransaksi();
  });

  /* ---- TRANSAKSI: + New button ---- */
  document.getElementById('btn-new-transaction').addEventListener('click', () => {
    state.editMode = false;
    openTransactionModal(null);
  });

  /* ---- TRANSAKSI: delegated list events (edit / delete / detail) ---- */
  document.getElementById('expense-list').addEventListener('click', e => {
    const editBtn   = e.target.closest('.btn-edit:not(.btn-edit-wallet)');
    const deleteBtn = e.target.closest('.btn-delete');
    const chevron   = e.target.closest('.tx-chevron');
    const infoEl    = e.target.closest('.expense-info');

    if (editBtn)   { openTransactionModal(editBtn.dataset.id);   return; }
    if (deleteBtn) { deleteTransaction(deleteBtn.dataset.id);    return; }
    if (chevron)   { openDetailModal(chevron.dataset.id);        return; }
    if (infoEl)    { openDetailModal(infoEl.dataset.id);         return; }
  });

  /* ---- TRANSACTION MODAL: close & save ---- */
  document.getElementById('btn-modal-close').addEventListener('click', closeTransactionModal);
  document.getElementById('transaction-modal-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeTransactionModal();
  });
  document.getElementById('btn-save-transaction').addEventListener('click', saveTransaction);

  /* ---- DOMPET: edit mode toggle ---- */
  document.getElementById('btn-toggle-dompet-edit').addEventListener('click', () => {
    state.dompetEditMode = !state.dompetEditMode;
    renderDompet();
  });

  /* ---- DOMPET: + New wallet ---- */
  document.getElementById('btn-new-wallet').addEventListener('click', () => {
    state.dompetEditMode = false;
    openWalletModal(null);
  });

  /* ---- DOMPET: delegated edit ---- */
  document.getElementById('wallet-list').addEventListener('click', e => {
    const editBtn = e.target.closest('.btn-edit-wallet');
    if (editBtn) openWalletModal(editBtn.dataset.id);
  });

  /* ---- WALLET MODAL: close & save ---- */
  document.getElementById('btn-wallet-modal-close').addEventListener('click', closeWalletModal);
  document.getElementById('wallet-modal-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeWalletModal();
  });
  document.getElementById('btn-save-wallet').addEventListener('click', saveWallet);

  /* ---- LAPORAN: period tabs ---- */
  document.querySelectorAll('.period-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.laporan.period = btn.dataset.period;
      renderLaporan();
    });
  });

  /* ---- RIWAYAT: search ---- */
  document.getElementById('riwayat-search').addEventListener('input', e => {
    renderRiwayat(e.target.value);
  });

  /* ---- RIWAYAT: date row expand/collapse (delegated) ---- */
  document.getElementById('riwayat-list').addEventListener('click', e => {
    const trigger = e.target.closest('.riwayat-date-trigger');
    const txRow   = e.target.closest('.riwayat-tx-row');
    if (trigger) {
      const body = document.getElementById(trigger.dataset.body);
      if (body) body.classList.toggle('hidden');
      return;
    }
    if (txRow) { openDetailModal(txRow.dataset.id); }
  });

  /* ---- DETAIL MODAL: close ---- */
  document.getElementById('btn-detail-close').addEventListener('click', closeDetailModal);
  document.getElementById('detail-modal-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeDetailModal();
  });

  /* ---- PENGATURAN: accordion triggers ---- */
  document.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => toggleAccordion(btn.dataset.target));
  });

  /* ---- PENGATURAN: Hapus data ---- */
  document.getElementById('btn-hapus-data').addEventListener('click', () => {
    showConfirm('confirm.hapusData', clearAllData);
  });

  /* ---- PENGATURAN: Export data ---- */
  document.getElementById('btn-export-data').addEventListener('click', () => {
    document.getElementById('export-modal-overlay').classList.remove('hidden');
  });

  /* ---- EXPORT MODAL ---- */
  document.getElementById('btn-export-close').addEventListener('click', () => {
    document.getElementById('export-modal-overlay').classList.add('hidden');
  });
  document.getElementById('export-modal-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget)
      document.getElementById('export-modal-overlay').classList.add('hidden');
  });
  document.getElementById('btn-export-pdf').addEventListener('click', () => {
    document.getElementById('export-modal-overlay').classList.add('hidden');
    exportPDF();
  });
  document.getElementById('btn-export-excel').addEventListener('click', () => {
    document.getElementById('export-modal-overlay').classList.add('hidden');
    exportCSV();
  });

  /* ---- CONFIRM DIALOG ---- */
  document.getElementById('btn-confirm-cancel').addEventListener('click', closeConfirm);
  document.getElementById('btn-confirm-ok').addEventListener('click', () => {
    closeConfirm();
    if (confirmCallback) confirmCallback();
  });
  document.getElementById('confirm-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeConfirm();
  });

  /* ---- LANGUAGE BUTTONS ---- */
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.lang = btn.dataset.lang;
      saveLang();
      applyTranslations();
      // re-render current tab
      switchTab(state.activeTab);
      showToast('toast.saved');
    });
  });
}

/* ----------------------------------------------------------------
   19. INIT
---------------------------------------------------------------- */
function init() {
  loadStorage();
  applyTranslations();
  bindEvents();
  switchTab('transaksi');
}

init();
