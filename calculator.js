let num1String;
let operator;
let num2String;

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
    case "add":
      return add(num1, num2);
    case "subtract":
      return subtract(num1, num2);
    case "multiply":
      return multiply(num1, num2);
    case "divide":
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

  if (num2String) {
    num2String += clickedDigit;
  } else if (clickedDigit !== "0") {
    // num2String doesn't have value
    num2String = clickedDigit;
  }

  if (num2String) display.textContent = num2String;
}

function handleClickOnOperator(event) {
  operator = event.target.id;

  moveCompleteNumberToNum1();
}

function moveCompleteNumberToNum1() {
  num1String = num2String;
  num2String = undefined;
}

addEventListenersToButtons();
