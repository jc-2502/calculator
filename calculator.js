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

  if (num2String) {
    num2String += clickedDigit;
  } else if (clickedDigit !== "0") {
    // num2String doesn't have value
    num2String = clickedDigit;
  }

  if (num2String) updateDisplay(num2String);
}

function updateDisplay(value) {
  const display = document.querySelector("#display");
  display.textContent = value;
}

function handleClickOnOperator(event) {
  if (num1String && num2String) {
    num1 = Number(num1String);
    num2 = Number(num2String);
    let result = operate(operator, num1, num2);
    updateDisplay(result);
    // console.log(`${num1} ${operator} ${num2} ${result}`);
    updateNum1AndNum2Strings(result, undefined);
    // console.log(`${num1String} ${num2String}`);
  } else if (num2String) {
    updateNum1AndNum2Strings(num2String, undefined);
    // console.log(`${num1String} ${num2String}`);
  }

  operator = event.target.id;
}

function updateNum1AndNum2Strings(value1, value2) {
  num1String = value1;
  num2String = value2;
}

addEventListenersToButtons();
