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

// TRY 2

const screen = document.querySelector('#screen');
const numericalButtons = document.querySelectorAll('.numButton');
numericalButtons.forEach(item => item.addEventListener('click', addNumbersA));

let valoresA = '';
let valoresB = '';
let check = 'a';

function addNumbersA(e) {
    valoresA += e.target.dataset.value;
    screen.textContent = valoresA;
    check = 'a';
}

function addNumbersB(e) {
    valoresB += e.target.dataset.value;
    screen.textContent = valoresB;
    check = 'b';
}

const eraseButton = document.querySelector(".eraseAll");
eraseButton.addEventListener('click', eraseAll)

function eraseAll() {
    valoresA = '';
    op = '';
    valoresB = '';
    screen.textContent = '0';
    numericalButtons.forEach(item => item.removeEventListener('click', addNumbersB));
    numericalButtons.forEach(item => item.addEventListener('click', addNumbersA));
    point.addEventListener('click', pointOnScreen);
}

const eraseOne = document.querySelector(".eraseOne");
eraseOne.addEventListener('click', eraseO);

function eraseO() {
    if (check === 'a') {
   valoresA = valoresA.slice(0,-1);
   screen.textContent = valoresA;
   } else if (check == 'b') {
    valoresB = valoresB.slice(0,-1);
    screen.textContent = valoresB;
   }
}

const operators = document.querySelectorAll('.opButton');

operators.forEach(item => item.addEventListener('click', runOperator));


let result = 0;
let op;


function runOperator(e) {
   // operators.forEach(item => item.classList.add('pressing'));
   const operatorsButton = document.querySelector(`button[value="${e.target.value}"]`);
   operatorsButton.classList.add('pressing');
    if(!op) op = e.target.value;
    if(!valoresA && op === '-') { 
        valoresA += op; 
        screen.textContent = valoresA
    }
    if(valoresA) {
    numericalButtons.forEach(item => item.removeEventListener('click', addNumbersA));
    window.removeEventListener('keydown', pressKeyValueA);
    numericalButtons.forEach(item => item.addEventListener('click', addNumbersB));
    window.addEventListener('keydown', pressKeyValueB);
    }
    point.addEventListener('click', pointOnScreen);
   
    if(valoresA !== '' && valoresB !== '') {
        result = operate(op,valoresA,valoresB);
        screen.textContent = result;
        valoresA = '';
        valoresB = '';
        valoresA = result;
        op = e.target.value;
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
    if(check === 'a') { 
        valoresA += e.target.value; 
        screen.textContent = valoresA; 
        point.removeEventListener('click', pointOnScreen)
    } else if(check === 'b') { 
        valoresB += e.target.value; 
        screen.textContent = valoresB; 
        point.removeEventListener('click', pointOnScreen);
    }
}

const restButton = document.querySelector('#restButton');
const equalButton = document.querySelector('#equalButton');

equalButton.addEventListener('click', showResults);
 function showResults() {
    if(valoresA !== '' && valoresB !== '') {
    screen.textContent = operate(op,valoresA,valoresB);
    numericalButtons.forEach(item => item.removeEventListener('click', addNumbersB));
    numericalButtons.forEach(item => item.addEventListener('click', addNumbersA));
    }
    if(result) {
        numericalButtons.forEach(item => item.removeEventListener('click', addNumbersA));
        numericalButtons.forEach(item => item.addEventListener('click', addNumbersB));
    }
 }

// FALTA UN CERO EN EL INICIO 
// CUANDO TOCAS PUNTO APARECE UN CERO ANTES
// NEGATIVO EN EL VALORB 

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
    valoresA += keyPress.dataset.value;
    screen.textContent = valoresA;
    check = 'a';
    keyPress.classList.add('pressing');
}

function pressKeyValueB(e) {
    const keyPress = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if(!keyPress) return;
    valoresB += keyPress.dataset.value;
    screen.textContent = valoresB;
    check = 'b';
    keyPress.classList.add('pressing');
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('pressing');
  }
numericalButtons.forEach(button => button.addEventListener('transitionend', removeTransition));
operators.forEach(button => button.addEventListener('transitionend', removeTransition));


