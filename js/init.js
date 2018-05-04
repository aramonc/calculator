import Calculator from './Calculator.js';

(function (window) {
  // Initialize Calculator

  const calc = new Calculator();
  const operands = window.document.querySelectorAll('.js-operand');
  const operators = window.document.querySelectorAll('.js-operator');
  const display = window.document.querySelector('#display');

  document.addEventListener(
    'keypress',
    event => {
      switch (event.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':
          calc.appendOperandValue(event.key);
          display.innerHTML = calc.operand;
          break;
        case '+':
          calc.setOperation('add');
          break;
        case '-':
          calc.setOperation('sub');
          break;
        case '*':
          calc.setOperation('mult');
          break;
        case '/':
          calc.setOperation('div');
          break;
        case 'Delete':
          calc.setOperation('clr');
          break;
        case '=':
        case 'Enter':
          event.preventDefault();
          calc.setOperation('eq');
          break;
      }
    }
  );

  operands.forEach(
    operand => {
      operand.addEventListener(
        'click',
        event => {
          calc.appendOperandValue(event.target.getAttribute('value'));
          display.innerHTML = calc.operand;
        }
      )
    }
  );

  operators.forEach(
    operator => {
      operator.addEventListener(
        'click',
        event => {
          calc.setOperation(event.target.getAttribute('value'));
        }
      )
    }
  );

  calc.on('result', result => display.innerHTML = result);
})(window);
