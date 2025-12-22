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
  const buttons = document.querySelectorAll("button");

  buttons.forEach(button => button.addEventListener("click", displayInput));
}

function displayInput(event) {
  const display = document.querySelector("#display");
  const clickedButton = event.target;
  let clickedNumber;

  if (clickedButton.classList.contains("number-button")) {
    clickedNumber = clickedButton.textContent;

    if (num1) {
      num1 += clickedNumber;
    } else if (clickedNumber !== "0") {
      // num1 doesn't have value
      num1 = clickedNumber;
    }

    if (num1) display.textContent = num1;
  }
}

addEventListenersToButtons();
