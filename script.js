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
let answer;
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
      previousNber = currentNber;
      operation = button.textContent;
      currentNber = "";
      result.textContent = `${previousNber} ${operation}`;
    }else if(operation!== ""){
      operation=button.textContent;
      result.textContent = `${previousNber} ${operation}`;
    }
    console.log(`Operation: ${operation}`);
  });
  button.addEventListener("mouseenter", function(e){
    e.target.style.backgroundColor= "white";
    e.target.style.color = "#fa9802";
    e.currentTarget.addEventListener("mouseleave", function(){
      e.target.style.backgroundColor= ""; 
      e.target.style.color = "";
    });
  })
});


equalSign.addEventListener("click", function() {
    let a = parseFloat(previousNber);
    let b = parseFloat(currentNber);
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
    display.textContent = answer.toString();  
    console.log(`Answer: ${answer}`);
    currentNber = parseFloat(answer);
    //currentNber = "";
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
          display.textContent = answer;
      }
  })
}) 