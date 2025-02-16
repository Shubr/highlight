const highListColor = [
  "#FFFF77", // Light Yellow
  "#7777FF", // Light Blue
  "#AEFF77", // Light Green
  "#C977FF", // Light Purple
  "#77FF92", // Light Mint
  "#77FFE4", // Light Aqua
  "#FF77E4", // Light Pink
  "#FF7792", // Light Rose
  "#FFC9FF", // Light Orchid
  "#FFAEFF" // Light Magenta
];

function removeExistingHighlights(range) {
  // Create a TreeWalker to traverse all elements within the range
  const treeWalker = document.createTreeWalker(
    range.commonAncestorContainer,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode: function (node) {
        // Only accept <span> elements with a background color in highListColor
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          node.tagName.toLowerCase() === "span" &&
          highListColor.includes(node.style.backgroundColor)
        ) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_SKIP;
      }
    }
  );

  const spansToRemove = [];
  let currentNode = treeWalker.nextNode();

  // Collect all spans to remove
  while (currentNode) {
    // Check if the span intersects with the range
    if (range.intersectsNode(currentNode)) {
      spansToRemove.push(currentNode);
    }
    currentNode = treeWalker.nextNode();
  }

  // Remove each span by replacing it with its child nodes
  spansToRemove.forEach((span) => {
    span.replaceWith(...span.childNodes);
  });
}

// Initialize a variable to store the selected text (optional)
let selectedText = "";

// Listen for mouseup events to capture the selected text
document.addEventListener("mouseup", function () {
  const selection = window.getSelection();
  selectedText = selection.toString().trim();
});

// Listen for keydown events to detect Ctrl + H
document.addEventListener("keydown", function (event) {
  const platform = navigator.userAgent.toLowerCase();
  // Check if both Ctrl key and 'h' key are pressed
  if (
    platform.includes("mac") &&
    event.ctrlKey &&
    (event.key === "h" || event.key === "H")
  ) {
    event.preventDefault(); // Prevent any default browser actions

    // Get the current selection
    const selection = window.getSelection();

    // Ensure there's a selection and it's not empty
    if (!selection.isCollapsed) {
      // Get the first range of the selection
      const range = selection.getRangeAt(0).cloneRange();

      // Remove existing highlights within the range
      removeExistingHighlights(range);

      // Create a new <span> element to wrap the selected text
      const span = document.createElement("span");
      span.style.backgroundColor =
        highListColor[Math.floor(Math.random() * highListColor.length)]; // Set a random background color from the list

      // Surround the selected content with the <span>
      try {
        range.surroundContents(span);
        // Clear the selection after highlighting
        selection.removeAllRanges();
      } catch (e) {
        // Handle cases where the selection cannot be wrapped (e.g., partial elements)
      }
    } else {
      console.log("No text selected to highlight.");
    }
  } else if ((event.altKey && event.key == "h") || event.key == "H") {
    event.preventDefault(); // Prevent any default browser actions

    // Get the current selection
    const selection = window.getSelection();

    // Ensure there's a selection and it's not empty
    if (!selection.isCollapsed) {
      // Get the first range of the selection
      const range = selection.getRangeAt(0).cloneRange();

      // Remove existing highlights within the range
      removeExistingHighlights(range);

      // Create a new <span> element to wrap the selected text
      const span = document.createElement("span");
      span.style.backgroundColor =
        highListColor[Math.floor(Math.random() * highListColor.length)]; // Set a random background color from the list

      // Surround the selected content with the <span>
      try {
        range.surroundContents(span);
        // Clear the selection after highlighting
        selection.removeAllRanges();
      } catch (e) {
        // Handle cases where the selection cannot be wrapped (e.g., partial elements)
      }
    } else {
      console.log("No text selected to highlight.");
    }
  }
});
