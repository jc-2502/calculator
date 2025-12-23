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
  const operatorButtons = document.querySelectorAll(".operator");

  digitButtons.forEach(button => button.addEventListener("click", displayClickedDigit));
  operatorButtons.forEach(button => button.addEventListener("click", handleClickOnOperator));
}

function displayClickedDigit(event) {
  const clickedDigit = event.target.textContent;
  const display = document.querySelector("#display");

  if (num2) {
    num2 += clickedDigit;
  } else if (clickedDigit !== "0") {
    // num2 doesn't have value
    num2 = clickedDigit;
  }

  if (num2) display.textContent = num2;
}

function handleClickOnOperator(event) {
  operator = event.target.id;

  moveCompleteNumberToNum1();
}

function moveCompleteNumberToNum1() {
  num1 = num2;
  num2 = undefined;
}

addEventListenersToButtons();
