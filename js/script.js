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
let result = 0;
function operate(operator,a,b) {
    a = Number(a);
    b = Number(b);

    switch (operator) {
    case "+":
        result = add(a,b);
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

// -----
const screen = document.querySelector("#screen");
const numButton = document.querySelectorAll(".numButton");
numButton.forEach(item => item.addEventListener('click', numberToScreen));
screen.value = null;
screen.addEventListener('click', showValue);

function showValue(e) {
    console.log(e.target.value);
}

let numA = ""; 
let numB = "";
let screenData = [];
let screenNumbers = [];
let operator;


function test (e) {
    console.log(e.target.value);
}
function numberToScreen(e) {
    screen.textContent += e.target.value;
    screen.value = screen.textContent;
};

const opButton = document.querySelectorAll(".opButton");
opButton.forEach(item => item.addEventListener('click', touchOperator))

function touchOperator(e) {
 screen.value = e.target.value;
 
    /*operator = e.target.textContent;
    screenNumbers.push(screen.textContent);
    screen.value = null;
    screen.textContent = numButton.forEach(item => item.addEventListener('click', numberToScreen));
*/
    //numButton.forEach(item => item.addEventListener('click', newNumberToScreen));
    
}


function newNumberToScreen(e) {
    screen.textContent = e.target.value;
}


/*function inputNumbers(e) {
    screenData.push(screen.textContent);
    screenData.push(e.target.textContent);
}*/


/*let a = screenData[0];
let b = screenData[2];
let operator = screenData[1];
*/
const equalButton = document.getElementById("equalButton");

equalButton.addEventListener('click', equalFunction);

function equalFunction() {
    let a = screenNumbers[0];
    let b = screenNumbers[1];
    operate(operator,a,b);
    screen.textContent = result;
}

