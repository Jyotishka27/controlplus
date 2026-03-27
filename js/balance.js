function calculateBalances() {
  const entries = loadEntries();

  const balances = {
    main: 0,
    savingsA: 0,
    savingsB: 0
  };

  entries.forEach(entry => {
    if (entry.type === "expense") {
      balances[entry.account] -= entry.amount;
    }

    else if (entry.type === "investment" || entry.type === "transfer") {
      balances.main -= entry.amount;
      balances[entry.account] += entry.amount;
    }
  });

  return balances;
}

function renderBalances() {
  const balances = calculateBalances();

  document.getElementById("mainBalance").textContent = balances.main;
  document.getElementById("savingsABalance").textContent = balances.savingsA;
  document.getElementById("savingsBBalance").textContent = balances.savingsB;
}
