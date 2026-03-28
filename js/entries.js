function getCategoryIcon(category) {
  const icons = {
    Food: "🍔",
    Petrol: "⛽",
    EMI: "💳",
    LIC: "🛡️",
    Shopping: "🛍️",
    Other: "📦"
  };
  return icons[category] || "📌";
}

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
  const list = document.getElementById("entriesList");

  list.innerHTML = "";

  const reversed = [...entries].reverse();

  reversed.forEach(e => {
    list.innerHTML += `
      <tr class="border-b hover:bg-gray-50">
        <td class="py-2">₹${e.amount}</td>
        <td class="capitalize">${e.type}</td>
        <td>${e.category}</td>
        <td class="capitalize">${e.account}</td>
      </tr>
    `;
  });
}

function clearForm() {
  document.getElementById("amount").value = "";
}
