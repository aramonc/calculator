import React, {Component} from 'react';
import './calculator.css';
import Display from "./Display/Display";
import Button from "./Button/Button";

class Calculator extends Component {
  state = {
    value: '0',
    operands: [],
    operators: []
  };

  updateState = (value, operands, operators) => {
    let newState = {
      ...this.state
    };

    if (value != null) {
      newState.value = value;
    }

    if (operands != null) {
      newState.operands = operands;
    }

    if (operators != null) {
      newState.operators = operators;
    }

    this.setState(newState);
  };

  operandHandler = (value) => {
    let operands = this.state.operands;
    let currentOperand = operands.pop() || '';

    if (value === '.' && currentOperand.includes('.')) {
      operands.push(currentOperand);
      this.updateState(currentOperand, operands);
      return;
    }

    currentOperand += value;
    operands.push(currentOperand);

    this.updateState(currentOperand, operands);
  };

  operatorHandler = (operator) => {
    let operators = this.state.operators;
    let operands = this.state.operands;

    operators.push(operator);
    operands.push('');

    this.updateState(null, operands, operators);
  };

  clear = () => {
    this.updateState('0', [], []);
  };

  calculate = () => {
    let o = 0;
    let operators = this.state.operators;
    let operands = this.state.operands;
    let currentOperands, operation;

    // pull out multiplication and division operations first
    while (o < operators.length) {
      if (operators[o] === 'mult' || operators[o] === 'div') {
        operation = operators.splice(o, 1)[0];
        currentOperands = operands.splice(o, 2);
        let result = this.doOperation(currentOperands[0], operation, currentOperands[1]);
        operands.splice(o, 0, result);
      }
      o++;
    }

    // do remaining operations
    o = 0;
    while (o < operators.length) {
      operation = operators.splice(o, 1)[0];
      currentOperands = operands.splice(o, 2);
      let result = this.doOperation(currentOperands[0], operation, currentOperands[1]);
      operands.splice(o, 0, result);
    }

    this.updateState(operands.pop(), [], []);
  };

  doOperation = (leftOperand, operation, rightOperand) => {
    let result = 0;
    leftOperand = Number(leftOperand);
    rightOperand = Number(rightOperand);

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
  };

  render() {
    return (
      <table>
        <tbody>
        <tr>
          <td colSpan="3"><Display value={this.state.value}/></td>
          <td colSpan="1"><Button value="clr" label="CLR" click={this.clear.bind(this)}/></td>
        </tr>
        <tr>
          <td><Button value={9} label="9" click={this.operandHandler.bind(this)}/></td>
          <td><Button value={8} label="8" click={this.operandHandler.bind(this)}/></td>
          <td><Button value={7} label="7" click={this.operandHandler.bind(this)}/></td>
          <td><Button value="div" label="/" click={this.operatorHandler.bind(this)}/></td>
        </tr>
        <tr>
          <td><Button value={6} label="6" click={this.operandHandler.bind(this)}/></td>
          <td><Button value={5} label="5" click={this.operandHandler.bind(this)}/></td>
          <td><Button value={4} label="4" click={this.operandHandler.bind(this)}/></td>
          <td><Button value="mult" label="*" click={this.operatorHandler.bind(this)}/></td>
        </tr>
        <tr>
          <td><Button value={3} label="3" click={this.operandHandler.bind(this)}/></td>
          <td><Button value={2} label="2" click={this.operandHandler.bind(this)}/></td>
          <td><Button value={1} label="1" click={this.operandHandler.bind(this)}/></td>
          <td><Button value="sub" label="-" click={this.operatorHandler.bind(this)}/></td>
        </tr>
        <tr>
          <td><Button value="." label="." click={this.operandHandler.bind(this)}/></td>
          <td><Button value={0} label="0" click={this.operandHandler.bind(this)}/></td>
          <td><Button value="eq" label="=" click={this.calculate.bind(this)}/></td>
          <td><Button value="add" label="+" click={this.operatorHandler.bind(this)}/></td>
        </tr>
        </tbody>
      </table>
    );
  }
}

export default Calculator;
