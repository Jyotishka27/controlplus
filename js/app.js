const STORAGE_KEY = "vault_entries";

// Load entries from localStorage
function loadEntries() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Save entries to localStorage
function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

// Add new entry
function saveEntry() {
  const entries = loadEntries();

  const entry = {
    id: Date.now(),
    amount: Number(document.getElementById("amount").value),
    type: document.getElementById("type").value,
    category: document.getElementById("category").value,
    account: document.getElementById("account").value,
    notes: document.getElementById("notes").value,
    date: new Date().toISOString().split("T")[0]
  };

  entries.push(entry);
  saveEntries(entries);

  renderEntries();
  clearForm();
}

// Show entries
function renderEntries() {
  const entries = loadEntries();
  const list = document.getElementById("entryList");

  list.innerHTML = "";

  entries.forEach(e => {
    const li = document.createElement("li");
    li.textContent = `₹${e.amount} - ${e.category} (${e.account})`;
    list.appendChild(li);
  });
}

// Clear form after save
function clearForm() {
  document.getElementById("amount").value = "";
  document.getElementById("notes").value = "";
}

// Load on page start
renderEntries();
