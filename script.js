const display = document.getElementById('display');
const result = document.getElementById('result');
const numberButtons = document.querySelectorAll(".numberButtons");
const opButtons = document.querySelectorAll(".opButtons");
const equalSign = document.getElementById('equalSign');
const menuButtons = document.querySelectorAll(".menuButtons");
const backspace = document.getElementById('backspace');

let previousNber = "";
let currentNber = "";
let operation = "";
display.textContent=0;
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentNber += button.textContent;
    display.textContent = currentNber;
  });
});

opButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (currentNber !== "") {
      previousNber = parseFloat(currentNber);
      operation = button.textContent;
      currentNber = "";
      result.textContent = `${previousNber} ${operation}`;
    }
  });
});

equalSign.addEventListener("click", function() {
    let answer;
    let a = (previousNber);
    let b = (currentNber);
    if (operation == "+") {
        answer = a + b;
    } else if (operation == "-") {
        answer = a - b;
    } else if (operation == "×") {
        answer = a * b;
    } else if (operation == "÷") {
        if (b === 0){
        display.textContent = "Error";
        return;
        }
        answer = a / b;
    } else {
        display.textContent = answer;
        return;
    }
    result.textContent = `${previousNber} ${operation} ${currentNber}`;
    display.textContent = answer;  
    console.log(`Answer: ${answer}`);
  
  currentNber = answer.toString();
         
  operation = "";
  if(operation !==""){
  result.textContent = previousNber;
  }
  console.log(`Previous Number: ${previousNber}`);
  console.log(`Current Number: ${currentNber}`);
  console.log(`Operation: ${operation}`);
});

menuButtons.forEach(button => {
  button.addEventListener("click", ()=>{
      let menu = button.textContent;
      if(menu === "AC"){
          currentNber ="";
          previousNber="";
          operation="";
          result.textContent="";
          display.textContent =0;
      }else if(menu === "⌦"){
          currentNber= currentNber.slice(0, -1);
          display.textContent = currentNber;
      }else if (menu === "%"){
          answer =((currentNber)/100).toFixed(2);
          result.textContent = `${currentNber} ${menu}`;
      }
      display.textContent = answer;
      currentNber = answer;
operation = "";
  })
}) 