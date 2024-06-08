document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const result = document.getElementById('result');
    const buttons = document.querySelectorAll('.container div:not(#result)');

    // Variables to store values and operator
    let currentInput = '';
    let firstOperand = null;
    let operator = null;

    // Function to update the result display
    const updateDisplay = (value) => {
        result.textContent = value;
    };

    // Function to handle digit input
    const handleDigit = (digit) => {
        currentInput += digit;
        updateDisplay(currentInput);
    };

    // Function to handle operator input
    const handleOperator = (op) => {
        if (currentInput === '' && operator !== null) {
            operator = op;
            return;
        }
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
        } else if (operator) {
            const secondOperand = parseFloat(currentInput);
            firstOperand = calculate(firstOperand, secondOperand, operator);
            updateDisplay(firstOperand);
        }
        currentInput = '';
        operator = op;
    };

    // Function to calculate the result
    const calculate = (a, b, op) => {
        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return b;
        }
    };

    // Function to handle the equal button
    const handleCalculate = () => {
        if (firstOperand !== null && operator !== null && currentInput !== '') {
            const secondOperand = parseFloat(currentInput);
            const resultValue = calculate(firstOperand, secondOperand, operator);
            updateDisplay(resultValue);
            currentInput = '';
            firstOperand = resultValue;
            operator = null;
        }
    };

    // Function to handle the clear button
    const handleClear = () => {
        currentInput = '';
        firstOperand = null;
        operator = null;
        updateDisplay(0);
    };

    // Event listeners for buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent.trim();
            if (!isNaN(value)) {
                handleDigit(value);
            } else if (value === 'C') {
                handleClear();
            } else if (value === '=') {
                handleCalculate();
            } else {
                handleOperator(value);
            }
        });
    });
});
