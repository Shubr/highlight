// Prevent redeclaration of highListColor
if (!window.highListColor) {
  window.highListColor = [
    "#FFFF77",
    "#7777FF",
    "#AEFF77",
    "#C977FF",
    "#77FF92",
    "#77FFE4",
    "#FF77E4",
    "#FF7792",
    "#FFC9FF",
    "#FFAEFF"
  ];
}

// Convert HEX to RGB for comparison
function hexToRgb(hex) {
  const bigint = parseInt(hex.substring(1), 16);
  return `rgb(${(bigint >> 16) & 255}, ${(bigint >> 8) & 255}, ${
    bigint & 255
  })`;
}

// Store selectedText in window to prevent redeclaration
if (!window.selectedText) {
  window.selectedText = "";
}

// Function to remove existing highlights within the selected range
function removeExistingHighlights(range) {
  const treeWalker = document.createTreeWalker(
    range.commonAncestorContainer,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode: function (node) {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.tagName.toLowerCase() === "span" &&
          window.highListColor
            .map(hexToRgb) // Convert all hex colors to RGB
            .includes(node.style.backgroundColor) // Compare correctly
        ) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_SKIP;
      }
    }
  );

  const spansToRemove = [];
  let currentNode = treeWalker.nextNode();

  while (currentNode) {
    if (range.intersectsNode(currentNode)) {
      spansToRemove.push(currentNode);
    }
    currentNode = treeWalker.nextNode();
  }

  spansToRemove.forEach((span) => {
    span.replaceWith(...span.childNodes);
  });
}

// Capture selected text
document.addEventListener("mouseup", function () {
  const selection = window.getSelection();
  window.selectedText = selection.toString().trim();
});

// Function to highlight text
function highlightSelection() {
  const selection = window.getSelection();
  if (!selection.rangeCount || selection.isCollapsed) return;

  const range = selection.getRangeAt(0).cloneRange();
  removeExistingHighlights(range);

  const span = document.createElement("span");
  span.style.backgroundColor =
    window.highListColor[
      Math.floor(Math.random() * window.highListColor.length)
    ];

  try {
    range.surroundContents(span);
    selection.removeAllRanges();
  } catch (e) {
    console.warn("Unable to highlight selection:", e);
  }
}

// Keydown event listener for Ctrl + H (Windows/Linux) and Alt + H (Mac)
document.addEventListener("keydown", function (event) {
  const platform = navigator.userAgent.toLowerCase();
  const isMac = platform.includes("mac");

  if (
    (isMac && event.altKey && event.key.toLowerCase() === "h") ||
    (!isMac && event.ctrlKey && event.key.toLowerCase() === "h")
  ) {
    event.preventDefault();
    highlightSelection();
  }
});

// Run the highlight function when the script is executed
highlightSelection();
