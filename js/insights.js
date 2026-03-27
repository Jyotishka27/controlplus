function getCurrentMonth() {
  return new Date().toISOString().slice(0, 7);
}

function calculateInsights() {
  const entries = loadEntries();
  const currentMonth = getCurrentMonth();

  let totalSpent = 0;
  let totalInvested = 0;
  let emiPaid = 0;
  const categoryMap = {};

  entries.forEach(entry => {
    if (!entry.date.startsWith(currentMonth)) return;

    if (entry.type === "expense") {
      totalSpent += entry.amount;

      if (entry.category === "EMI") {
        emiPaid += entry.amount;
      }

      categoryMap[entry.category] =
        (categoryMap[entry.category] || 0) + entry.amount;
    }

    if (entry.type === "investment") {
      totalInvested += entry.amount;
    }
  });

  let topCategory = "-";
  let max = 0;

  for (let cat in categoryMap) {
    if (categoryMap[cat] > max) {
      max = categoryMap[cat];
      topCategory = cat;
    }
  }

  return { totalSpent, totalInvested, topCategory, emiPaid };
}

function renderInsights() {
  const data = calculateInsights();

  document.getElementById("totalSpent").textContent = data.totalSpent;
  document.getElementById("totalInvested").textContent = data.totalInvested;
  document.getElementById("topCategory").textContent = data.topCategory;
  document.getElementById("emiPaid").textContent = data.emiPaid;
}
