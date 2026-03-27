const STORAGE_KEY = "vault_entries";
const BALANCE_KEY = "vault_balances";

// Default balances
const defaultBalances = {
  main: 0,
  savingsA: 0,
  savingsB: 0
};

// =======================
// STORAGE FUNCTIONS
// =======================

// Load entries
function loadEntries() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Save entries
function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

// Load balances
function loadBalances() {
  const data = localStorage.getItem(BALANCE_KEY);
  return data ? JSON.parse(data) : { ...defaultBalances };
}

// Save balances
function saveBalances(balances) {
  localStorage.setItem(BALANCE_KEY, JSON.stringify(balances));
}

// =======================
// CORE LOGIC
// =======================

// Update balances based on entry
function updateBalances(entry) {
  const balances = loadBalances();

  if (entry.type === "expense") {
    balances[entry.account] -= entry.amount;
  }

  else if (entry.type === "investment") {
    // from main → to selected savings
    balances.main -= entry.amount;
    balances[entry.account] += entry.amount;
  }

  else if (entry.type === "transfer") {
    // for now: main → selected account
    balances.main -= entry.amount;
    balances[entry.account] += entry.amount;
  }

  saveBalances(balances);
}

// =======================
// SAVE ENTRY
// =======================

function saveEntry() {
  const entries = loadEntries();

  const amount = Number(document.getElementById("amount").value);

  // Basic validation
  if (!amount || amount <= 0) {
    alert("Enter a valid amount");
    return;
  }

  const entry = {
    id: Date.now(),
    amount: amount,
    type: document.getElementById("type").value,
    category: document.getElementById("category").value,
    account: document.getElementById("account").value,
    notes: document.getElementById("notes").value,
    date: new Date().toISOString().split("T")[0]
  };

  // Save entry
  entries.push(entry);
  saveEntries(entries);

  // Update balances
  updateBalances(entry);

  // Refresh UI
  renderEntries();
  renderBalances();
  clearForm();
}

// =======================
// RENDER FUNCTIONS
// =======================

// Render entry list
function renderEntries() {
  const entries = loadEntries();
  const list = document.getElementById("entryList");

  list.innerHTML = "";

  entries.forEach(e => {
    const li = document.createElement("li");

    li.textContent = `₹${e.amount} | ${e.type.toUpperCase()} | ${e.category} | ${e.account}`;

    list.appendChild(li);
  });
}

// Render balances
function renderBalances() {
  const balances = loadBalances();

  document.getElementById("mainBalance").textContent = balances.main;
  document.getElementById("savingsABalance").textContent = balances.savingsA;
  document.getElementById("savingsBBalance").textContent = balances.savingsB;
}

// =======================
// UTIL
// =======================

// Clear form after save
function clearForm() {
  document.getElementById("amount").value = "";
  document.getElementById("notes").value = "";
}

// =======================
// INIT
// =======================

// Initial render on load
renderEntries();
renderBalances();
