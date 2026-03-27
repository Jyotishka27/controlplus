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

function loadEntries() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function loadBalances() {
  const data = localStorage.getItem(BALANCE_KEY);
  return data ? JSON.parse(data) : { ...defaultBalances };
}

function saveBalances(balances) {
  localStorage.setItem(BALANCE_KEY, JSON.stringify(balances));
}

// =======================
// BALANCE LOGIC
// =======================

function updateBalances(entry) {
  const balances = loadBalances();

  if (entry.type === "expense") {
    balances[entry.account] -= entry.amount;
  }

  else if (entry.type === "investment") {
    balances.main -= entry.amount;
    balances[entry.account] += entry.amount;
  }

  else if (entry.type === "transfer") {
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

  entries.push(entry);
  saveEntries(entries);

  updateBalances(entry);

  renderEntries();
  renderBalances();
  clearForm();
}

// =======================
// DELETE ENTRY
// =======================

function deleteEntry(id) {
  let entries = loadEntries();

  entries = entries.filter(e => e.id !== id);

  saveEntries(entries);

  // NOTE: balances not recalculated yet
  renderEntries();
}

// =======================
// RENDER FUNCTIONS
// =======================

function renderEntries() {
  const entries = loadEntries();
  const list = document.getElementById("entryList");

  list.innerHTML = "";

  const reversed = [...entries].reverse();

  reversed.forEach(e => {
    const li = document.createElement("li");

    li.innerHTML = `
      ₹${e.amount} | ${e.type.toUpperCase()} | <b>${e.category}</b> | ${e.account}
      <button onclick="deleteEntry(${e.id})">❌</button>
    `;

    list.appendChild(li);
  });
}

function renderBalances() {
  const balances = loadBalances();

  document.getElementById("mainBalance").textContent = balances.main;
  document.getElementById("savingsABalance").textContent = balances.savingsA;
  document.getElementById("savingsBBalance").textContent = balances.savingsB;
}

// =======================
// UTIL
// =======================

function clearForm() {
  document.getElementById("amount").value = "";
  document.getElementById("notes").value = "";
}

// =======================
// UX IMPROVEMENTS
// =======================

// Auto focus
document.getElementById("amount").focus();

// Enter key to save
document.getElementById("amount").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    saveEntry();
  }
});

// =======================
// INIT
// =======================

renderEntries();
renderBalances();
