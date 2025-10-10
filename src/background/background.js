chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "AUTOFILL") {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      //   chrome.tabs.sendMessage(tabs[0].id, { action: "AUTOFILL" });
      await chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["src/content/autofill.js"],
      });
    });
  }
});
