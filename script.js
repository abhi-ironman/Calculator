let firstnum = '';
let secondnum = '';
let operator = '';
let result = '';
let flag = false;
let resultGenerated = false;

const panel = document.querySelector('.panel');

const numbers = document.querySelectorAll('.num');
numbers.forEach(function(number) {
    number.addEventListener('click', function(e) {
        if (resultGenerated) {
            firstnum = '';
            secondnum = '';
            operator = '';
            flag = false;
            panel.textContent = '';
            resultGenerated = false;
        }

        if (!flag) {
            firstnum += e.target.textContent;
            panel.textContent = firstnum;
        } else {
            secondnum += e.target.textContent;
            panel.textContent = secondnum;
        }
    });
});

const operation = document.querySelectorAll('.op');
operation.forEach(function(operation) {
    operation.addEventListener('click', function(e) {
        if (resultGenerated) {
            firstnum = result.toString();
            secondnum = '';
            result = '';
            resultGenerated = false;
        }

        if (firstnum !== '' && secondnum !== '') {
            let num1 = parseFloat(firstnum);
            let num2 = parseFloat(secondnum);

            result = evaluate(num1, num2, operator);

            if (result === 'Zero division error :(') {
                panel.textContent = result;
                resultGenerated = true;
                return;
            }

            firstnum = result.toString();
            secondnum = '';
        }

        operator = e.target.textContent;
        flag = true;
        panel.textContent = operator;
    });
});

function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return b === 0 ? 'Zero division error :(' : a / b;
}

function evaluate(num1, num2, op) {
    switch (op) {
        case '+': return add(num1, num2);
        case '-': return sub(num1, num2);
        case 'x': return multiply(num1, num2);
        case '/': return divide(num1, num2);
    }
}

const eq = document.querySelector('#eq');
eq.addEventListener('click', function(e) {
    if (firstnum === '' || secondnum === '' || operator === '') return;

    let num1 = parseFloat(firstnum);
    let num2 = parseFloat(secondnum);
    result = evaluate(num1, num2, operator);

    panel.textContent = result;

    if (result === 'Zero division error :(') {
        resultGenerated = true;
        return;
    }

    resultGenerated = true;
});

const AC = document.querySelector('#AC');
AC.addEventListener('click', function(e) {
    panel.textContent = '';
    firstnum = '';
    secondnum = '';
    result = '';
    operator = '';
    resultGenerated = false;
    flag = false;
});

const DEL = document.querySelector('#DEL');
DEL.addEventListener('click', function(e) {
    if (resultGenerated) return;

    if (!flag) {
        firstnum = firstnum.slice(0, -1);
        panel.textContent = firstnum || '0';
    } else {
        secondnum = secondnum.slice(0, -1);
        panel.textContent = secondnum || '0';
    }
});

const dec = document.querySelector('.dec');
dec.addEventListener('click', function(e) {
    if (resultGenerated) {
        firstnum = '0.';
        panel.textContent = firstnum;
        flag = false;
        resultGenerated = false;
        secondnum = '';
        operator = '';
        return;
    }

    if (!flag) {
        if (firstnum.includes('.')) return;
        firstnum = firstnum !== '' ? firstnum + '.' : '0.';
        panel.textContent = firstnum;
    } else {
        if (secondnum.includes('.')) return;
        secondnum = secondnum !== '' ? secondnum + '.' : '0.';
        panel.textContent = secondnum;
    }
});
