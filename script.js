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
    display.textContent = parseFloat(currentNber).toLocaleString('en-US'); // Assuming you have the formatNumberWithCommas function
    display.style.fontSize = adjustFontSize(display.textContent) + 'px';
  });
});


opButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (currentNber !== "") {
      if (!isNaN(parseFloat(currentNber))) {
        previousNber = parseFloat(currentNber);
      } else {
        // Handle invalid input (optional: display error message)
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
  button.addEventListener("mouseenter", function(e){
    e.target.style.backgroundColor= "white";
    e.target.style.color = "#fa9802";
    e.currentTarget.addEventListener("mouseleave", function(){
      e.target.style.backgroundColor= ""; 
      e.target.style.color = "";
    });
  })
});
function adjustFontSize(display) {
  const baseFontSize = 65; 
  const fontSizes = [65, 60, 55, 50, 45]; 
  const numDigits = display.length;
  let fontSize = baseFontSize;
  if (numDigits > 6) {
    fontSize = fontSizes[Math.min(numDigits - 7, fontSizes.length - 1)];
  }

  return fontSize;
}


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
    if (Math.abs(answer) > 1000000) {
      const exponent = Math.floor(Math.log10(Math.abs(answer)));
      const base = answer / Math.pow(10, exponent);
      answer = base.toFixed(2) + "e" + exponent;
    }
    result.textContent = `${previousNber.toLocaleString('en-US')} ${operation} ${currentNber}`;
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
          display.textContent = currentNber;
          display.style.fontSize = adjustFontSize(display.textContent) + 'px';
      }else if (menu === "%"){
          answer =((currentNber)/100).toFixed(2);
          result.textContent = `${currentNber.toLocaleString('en-US')} ${menu}`;
          display.textContent = answer.toLocaleString('en-US');
          display.style.fontSize = adjustFontSize(display.textContent) + 'px';
      }
  })
}) 