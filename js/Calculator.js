export default class Calculator {

  constructor () {
    this.operands = [''];
    this.operators = [];
  };

  finalizeOperand() {
    const currentOperandLoc = this.operands.length - 1;

    this.operands[currentOperandLoc] = Number(this.operands[currentOperandLoc]);
    this.operands.push('');
  }

  appendOperandValue(value) {
    this.operands[this.operands.length - 1] += value
  }

  setOperation(operation) {
    // first finalize the current operand and add a new one
    this.finalizeOperand();

    if (operation === 'eq') {
      console.log(this.operators);
      console.log(this.operands);
      this.operands = [];
      this.operators = [''];
    } else {
      this.operators.push(operation);
    }
  }

  listenForOperands(operand) {
    this.appendOperandValue(operand);
  }

  listenForOperators(operator) {
    this.setOperation(operator);
  }
};

