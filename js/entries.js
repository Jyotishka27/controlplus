function saveEntry() {
  const entries = loadEntries();

  const amount = Number(document.getElementById("amount").value);

  if (!amount || amount <= 0) {
    alert("Enter valid amount");
    return;
  }

  const entry = {
    id: Date.now(),
    amount,
    type: document.getElementById("type").value,
    category: document.getElementById("category").value,
    account: document.getElementById("account").value,
    notes: document.getElementById("notes").value,
    date: new Date().toISOString().split("T")[0]
  };

  entries.push(entry);
  saveEntries(entries);

  renderEntries();
  renderBalances();
  renderNetWorth();
  renderInsights();
  clearForm();
}

function deleteEntry(id) {
  let entries = loadEntries();
  entries = entries.filter(e => e.id !== id);

  saveEntries(entries);

  renderEntries();
  renderBalances();
  renderNetWorth();
  renderInsights();
}

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

function clearForm() {
  document.getElementById("amount").value = "";
  document.getElementById("notes").value = "";
}
