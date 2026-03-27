// INIT

renderEntries();
renderBalances();
renderLoans();

// UX Improvements

document.getElementById("amount").focus();

document.getElementById("amount").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    saveEntry();
  }
});
