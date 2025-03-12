function main() {
    const calculator = document.querySelector('.calculator');
    let operation = [false];
    calculator.addEventListener('click', clickHandler(operation));

}


function clickHandler(operation){
    return function(event) {
        event.preventDefault();
        event.stopPropagation();
        const target = event.target;
        
        if (target.id === 'AC') {
            clearOperation(operation);
            operation.push(false);
        }

        else if (target.classList.contains('button')) {
            if (operation.length === 3) {
                toggleActiveOperator(operation[2], false);
            }
            addToNumber(target, operation);
        }

        else if (target.classList.contains('op')) {
            addOperator(target, operation);
        }

        else if (target.id === 'del') {
            deleteFrom(operation);
        }

        else if (target.id === 'neg') {
            negate(operation);
        }
            
        displayResult(operation);
    }
}


function toggleActiveOperator(operatorText, active){
    let operator;
    switch (operatorText) {
        case '+':
            operator = document.querySelector('#plus');
            break;
            
        case '-':
            operator = document.querySelector('#minus');
            break;

        case 'x':
            operator = document.querySelector('#x');
            break;

        case '/':
            operator = document.querySelector('#div');
            break;
            
        default:
            console.log(`Something went wrong ${operatorText}`);
    }

    active ? operator.classList.add('active') : operator.classList.remove('active');
}


function displayResult(operation) {
    const answerBox = document.querySelector('.answerBox');

    if (operation[0] === 'FOOL!') {
        answerBox.textContent = operation[0];
        return;
    }

    if (operation.length === 1){
        answerBox.textContent = '';
        return;
    }

    answerBox.textContent = operation.length < 4 ? operation[1] : operation[3];
}


function deleteFrom(operation) {
    if (operation.length % 2 == 0) {
        operation[operation.length - 1] = operation[operation.length - 1].slice(0, -1);
    }
}


function negate(operation) {
    if (operation.length === 1) return;

    if (operation.length !== 4) {
        operation[1] = operation[1].charAt(0) === '-' ? operation[1].slice(1) : '-' + operation[1];
    }

    if (operation.length === 4) {
        operation[3] = operation[3].charAt(0) === '-' ? operation[3].slice(1) : '-' + operation[3];
    }
}


function evaluateOperation(operation, operator) {
    let answer;
    console.log(operation[1], operation[3])
    switch (operation[2]) {
        case '+':
            answer = parseFloat(operation[1]) + parseFloat(operation[3]);
            break;

        case 'x':
            answer = parseFloat(operation[1]) * parseFloat(operation[3]);
            break;

        case '-':
            answer = parseFloat(operation[1]) - parseFloat(operation[3]);
            break;

        case '/':
            if (parseFloat(operation[3]) == 0){
                clearOperation(operation);
                operation.push('FOOL!');
                return;
            }
            answer = parseFloat(operation[1]) / parseFloat(operation[3]);
            break;

        default:
            console.log(`Something went wrong ${operation}`);
    }

    clearOperation(operation);
    operation.push(operator === '=');
    operation.push(Number.isInteger(answer) ? BigInt(answer) : answer.toFixed(4));
}


function clearOperation(operation) {
    while (operation.length >= 1) {
        operation.pop();
    }
}


function addOperator(target, operation) {
    switch (operation.length) {
        case 4:
            evaluateOperation(operation, target.textContent);
            addOperator(target, operation);
            return;

        case 2:
            if (target.textContent !== '=' && operation[1] != '') {
                operation[0] = false;
                operation.push(target.textContent);
                toggleActiveOperator(operation[2], true);
            }
            return;

        case 3:
            if (target.textContent !== '=') {
                toggleActiveOperator(operation[2], false);
                operation[2] = target.textContent;
                toggleActiveOperator(operation[2], true);
            }
            return;
    }

}


function addToNumber(target, operation){
    if (operation.length %2 !== 0){
        operation.push('');
    }

    if (target.id == 'dec' && operation[operation.length - 1].includes('.')){
        return;
    }

    if (operation[0]) {
        operation[0] = false;
        operation[1] = '';
    }

    let toPush = (target.id == 'zero' ? '0' : (target.id == 'dec' ? '.' : target.id));
    operation[operation.length - 1] += toPush;
}


main();