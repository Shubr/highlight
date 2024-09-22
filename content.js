let selectedText = "";

document.addEventListener("mouseup", function () {
  selectedText = window.getSelection().toString();
});

document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.key === "h") {
    console.log(selectedText);

  }
});


