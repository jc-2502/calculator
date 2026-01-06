let num1String = '';
let operator = '';
let num2String = '';
let operationParts = [];

function updateNum1AndNum2Strings(value1, value2) {
  num1String = value1;
  num2String = value2;
}

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
  return (result === Infinity) ? 'error: division by 0' : result;
};

function operate() {
  const num1 = Number(num1String);
  const num2 = Number(num2String);
  let result;

  switch (operator) {
    case 'add':
      result = add(num1, num2);
      break;
    case 'subtract':
      result = subtract(num1, num2);
      break;
    case 'multiply':
      result = multiply(num1, num2);
      break;
    case 'divide':
      result = divide(num1, num2);
      break;
  }

  updateOperationDisplay('=');

  if (result === 'error: division by 0') {
    updateNum1AndNum2Strings('', '');
  } else {
    updateNum1AndNum2Strings(result, '');
  }

  return result;
}

function addEventListenersToButtons() {
  const digitButtons = document.querySelectorAll('.digit');
  const operatorButtons = document.querySelectorAll('.operator');
  const decimalButton = document.querySelector('#decimal');
  const plusMinusButton = document.querySelector('#plus-minus');
  const equalsButton = document.querySelector('#equals');
  const backButton = document.querySelector('#back');
  const clearButton = document.querySelector('#clear');
  const allClearButton = document.querySelector('#all-clear');

  digitButtons.forEach(button => button.addEventListener('click', handleClickOnDigit));
  operatorButtons.forEach(button => button.addEventListener('click', handleClickOnOperator));
  decimalButton.addEventListener('click', handleDecimal);
  plusMinusButton.addEventListener('click', handlePlusMinus);
  equalsButton.addEventListener('click', handleEquals);
  backButton.addEventListener('click', handleBack);
  clearButton.addEventListener('click', handleClear);
  allClearButton.addEventListener('click', handleAllClear);
}

function addKeyboardEventListeners() {
  const keydownHandlers = [handleDigitKey, handleBackKey];
  const keyupHandlers = [handleOperatorKey, handleDecimalKey, handleEqualsKey, handleClearKey];
  keydownHandlers.forEach(handler => document.addEventListener('keydown', handler));
  keyupHandlers.forEach(handler => document.addEventListener('keyup', handler));
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

  if (num2String !== '' && num2String !== '0') {
    num2String += digit;
  } else if (num2String === '' || num2String === '0') {
    num2String = digit;
  }

  if (num2String) {
    updateNumberDisplay(num2String, false);
  }
}

function handleDecimalKey(event) {
  if (event.key === '.') {
    handleDecimal();
  }
}

function handleDecimal() {
  checkIfDigitAfterEquals();

  if (num2String !== '') {
    num2String += '.';
  } else if (num2String === '') {
    num2String = '0.';
  }

  updateNumberDisplay(num2String, false);

  const decimalButton = document.querySelector('#decimal');
  decimalButton.removeEventListener('click', handleDecimal);
  document.removeEventListener('keyup', handleDecimalKey);
}

function addDecimalEventListeners() {
  const decimalButton = document.querySelector('#decimal');
  decimalButton.addEventListener('click', handleDecimal);
  document.addEventListener('keyup', handleDecimalKey);
}

function handlePlusMinus() {
  checkIfDigitAfterEquals();

  if (num2String !== '') {
    num2String = (num2String.at(0) === '-') ? num2String.slice(1) : '-' + num2String;
  } else if (num2String === '') {
    num2String = '-';
  }

  updateNumberDisplay(num2String, false);
}

function handleClickOnOperator(event) {
  handleOperator(event.target.id);
}

function handleOperatorKey(event) {
  switch (event.key) {
    case '+':
      handleOperator('add');
      break;
    case '-':
      handleOperator('subtract');
      break;
    case '*':
    case 'x':
      handleOperator('multiply');
      break;
    case '/':
      handleOperator('divide');
      break;
  }
}

function getOperatorSymbol(operator) {
  switch (operator) {
    case 'add':
      return '+';
    case 'subtract':
      return '\u2212';
    case 'multiply':
      return '\u00d7';
    case 'divide':
      return '\u00f7';
  }
}

function handleOperator(operatorWord) {
  if (num2String) {
    updateOperationDisplay(num2String);
  }

  const operatorSymbol = getOperatorSymbol(operatorWord);

  if (num1String !== '' && num2String !== '') {
    const result = operate();
    updateOperationDisplay(result, operatorSymbol);
  } else if (num1String) {
    updateNumberDisplay('');
    if (operationParts.at(-1) === num1String) {
      // clear clears result from number display and adds in operation display
      updateOperationDisplay(operatorSymbol);
    } else {
      updateOperationDisplay(num1String, operatorSymbol);
    }
  } else if (num2String) {
    updateNumberDisplay('');
    updateOperationDisplay(operatorSymbol);
    updateNum1AndNum2Strings(num2String, '');
  }

  operator = operatorWord;
  addDecimalEventListeners();
}

function handleEqualsKey(event) {
  if (event.key === '=' || event.key === 'Enter') {
    // prevent pressing enter from activating last clicked button again
    event.preventDefault();

    handleEquals();
  }
}

