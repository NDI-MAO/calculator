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

//Event listener to receive numbers to operate
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    if(currentNber.length <9){
      if (button.textContent === ".") {
        // Check if current number is empty
        if (currentNber === "") {
          currentNber = "0.";
          display.textContent =currentNber.toLocaleString('en-US'); 
        } else if (currentNber.indexOf(".") === -1) {
          currentNber += button.textContent;
          display.textContent =currentNber.toLocaleString('en-US'); 
        }
      } else if (button.textContent !== ".") {
        currentNber += button.textContent;
        display.textContent =parseFloat(currentNber).toLocaleString('en-US'); 
    display.style.fontSize = adjustFontSize(display.textContent) + 'px';
      }
    }
  });
});
//Event listener to receive operation
opButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (currentNber !== "") {
      if (!isNaN(parseFloat(currentNber))) {
        previousNber = parseFloat(currentNber);
      } 
      operation = button.textContent;
      currentNber = "";
      result.textContent = `${previousNber.toLocaleString('en-US')} ${operation}`;
    }else if(operation!== ""){
      operation=button.textContent;
      result.textContent = `${previousNber.toLocaleString('en-US')} ${operation}`;
    }
    console.log(`Operation: ${operation}`);
  });

  //Event listener to change background when clicking operation
  button.addEventListener("mouseenter", function(e){
    e.target.style.backgroundColor= "white";
    e.target.style.color = "#fa9802";
    e.currentTarget.addEventListener("mouseleave", function(){
      e.target.style.backgroundColor= ""; 
      e.target.style.color = "";
    });
  })
});

//Function to adjust font size according to number of inputs
function adjustFontSize(display) {
  const baseFontSize = 70; 
  const fontSizes = [70, 60, 55, 50, 44]; 
  const numDigits = display.length;
  let fontSize = baseFontSize;
  if (numDigits > 6) {
    fontSize = fontSizes[Math.min(numDigits - 6, fontSizes.length - 1)];
  }
  return fontSize;
}

//Event listener to calculate the answer
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
    //Function to add exponent when answer to is large numbers
    if (Math.abs(answer) > 1000000000) {
      const exponent = Math.floor(Math.log10(Math.abs(answer)));
      const base = answer / Math.pow(10, exponent);
      if(answer%1 !==0){
        answer = (base.toFixed(6) + "e" + exponent); 
      }else{
      answer = base + "e" + exponent;
      }
    }
    
    result.textContent = `${previousNber.toLocaleString('en-US')} ${operation} ${currentNber.toLocaleString('en-US')}`;
    display.textContent = answer.toLocaleString('en-US');
    display.style.fontSize = adjustFontSize(display.textContent) + 'px';
    console.log(`Answer: ${answer}`);
    currentNber = parseFloat(answer);
    //currentNber = "";
    operation = "";
    if(operation !==""){
    result.textContent = previousNber.toLocaleString('en-US');
  }
  
  console.log(`Previous Number: ${previousNber}`);
  console.log(`Current Number: ${currentNber}`);
  console.log(`Operation: ${operation}`);
});

//function to manage menu tab (AC, Backspace and percentage)
menuButtons.forEach(button => {
  button.addEventListener("click", ()=>{
      let menu = button.textContent;
      if(menu === "AC"){
          currentNber ="";
          previousNber="";
          operation="";
          result.textContent="";
          display.textContent =0;
          display.style.fontSize = adjustFontSize(display.textContent) + 'px';
      }else if(menu === "⌦"){
          currentNber= currentNber.slice(0, -1);
          display.textContent = parseFloat(currentNber).toLocaleString('en-US');
          display.style.fontSize = adjustFontSize(display.textContent) + 'px';
      }else if (menu === "%"){
          answer =((currentNber)/100).toFixed(2);
          result.textContent = `${parseFloat(currentNber).toLocaleString('en-US')} ${menu}`;
          display.textContent = parseFloat(answer).toLocaleString('en-US');
          display.style.fontSize = adjustFontSize(display.textContent) + 'px';
      }
  })
}) 