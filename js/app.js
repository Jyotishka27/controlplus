function init() {
  renderEntries();
  renderBalances();
  renderNetWorth();
  renderInsights();

  // ✅ Only run if loans UI exists
  if (document.getElementById("loanList")) {
    renderLoans();
  }

  const amountInput = document.getElementById("amount");

  if (amountInput) {
    amountInput.focus();

    amountInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        saveEntry();
      }
    });
  }
}

init();
