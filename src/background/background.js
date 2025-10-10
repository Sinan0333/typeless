chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "AUTOFILL") {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      await chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["src/content/autofill.js"],
      });
    });
  }
});
