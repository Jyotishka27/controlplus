function init() {
  // ✅ Initial render (Dashboard only)
  renderEntries();
  renderBalances();
  renderNetWorth();
  renderInsights();

  // ✅ Default tab
  showTab("dashboard");

  // ✅ Input handling
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

/* ================= TAB SYSTEM ================= */

function showTab(tab) {
  const tabs = ["dashboardTab", "loansTab"];

  // Hide all tabs
  tabs.forEach(t => {
    const el = document.getElementById(t);
    if (el) el.classList.add("hidden");
  });

  // Show selected tab
  const activeTab = document.getElementById(tab + "Tab");
  if (activeTab) activeTab.classList.remove("hidden");

  // Lazy load loans only when needed
  if (tab === "loans") {
    renderLoans();
  }
}

init();
