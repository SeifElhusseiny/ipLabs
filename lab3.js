
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");


let currentInput = "";


function updateDisplay(value) {
  display.textContent = value || "0";
}

function clearAll() {
  currentInput = "";
  updateDisplay(currentInput);
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput);
}

function appendValue(value) {
  currentInput += value;
  updateDisplay(currentInput);
}

function calculate() {
  try {
    currentInput = eval(currentInput).toString();
    updateDisplay(currentInput);
  } catch {
    updateDisplay("Error");
    currentInput = "";
  }
}


buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (value === "AC") {
      clearAll();
    }
    else if (value === "DEL") {
      deleteLast();
    }
    else if (value === "=") {
      calculate();
    }
    else {
      appendValue(value);
    }
  });
});
