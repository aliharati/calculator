const buttons = document.querySelectorAll(".button");
let text;
function Calculator() {
  this.methods = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
  };
  this.calculate = function (str) {
    if (str.includes("+")) {
      a = +str.split("+")[0];
      op = "+";
      b = +str.split("+")[1];
    } else if (str.includes("-")) {
      a = +str.split("-")[0];
      op = "-";
      b = +str.split("-")[1];
    } else if (str.includes("*")) {
      a = +str.split("*")[0];
      op = "*";
      b = +str.split("*")[1];
    } else {
      a = +str.split("/")[0];
      op = "/";
      b = +str.split("/")[1];
    }

    if (!this.methods[op] || isNaN(a) || isNaN(b)) {
      return "";
    }

    return this.methods[op](a, b);
  };
}
let calc = new Calculator();
Array.from(buttons).forEach((element) =>
  element.addEventListener("click", function (e) {
    text = e.target.innerText;
  })
);
Array.from(buttons).forEach((element) =>
  element.addEventListener("click", addToScreen)
);

document.querySelector(".equal").addEventListener("click", startCalculate);

function addToScreen() {
  document.querySelector("#equationScreen").innerText += text;
}
console.log(buttons);

function startCalculate() {
  let newText = document.querySelector("#equationScreen").innerText;
  document.querySelector("#resultScreen").innerText = calc.calculate(newText);
  document.querySelector("#equationScreen").innerText = calc.calculate(newText);
}
document.querySelector("#deleteButton").addEventListener("click", deleteNumber);

function deleteNumber() {
  let newText = document.querySelector("#equationScreen").innerText;
  document.querySelector("#equationScreen").innerText = newText.slice(
    0,
    newText.length - 1
  );
}
document.querySelector("#clearButton").addEventListener("click", clearScreen);

function clearScreen() {
  document.querySelector("#equationScreen").innerText = "";
  document.querySelector("#resultScreen").innerText = "";
}
let operators = document.querySelectorAll(".operator");
Array.from(operators).forEach((element) =>
  element.addEventListener("click", function (e) {
    text = e.target.innerText;
  })
);

Array.from(operators).forEach((element) =>
  element.addEventListener("click", checkOperation)
);

function checkOperation() {
  addToScreen();
  let operation = document.querySelector("#equationScreen").innerText;
  let operator = 0;
  for (i = 0; i < operation.length; i++) {
    if (
      operation[i] == "+" ||
      operation[i] == "-" ||
      operation[i] == "*" ||
      operation[i] == "/"
    ) {
      operator += 1;
    }
  }

  if (operator > 1) {
    deleteNumber();
    startCalculate();
    addToScreen();
  }
}
