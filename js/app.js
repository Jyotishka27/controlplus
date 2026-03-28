function init() {
  renderEntries();
  renderBalances();
  renderLoans();
  renderNetWorth();
  renderInsights();

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
