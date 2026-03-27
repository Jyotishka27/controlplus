// INIT

renderEntries();
renderBalances();
renderLoans();
renderNetWorth(); // 🔥 added

// UX Improvements

document.getElementById("amount").focus();

document.getElementById("amount").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    saveEntry();
  }
});
