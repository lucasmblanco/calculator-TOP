let valueA = '';
let valueB = '';
let check = 'a';
let result = 0;
let operator;

const add = function(a,b){
    return a + b;
}
    

const sub = function(a,b) {
    return a - b;
  }

const mult = function(a,b) {
    return a * b;
  }

const div = function(a,b) {
    return a / b;
  }



function operate(operator,a,b) {
    a = Number(a);
    b = Number(b);

    switch (operator) {
    case "+":
        return add(a,b);
    case "-":
        return sub(a,b);
    case "*":
        return mult(a,b);
    case "/":
        if(b === 0) return null;
        else return div(a,b); 
    }
}

const screen = document.querySelector('#screen');
const numericalButtons = document.querySelectorAll('.numButton');
numericalButtons.forEach(item => item.addEventListener('click', addNumbersA));




function addNumbersA(e) {
    const numeralButtons = document.querySelector(`button[data-value="${e.target.dataset.value}"]`);
    numeralButtons.classList.add('pressing');
    valueA += e.target.dataset.value;
    screen.textContent = valueA;
    check = 'a';
}

function addNumbersB(e) {
    const numeralButtons = document.querySelector(`button[data-value="${e.target.dataset.value}"]`);
    numeralButtons.classList.add('pressing');
    valueB += e.target.dataset.value;
    screen.textContent = valueB;
    check = 'b';
}

const eraseButton = document.querySelector(".eraseAll");
eraseButton.addEventListener('click', eraseAll)

function eraseAll() {
    eraseButton.classList.add('pressingEraseAll');
    valueA = '';
    operator = '';
    valueB = '';
    screen.textContent = '0';
    numericalButtons.forEach(item => item.removeEventListener('click', addNumbersB));
    numericalButtons.forEach(item => item.addEventListener('click', addNumbersA));
    point.addEventListener('click', pointOnScreen);
}

const eraseOne = document.querySelector(".eraseOne");
eraseOne.addEventListener('click', eraseO);

function eraseO() {
    eraseOne.classList.add('pressing');
    if (check === 'a') {
   valueA = valueA.slice(0,-1);
   screen.textContent = valueA;
   } else if (check == 'b') {
    valueB = valueB.slice(0,-1);
    screen.textContent = valueB;
   }
}

const operators = document.querySelectorAll('.opButton');
operators.forEach(item => item.addEventListener('click', runOperator));

function runOperator(e) {
   // operators.forEach(item => item.classList.add('pressing'));
   const operatorsButton = document.querySelector(`button[value="${e.target.value}"]`);
   operatorsButton.classList.add('pressing');
    if(!operator) operator = e.target.value;
    if(!valueA && operator === '-') { 
        valueA += operator; 
        screen.textContent = valueA;
    }
    if(valueA && valueA !== '-') {
    numericalButtons.forEach(item => item.removeEventListener('click', addNumbersA));
    window.removeEventListener('keydown', pressKeyValueA);
    numericalButtons.forEach(item => item.addEventListener('click', addNumbersB));
    window.addEventListener('keydown', pressKeyValueB);
    }
    point.addEventListener('click', pointOnScreen);
   
    if(valueA !== '' && valueB !== '') {
        result = operate(operator,valueA,valueB);
        screen.textContent = result;
        valueA = '';
        valueB = '';
        valueA = result;
        operator = e.target.value;
        numericalButtons.forEach(item => item.removeEventListener('click', addNumbersB));
        window.removeEventListener('keydown', pressKeyValueB);
        numericalButtons.forEach(item => item.addEventListener('click', addNumbersA));
        window.addEventListener('keydown', pressKeyValueA);
    }
    if(result) {
        numericalButtons.forEach(item => item.removeEventListener('click', addNumbersA));
        window.removeEventListener('keydown', pressKeyValueA);
        numericalButtons.forEach(item => item.addEventListener('click', addNumbersB));
        window.addEventListener('keydown', pressKeyValueB);
    }
    else return;
}

const point = document.querySelector('#pButton');
point.addEventListener('click', pointOnScreen)

function pointOnScreen(e) {
    const operatorsButton = document.querySelector(`button[value="${e.target.value}"]`);
    operatorsButton.classList.add('pressing');
    if(check === 'a') { 
        valueA += e.target.value; 
        screen.textContent = valueA; 
        point.removeEventListener('click', pointOnScreen)
    } else if(check === 'b') { 
        valueB += e.target.value; 
        screen.textContent = valueB; 
        point.removeEventListener('click', pointOnScreen);
    }
}

const restButton = document.querySelector('#restButton');
const equalButton = document.querySelector('#equalButton');

equalButton.addEventListener('click', showResults);
 function showResults() {
    equalButton.classList.add('pressing');
    if(valueA !== '' && valueB !== '') {
    screen.textContent = operate(operator,valueA,valueB);
    numericalButtons.forEach(item => item.removeEventListener('click', addNumbersB));
    numericalButtons.forEach(item => item.addEventListener('click', addNumbersA));
    }
    if(result) {
        numericalButtons.forEach(item => item.removeEventListener('click', addNumbersA));
        numericalButtons.forEach(item => item.addEventListener('click', addNumbersB));
    }
 }

var mousePosition;
var offset = [0,0];
var isDown = false;
const mainBody = document.querySelector('#main-body');

mainBody.addEventListener('mousedown', function(e) {
    isDown = true;
    offset = [
        mainBody.offsetLeft - e.clientX,
        mainBody.offsetTop - e.clientY
        
    ];
}, true);

window.addEventListener('mouseup', function() {
    isDown = false;

}, true);

window.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
        mousePosition = {
            x: event.clientX,
            y: event.clientY
        };
        mainBody.style.left = (mousePosition.x + offset[0]) + 'px';
        mainBody.style.top  = (mousePosition.y + offset[1]) + 'px';
    }
}, true);

///
window.addEventListener('keydown', pressKeyValueA);

function pressKeyValueA(e) {
    const keyPress = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if(!keyPress) return;
    valueA += keyPress.dataset.value;
    screen.textContent = valueA;
    check = 'a';
    keyPress.classList.add('pressing');
}

function pressKeyValueB(e) {
    const keyPress = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if(!keyPress) return;
    valueB += keyPress.dataset.value;
    screen.textContent = valueB;
    check = 'b';
    keyPress.classList.add('pressing');
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('pressing');
  }

  function removeTransitionErase(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('pressingEraseAll');
  }
numericalButtons.forEach(button => button.addEventListener('transitionend', removeTransition));
operators.forEach(button => button.addEventListener('transitionend', removeTransition));
point.addEventListener('transitionend', removeTransition);
eraseButton.addEventListener('transitionend', removeTransitionErase);
equalButton.addEventListener('transitionend', removeTransition);
eraseOne.addEventListener('transitionend', removeTransition);