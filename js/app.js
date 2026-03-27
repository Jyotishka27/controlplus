renderEntries();
renderBalances();
renderLoans();
renderNetWorth();
renderInsights();

document.getElementById("amount").focus();

document.getElementById("amount").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    saveEntry();
  }
});
