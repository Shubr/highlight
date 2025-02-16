chrome.action.onClicked.addListener(async (tab) => {
  if (!tab || !tab.id) {
    console.error("No active tab found.");
    return;
  }

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["highlight.js"]
    });
  } catch (error) {
    console.error("Script execution failed:", error);
  }
});
