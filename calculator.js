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
  updateNum1AndNum2Strings(result, "");
}

function addEventListenersToButtons() {
  const digitButtons = document.querySelectorAll(".digit");
  const operatorButtons = document.querySelectorAll(".operator");
  const equalsButton = document.querySelector("#equals");
  const backButton = document.querySelector("#back");
  const clearButton = document.querySelector("#clear");
  const allClearButton = document.querySelector("#all-clear");

  digitButtons.forEach(button => button.addEventListener("click", handleClickOnDigit));
  operatorButtons.forEach(button => button.addEventListener("click", handleClickOnOperator));
  equalsButton.addEventListener("click", handleClickOnEquals);
  backButton.addEventListener("click", handleClickOnBack);
  clearButton.addEventListener("click", handleClickOnClear);
  allClearButton.addEventListener("click", handleClickOnAllClear);
}

function handleClickOnDigit(event) {
  const clickedDigit = event.target.textContent;

  checkIfClickedOnDigitAfterEquals();

  if (num2String !== "" && !(num2String === "0" && clickedDigit === "0")) {
    num2String += clickedDigit;
  } else if (num2String === "") {
    num2String = clickedDigit;
  }

  if (num2String) updateDisplay(num2String, false);
}

function updateDisplay(value, shorten = true) {
  const display = document.querySelector("#display");
  if (value >= 1e14 && shorten) {
    // if value is 15 or more digits, express as scientific notation
    // with 9 decimals i.e. #.#########e+#
    const shortened = Number(value).toPrecision(10);
    display.textContent = shortened;
  } else {
    display.textContent = value;
  }
}

function handleClickOnOperator(event) {
  if (num1String !== "" && num2String !== "") {
    operate();
  } else if (num2String) {
    updateDisplay(num2String);
    updateNum1AndNum2Strings(num2String, "");
  }

  operator = event.target.id;
}

function handleClickOnEquals() {
  if (num1String !== "" && num2String !== "") {
    operate();
  } else if (num1String !== "" && num2String === "") {
    updateDisplay(num1String);
  }

  operator = "";
}

function checkIfClickedOnDigitAfterEquals() {
  if (operator === "" && num1String !== "") {
    num1String = "";
  }
}

function handleClickOnBack() {
  if (num2String !== "") {
    num2String = num2String.slice(0, -1);
  }

  if (num2String) {
    updateDisplay(num2String);
  } else {
    updateDisplay("0");
  }
}

function handleClickOnClear() {
  num2String = "";
  updateDisplay("0");
}

function handleClickOnAllClear() {
  updateNum1AndNum2Strings("", "");
  operator = "";
  updateDisplay("0");
}

function updateNum1AndNum2Strings(value1, value2) {
  num1String = value1;
  num2String = value2;
}

addEventListenersToButtons();
