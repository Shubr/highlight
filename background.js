chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed or updated.");
  chrome.contextMenus.create({
    id: "sampleContextMenu",
    title: "Sample Menu",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sampleContextMenu") {
    console.log("Sample context menu item clicked.");
  }
});
