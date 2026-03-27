const STORAGE_KEY = "vault_entries";
const LOAN_KEY = "vault_loans";

// Entries
function loadEntries() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

// Loans
function loadLoans() {
  const data = localStorage.getItem(LOAN_KEY);
  return data ? JSON.parse(data) : [];
}

function saveLoans(loans) {
  localStorage.setItem(LOAN_KEY, JSON.stringify(loans));
}
