let num1String = "";
let operator;
let num2String = "";

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

function operate() {
  const num1 = Number(num1String);
  const num2 = Number(num2String);
  let result;

  switch (operator) {
    case "add":
      result = add(num1, num2);
      break;
    case "subtract":
      result = subtract(num1, num2);
      break;
    case "multiply":
      result = multiply(num1, num2);
      break;
    case "divide":
      result = divide(num1, num2);
      break;
  }

  updateDisplay(result);
  return result;
}

function addEventListenersToButtons() {
  const digitButtons = document.querySelectorAll(".digit");
  const operatorButtons = document.querySelectorAll(".operator");
  const equalsButton = document.querySelector("#equals");

  digitButtons.forEach(button => button.addEventListener("click", displayClickedDigit));
  operatorButtons.forEach(button => button.addEventListener("click", handleClickOnOperator));
  equalsButton.addEventListener("click", handleClickOnEquals);
}

function displayClickedDigit(event) {
  const clickedDigit = event.target.textContent;

  if (num2String !== "" && !(num2String === "0" && clickedDigit === "0")) {
    num2String += clickedDigit;
  } else if (num2String === "") {
    num2String = clickedDigit;
  }

  if (num2String) updateDisplay(num2String);
}

function updateDisplay(value) {
  const display = document.querySelector("#display");
  display.textContent = value;
}

function handleClickOnOperator(event) {
  if (num1String !== "" && num2String !== "") {
    const result = operate();
    updateNum1AndNum2Strings(result, "");
  } else if (num2String) {
    updateNum1AndNum2Strings(num2String, "");
  }

  operator = event.target.id;
}

function handleClickOnEquals() {
  if (num1String !== "" && num2String !== "") {
    operate();
  }

  updateNum1AndNum2Strings("", "");
}

function updateNum1AndNum2Strings(value1, value2) {
  num1String = value1;
  num2String = value2;
}

addEventListenersToButtons();
