document.getElementById("addUpdateBtn").addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});

document.getElementById("useDataBtn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "AUTOFILL" });
});

document.getElementById("openShortcutPage").addEventListener("click", (e) => {
  e.preventDefault();
  chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
});

document.addEventListener("DOMContentLoaded", async () => {
  const commandEl = document.getElementById("shortcut");
  const redirectEl = document.getElementById("openShortcutPage");

  try {
    const commands = await chrome.commands.getAll();
    const fillCommand = commands.find((cmd) => cmd.name === "fill_form");

    if (fillCommand && fillCommand.shortcut) {
      commandEl.textContent = `Press ${fillCommand.shortcut} to autofill your form — or`;
    } else {
      commandEl.textContent = "Shortcut not set —";
      redirectEl.textContent = "set one now";
    }
  } catch (err) {
    console.error("Failed to fetch shortcut:", err);
    commandEl.textContent = "Error loading shortcut";
  }
});
