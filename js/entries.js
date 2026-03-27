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
  const list = document.getElementById("entryList");

  list.innerHTML = "";

  const reversed = [...entries].reverse();

  reversed.forEach(e => {
    const li = document.createElement("li");

    li.className = `entry-item entry-${e.type}`;

    li.innerHTML = `
      <div class="entry-left">

        <div class="entry-title">
          ${getCategoryIcon(e.category)} ${e.category}
        </div>

        <div class="entry-sub">
          ${e.type.toUpperCase()} • ${e.account}
        </div>

        ${e.notes ? `<div class="entry-sub">${e.notes}</div>` : ""}

        <div class="entry-sub">
          ${new Date(e.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short"
          })}
        </div>

        <button class="delete-btn" onclick="deleteEntry(${e.id})">
          Delete
        </button>

      </div>

      <div class="entry-amount amount-${e.type}">
        ₹${e.amount}
      </div>
    `;

    list.appendChild(li);
  });
}

function clearForm() {
  document.getElementById("amount").value = "";
  document.getElementById("notes").value = "";
}
