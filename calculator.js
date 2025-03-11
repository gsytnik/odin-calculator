function main() {
    const calculator = document.querySelector('.calculator');
    let operation = [false];
    calculator.addEventListener('click', clickHandler(operation));

}


function clickHandler(operation){
    return function(event) {
        const target = event.target;

        switch (target){
            case target.id === 'AC':
                clearOperation(operation);
                operation.push(false);

            case target.class === 'button':
                addToNumber(target, operation);
            
            case target.class === 'op':
                addOperator(target, operation);

            case target.id === 'del':
                deleteFrom(operation);

            case target.id === 'neg':
                negate(operation);
        }

        displayResult(operation);
    }
}





function deleteFrom(operation) {
    if (operation.length % 2 == 0) {
        operation[operation.length - 1].slice(0, -1);
    }
}


function negate(operation) {
    if (operation.length === 1) return;

    if (operation.length !== 4) {
        operation[1] = operation[1].charAt(0) === '-' ? operation[1].slice(1) : '-' + operation[1];
    }

    if (operation.length === 4) {
        operation[2] = operation[2].charAt(0) === '-' ? operation[2].slice(1) : '-' + operation[2];
    }
}


function evaluateOperation(operation) {
    let answer;
    switch (operation[2]) {
        case '+':
            answer = operation.parseFloat(operation[1]) + operation.parseFloat(operation[3]);
        case 'x':
            answer = operation.parseFloat(operation[1]) * operation.parseFloat(operation[3]);
        case '-':
            answer = operation.parseFloat(operation[1]) - operation.parseFloat(operation[3]);
        case '/':
            if (parseFloat(operation[3]) == 0){
                displayDivisionByZero(operation);
                return;
            }
            answer = operation.parseFloat(operation[1]) / operation.parseFloat(operation[3]);
        default:
            console.log(`Something went wrong ${operation}`);
    }

    clearOperation(operation);
    operation.push(true);
    operation.push(Number.isInteger(answer) ? parseInt(answer) : answer.toFixed(4));
}


function clearOperation(operation) {
    for (i of operation) {
        operation.pop();
    }
}


function addOperator(target, operation) {
    switch (operation.length) {
        case 4:
            evaluateOperation(operation);
            addOperator(target, operation);

        case 2:
            if (target.textContent !== '=') {
                operation.push(target.textContent);
            }

        default:
            break;
    }

}


function addToNumber(target, operation){
    if (operation.length %2 !== 0){
        operation.push('');
    }

    if (target.id == 'dec' && operation[operation.length - 1].charAt(-1) == '.'){
        return;
    }

    if (operation[0]) {
        operation[0] = false;
        operation[1] = '';
    }

    operation[operation.length - 1] += target.id;
}


main()