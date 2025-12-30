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

  updateDisplay(result);

  if (result === "error: division by 0") {
    updateNum1AndNum2Strings("", "");
  } else {
    updateNum1AndNum2Strings(result, "");
  }
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
  } else if (num1String === "" && num2String !== "") {
    updateDisplay(num2String);
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

function updateDisplay(value, shorten = true) {
  const display = document.querySelector("#display");

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

  addErrorMsgClassToDisplay(value);

  display.textContent = value;
}

function addErrorMsgClassToDisplay(value) {
  const display = document.querySelector("#display");

  if (value === "error: division by 0") {
    display.classList.add("display-error-msg");
  }
}

addEventListenersToButtons();
