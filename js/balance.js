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
    } else if (entry.type === "investment" || entry.type === "transfer") {
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

// Net Worth

function calculateNetWorth() {
  const balances = calculateBalances();
  const loans = loadLoans();

  const totalSavings =
    balances.main + balances.savingsA + balances.savingsB;

  const totalLoans = loans.reduce(
    (sum, loan) => sum + loan.remainingAmount,
    0
  );

  return {
    totalSavings,
    totalLoans,
    netWorth: totalSavings - totalLoans
  };
}

function renderNetWorth() {
  const data = calculateNetWorth();

  document.getElementById("totalSavings").textContent = data.totalSavings;
  document.getElementById("totalLoans").textContent = data.totalLoans;
  document.getElementById("netWorth").textContent = data.netWorth;
}
