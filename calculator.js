let num1String = "";
let operator = "";
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
  const result = num1 / num2;
  return (result === Infinity) ? "error: division by 0" : result;
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

  updateNumberDisplay(result);

  if (result === "error: division by 0") {
    updateNum1AndNum2Strings("", "");
  } else {
    updateNum1AndNum2Strings(result, "");
  }
}

function addEventListenersToButtons() {
  const digitButtons = document.querySelectorAll(".digit");
  const operatorButtons = document.querySelectorAll(".operator");
  const decimalButton = document.querySelector("#decimal");
  const equalsButton = document.querySelector("#equals");
  const backButton = document.querySelector("#back");
  const clearButton = document.querySelector("#clear");
  const allClearButton = document.querySelector("#all-clear");

  digitButtons.forEach(button => button.addEventListener("click", handleClickOnDigit));
  operatorButtons.forEach(button => button.addEventListener("click", handleClickOnOperator));
  decimalButton.addEventListener("click", handleDecimal);
  equalsButton.addEventListener("click", handleEquals);
  backButton.addEventListener("click", handleBack);
  clearButton.addEventListener("click", handleClear);
  allClearButton.addEventListener("click", handleAllClear);
}

function addKeyboardEventListeners() {
  handlers = [handleDigitKey, handleOperatorKey, handleDecimalKey, handleEqualsKey, handleBackKey, handleClearKey];
  handlers.forEach(handler => document.addEventListener("keydown", handler));
}

function handleClickOnDigit(event) {
  handleDigit(event.target.textContent);
}

function handleDigitKey(event) {
  if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(event.key)) {
    handleDigit(event.key);
  }
}

function handleDigit(digit) {
  checkIfDigitAfterEquals();

  if (num2String !== "" && num2String !== "0") {
    num2String += digit;
  } else if (num2String === "" || num2String === "0") {
    num2String = digit;
  }

  if (num2String) {
    updateNumberDisplay(num2String, false);
  }
}

function handleDecimalKey(event) {
  if (event.key === ".") {
    handleDecimal();
  }
}

function handleDecimal() {
  checkIfDigitAfterEquals();

  if (num2String !== "") {
    num2String += ".";
  } else if (num2String === "") {
    num2String = "0.";
  }

  if (num2String) {
    updateNumberDisplay(num2String, false);
  }

  const decimalButton = document.querySelector("#decimal");
  decimalButton.removeEventListener("click", handleDecimal);
  document.removeEventListener("keydown", handleDecimalKey);
}

function addDecimalEventListeners() {
  const decimalButton = document.querySelector("#decimal");
  decimalButton.addEventListener("click", handleDecimal);
  document.addEventListener("keydown", handleDecimalKey);
}

function handleClickOnOperator(event) {
  handleOperator(event.target.id);
}

function handleOperatorKey(event) {
  switch (event.key) {
    case "+":
      handleOperator("add");
      break;
    case "-":
      handleOperator("subtract");
      break;
    case "*":
    case "x":
      handleOperator("multiply");
      break;
    case "/":
      handleOperator("divide");
      break;
  }
}

function handleOperator(operatorWord) {
  if (num1String !== "" && num2String !== "") {
    operate();
  } else if (num2String) {
    updateNumberDisplay(num2String);
    updateNum1AndNum2Strings(num2String, "");
  }

  operator = operatorWord;
  addDecimalEventListeners();
}

function handleEqualsKey(event) {
  if (event.key === "=" || event.key === "Enter") {
    handleEquals();
  }
}

function handleEquals() {
  if (num1String !== "" && num2String !== "") {
    operate();
  } else if (num1String !== "" && num2String === "") {
    updateNumberDisplay(num1String);
  } else if (num1String === "" && num2String !== "") {
    updateNumberDisplay(num2String);
    updateNum1AndNum2Strings(num2String, "");
  }

  operator = "";
  addDecimalEventListeners();
}

function checkIfDigitAfterEquals() {
  if (operator === "" && num1String !== "") {
    num1String = "";
  }
}

function handleBackKey(event) {
  if (event.key === "Backspace") {
    handleBack();
  }
}

function handleBack() {

  if (num2String !== "") {
    if (num2String.at(-1) === ".") {
      addDecimalEventListeners();
    }
    num2String = num2String.slice(0, -1);
  }

  if (num2String) {
    updateNumberDisplay(num2String);
  } else {
    updateNumberDisplay("");
  }
}

function handleClearKey(event) {
  if (event.key === "c") {
    handleClear();
  }
}

function handleClear() {
  num2String = "";
  updateNumberDisplay("");
  addDecimalEventListeners();
}

function handleAllClear() {
  updateNum1AndNum2Strings("", "");
  operator = "";
  updateNumberDisplay("");
  addDecimalEventListeners();
}

function updateNum1AndNum2Strings(value1, value2) {
  num1String = value1;
  num2String = value2;
}

function updateNumberDisplay(value, shorten = true) {
  const display = document.querySelector("#number-display");

  if (shorten) {
    if (value >= 1e14 || (value > 1e13 && value % 1 != 0)) {
      // if value is 15 or more digits, or 14 'integer part' digits before decimal,
      // express as scientific notation with 9 decimals i.e. #.#########e+#
      value = Number(value).toPrecision(10);
    } else if (value <= -1e13 || (value < -1e12 && value % 1 != 0)) {
      // if negative value is 14 or more digits, or 13 'integer part' digits before decimal,
      // express as scientific notation with 8 decimals i.e. -#.########e+#
      value = Number(value).toPrecision(9);
    } else if (value % 1 != 0) {
      // if value has decimals
        if (value > 1) {
          value = parseFloat(Number(value).toPrecision(14));
        } else if (value < -1) {
          value = parseFloat(Number(value).toPrecision(13));
        } else if (value > 0) {
          value = parseFloat(Number(value).toFixed(13));
        } else if (value < 0) {
          value = parseFloat(Number(value).toFixed(12));
        }
        // parseFloat handles scientific notation for exponents of -7 or lower
        // (6 0s before first significant digit)
    }
  }

  if (value === "error: division by 0") {
    addErrorMsgClassToDisplay();
  }

  display.textContent = value;
}

function addErrorMsgClassToDisplay(value) {
  const display = document.querySelector("#number-display");
  display.classList.add("display-error-msg");

  const buttons = document.querySelectorAll("button");
  buttons.forEach(button => button.addEventListener("click", removeErrorMsgClassFromDisplay));
}

function removeErrorMsgClassFromDisplay() {
  const display = document.querySelector("#number-display");
  display.classList.remove("display-error-msg");

  const buttons = document.querySelectorAll("button");
  buttons.forEach(button => button.removeEventListener("click", removeErrorMsgClassFromDisplay));
}

addEventListenersToButtons();
addKeyboardEventListeners();
