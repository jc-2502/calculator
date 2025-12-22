let num1;
let operator;
let num2;

function add (num1, num2) {
  return num1 + num2;
};

function subtract (num1, num2) {
  return num1 - num2;
};

function multiply (num1, num2) {
  return num1 * num2;
};

function divide (num1, num2) {
  return num1 / num2;
};

function operate (operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
  }
}

function addEventListenersToButtons() {
  const digitButtons = document.querySelectorAll(".digit");

  digitButtons.forEach(button => button.addEventListener("click", displayClickedDigit));
}

function displayClickedDigit(event) {
  const clickedDigit = event.target.textContent;
  const display = document.querySelector("#display");

  if (num1) {
    num1 += clickedDigit;
  } else if (clickedDigit !== "0") {
    // num1 doesn't have value
    num1 = clickedDigit;
  }

  if (num1) display.textContent = num1;
}

addEventListenersToButtons();
