const display = document.getElementById('display');
const result = document.getElementById('result');
const numberButtons = document.querySelectorAll(".numberButtons");
const opButtons = document.querySelectorAll(".opButtons");
const equalSign = document.getElementById('equalSign');

let previousNber = "";
let currentNber = "";
let operation = "";

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
    }
  });
});

equalSign.addEventListener("click", function() {
  let answer;
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
      display.textContent = "Error";
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
