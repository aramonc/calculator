export default class Calculator extends EventEmitter{

  constructor () {
    super();
    this.operands = [''];
    this.operators = [];
  };

  get operand() {
    return this.operands[this.operands.length - 1];
  }

  finalizeOperand() {
    const currentOperandLoc = this.operands.length - 1;

    this.operands[currentOperandLoc] = Number(this.operands[currentOperandLoc]);
    this.operands.push('');
  }

  appendOperandValue(value) {
    this.operands[this.operands.length - 1] += value
  }

  setOperation(operation) {

    if (operation === 'clr') {
      this.clear();
      this.emit('result', 0);
      return;
    }

    if (this.operands[this.operands - 1] === '') {
      this.operators.pop();
    }

    // first finalize the current operand and add a new one
    this.finalizeOperand();

    if (operation === 'eq') {
      this.emit('result', this.calculate());
      this.clear();
    } else {
      this.operators.push(operation);
    }
  }

  clear() {
    this.operands = [''];
    this.operators = [];
  }

  calculate() {
    let o = 0;
    let operation;
    let operands;

    // pull out multiplication and division operations first
    while (o < this.operators.length) {
      if (this.operators[o] === 'mult' || this.operators[o] === 'div') {
        operation = this.operators.splice(o, 1)[0];
        operands = this.operands.splice(o, 2);
        let result = this.doOperation(operands[0], operation, operands[1]);
        this.operands.splice(o, 0, result);
      }
      o++;
    }

    // do remaining operations
    o = 0;
    while (o < this.operators.length) {
      operation = this.operators.splice(o, 1)[0];
      operands = this.operands.splice(o, 2);
      let result = this.doOperation(operands[0], operation, operands[1]);
      this.operands.splice(o, 0, result);
    }

    // The result should be the first and only left
    return this.operands[0];
  }

  doOperation(leftOperand, operation, rightOperand) {
    let result = 0;

    switch (operation) {
      case 'add':
        result = leftOperand + rightOperand;
        break;
      case 'sub':
        result = leftOperand - rightOperand;
        break;
      case 'mult':
        result = leftOperand * rightOperand;
        break;
      case 'div':
        result = leftOperand / rightOperand;
        break;
    }

    return result;
  }
};

