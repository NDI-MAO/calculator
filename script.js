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

