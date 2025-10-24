chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "AUTOFILL") {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      await chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["src/content/autofill.js"],
      });
    });
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "fill_form") {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      await chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["src/content/autofill.js"],
      });
    });
  }
});
