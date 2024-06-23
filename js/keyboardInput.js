document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.getElementById('inputField');
    const buttons = document.querySelectorAll('#nums .num');
    const operators = ['+', '-', 'x', '/', '.'];

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.textContent;
            if (value >= '0' && value <= '9' || operators.includes(value)) {
                inputField.value += value;
            } else if (value === 'RESET') {
                inputField.value = '';
            } else if (value === 'DEL') {
                inputField.value = inputField.value.slice(0, -1);
            } else if (value === '=') {
                inputField.value = calculateResult(inputField.value);
                document.getElementById('result').textContent = inputField.value;
            }
        });
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Delete') {
            inputField.value = inputField.value.slice(0, -1);
        } else if (event.key === 'Enter') {
            inputField.value = calculateResult(inputField.value);
            document.getElementById('result').textContent = inputField.value;
        }
    });

    function calculateResult(expression) {
        expression = expression.replace(/x/g, '*');
        const tokens = expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
        if (!tokens) return '';

        const operators = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '*': (a, b) => a * b,
            '/': (a, b) => a / b,
        };

        const values = [];
        const ops = [];

        for (const token of tokens) {
            if (!isNaN(token)) {
                values.push(Number(token));
            } else if (token in operators) {
                while (ops.length && precedence(ops[ops.length - 1]) >= precedence(token)) {
                    const b = values.pop();
                    const a = values.pop();
                    const op = ops.pop();
                    values.push(operators[op](a, b));
                }
                ops.push(token);
            }
        }

        while (ops.length) {
            const b = values.pop();
            const a = values.pop();
            const op = ops.pop();
            values.push(operators[op](a, b));
        }

        return values[0];
    }

    function precedence(op) {
        if (op === '+' || op === '-') return 1;
        if (op === '*' || op === '/') return 2;
        return 0;
    }
});