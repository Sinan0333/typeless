console.log("Popup working");

document.getElementById("fillBtn").addEventListener("click", () => {
  console.log("Fill Form button clicked");
  
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        console.log("Autofill triggered from popup");
      }
    });
  });
});