function handleEquals() {
  if (num1String !== '' && num2String !== '') {
    // updateOperationDisplay adds num2String to operation display before operate adds =
    let result;
    updateOperationDisplay(num2String);
    result = operate();
    updateNumberDisplay(result);
  } else if (num1String !== '' && num2String === '') {
    updateOperationDisplay(num1String, '=');
    updateNumberDisplay(num1String);
  } else if (num1String === '' && num2String !== '') {
    updateOperationDisplay(num2String, '=');
    updateNumberDisplay(num2String);
    updateNum1AndNum2Strings(num2String, '');
  }

  operator = '';
  addDecimalEventListeners();
}

function checkIfDigitAfterEquals() {
  if (operator === '' && num1String !== '') {
    num1String = '';
    clearOperationDisplay();
  }
}

function handleBackKey(event) {
  if (event.key === 'Backspace') {
    handleBack();
  }
}

function handleBack() {
  if (num2String !== '') {
    if (num2String.at(-1) === '.') {
      addDecimalEventListeners();
    }
    num2String = num2String.slice(0, -1);
    updateNumberDisplay(num2String);
  }
}

function handleClearKey(event) {
  if (event.key === 'c') {
    handleClear();
  }
}

function handleClear() {
  num2String = '';
  updateNumberDisplay('');

  if (num1String !== '' & num2String === '') {
    // result was in number display - move to operation display
    updateOperationDisplay(num1String);
  }

  addDecimalEventListeners();
}

function handleAllClear() {
  updateNum1AndNum2Strings('', '');
  operator = '';
  clearOperationDisplay();
  updateNumberDisplay('');
  addDecimalEventListeners();
}

function updateNumberDisplay(value, shorten = true) {
  const numberDisplay = document.querySelector('#number-display');

  if (shorten) {
    if (value >= 1e14 || (value > 1e13 && value % 1 != 0)) {
      // if value is 15 or more digits, or 14 'integer part' digits before decimal,
      // express as scientific notation with 9 decimals i.e. #.#########e+##
      // (display fits 14 chars)
      value = Number(value).toPrecision(10);
    } else if (value <= -1e13 || (value < -1e12 && value % 1 != 0)) {
      // if negative value is 14 or more digits, or 13 'integer part' digits before decimal,
      // express as scientific notation with 8 decimals i.e. -#.########e+##
      value = Number(value).toPrecision(9);
    } else if (value % 1 != 0) {
      // if value has decimals
        if (value > 1) {
          value = parseFloat(Number(value).toPrecision(14));
        } else if (value < -1) {
          value = parseFloat(Number(value).toPrecision(13));
          // - and 13 significant digits
        } else if (value > 0) {
          value = parseFloat(Number(value).toFixed(13));
          // 0 and 13 decimals
        } else if (value < 0) {
          value = parseFloat(Number(value).toFixed(12));
          // -, 0, and 12 decimals
        }
        // parseFloat handles scientific notation for exponents of -7 or lower
        // (6 0s before first significant digit)
    }
  }

  if (value === 'error: division by 0') {
    addErrorMsgClassToNumberDisplay();
  }

  numberDisplay.textContent = value;
}

function clearOperationDisplay() {
  operationParts = [];

  const operationDisplay = document.querySelector('#operation-display');
  operationDisplay.textContent = '';
}

function updateOperationDisplay(...partsToAdd) {
  operationParts.push(...partsToAdd);

  const operationDisplay = document.querySelector('#operation-display');
  operationDisplay.textContent = operationParts.map(part => shortenOperationPart(part)).join(' ');
}

function shortenOperationPart(value) {
  if (!['+', '\u2212', '\u00d7', '\u00f7', '='].includes(value)) {
    if (value >= 1e16 || (value > 1e15 && value % 1 != 0)) {
      // if value is 17 or more digits, or 16 'integer part' digits before decimal,
      // express as scientific notation with 15 decimals i.e. #.###############e+##
      // (16 significant digits displayed with precision)
      value = Number(value).toPrecision(16);
    } else if (value <= -1e16 || (value < -1e15 && value % 1 != 0)) {
      // if negative value is 17 or more digits, or 16 'integer part' digits before decimal,
      // express as scientific notation with 15 decimals i.e. -#.###############e+##
      value = Number(value).toPrecision(16);
    } else if (value % 1 != 0) {
      // if value has decimals
        if (value > 1 || value < -1) {
          value = parseFloat(Number(value).toPrecision(16));
        } else if (value > 0 || value < 0) {
          value = parseFloat(Number(value).toFixed(16));
        }
        // parseFloat handles scientific notation for exponents of -7 or lower
        // (6 0s before first significant digit)
    }
  }

  return value;
}

function addErrorMsgClassToNumberDisplay() {
  const numberDisplay = document.querySelector('#number-display');
  numberDisplay.classList.add('display-error-msg');

  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => button.addEventListener('click', removeErrorMsgClassFromNumberDisplay));
  document.addEventListener('keydown', removeErrorMsgClassFromNumberDisplayOnKeydown);
}

function removeErrorMsgClassFromNumberDisplay() {
  const numberDisplay = document.querySelector('#number-display');
  numberDisplay.classList.remove('display-error-msg');

  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => button.removeEventListener('click', removeErrorMsgClassFromNumberDisplay));
  document.removeEventListener('keydown', removeErrorMsgClassFromNumberDisplayOnKeydown);
}

const keys = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
  '+', '-', '*', 'x', '/',
  '=', 'Enter',
  'Backspace', 'c'
];

function removeErrorMsgClassFromNumberDisplayOnKeydown(event) {
  if (keys.includes(event.key)) {
    removeErrorMsgClassFromNumberDisplay();
  }
}

addEventListenersToButtons();
addKeyboardEventListeners();
