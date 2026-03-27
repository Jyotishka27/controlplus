function addLoan() {
  const loans = loadLoans();

  const name = document.getElementById("loanName").value;
  const total = Number(document.getElementById("loanTotal").value);
  const emi = Number(document.getElementById("loanEMI").value);

  if (!name || !total || !emi) {
    alert("Fill all fields");
    return;
  }

  const loan = {
    id: Date.now(),
    name,
    totalAmount: total,
    remainingAmount: total,
    emi,
    account: "main"
  };

  loans.push(loan);
  saveLoans(loans);

  renderLoans();
  renderNetWorth(); // 🔥 added
}

function renderLoans() {
  const loans = loadLoans();
  const list = document.getElementById("loanList");

  list.innerHTML = "";

  loans.forEach(loan => {
    const li = document.createElement("li");

    li.innerHTML = `
      <b>${loan.name}</b><br>
      Remaining: ₹${loan.remainingAmount} / ₹${loan.totalAmount}<br>
      EMI: ₹${loan.emi}
      <button onclick="payEMI(${loan.id})">Pay EMI</button>
    `;

    list.appendChild(li);
  });
}

function payEMI(id) {
  let loans = loadLoans();
  let entries = loadEntries();

  const loan = loans.find(l => l.id === id);

  if (!loan) return;

  if (loan.remainingAmount <= 0) {
    alert("Loan already paid");
    return;
  }

  const payment = Math.min(loan.emi, loan.remainingAmount);

  loan.remainingAmount -= payment;

  const entry = {
    id: Date.now(),
    amount: payment,
    type: "expense",
    category: "EMI",
    account: "main",
    notes: loan.name,
    date: new Date().toISOString().split("T")[0]
  };

  entries.push(entry);

  saveLoans(loans);
  saveEntries(entries);

  renderLoans();
  renderEntries();
  renderBalances();
  renderNetWorth(); // 🔥 added
}
