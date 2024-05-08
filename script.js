const display = document.getElementById('display');
const result = document.getElementById('result');
const numberButtons = document.querySelectorAll(".numberButtons");
const opButtons = document.querySelectorAll(".opButtons");
const menuButtons = document.querySelectorAll("menuButtons");

let previousNber = "";
let currentNber = "";
let operation = "";

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (operation !== "") {
            currentNber = ""; 
            display.textContent = "";
            operation = "";
        }
        currentNber += button.textContent;
        display.textContent += button.textContent;
    });
});

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentNber !== "") {
            previousNber = currentNber;
            operation = button.textContent;
            result.textContent += `${previousNber} ${operation}`;
            currentNber = "";
        }
    });
});