document.getElementById("addUpdateBtn").addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});

document.getElementById("useDataBtn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "AUTOFILL" });
});
