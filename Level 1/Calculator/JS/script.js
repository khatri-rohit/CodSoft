const inputElement = document.querySelector("input");
const historyElement = document.querySelector(".temp-history");
const cancelBtn = document.querySelector(".cancel");
const backspaceBtn = document.querySelector(".backspace");
const btns = document.querySelectorAll(".num");
const historyBtn = document.querySelector(".btn-his");
const calhistory = document.querySelector(".all-history");
const historys = document.querySelector(".historys");

var queue;
var FINALSUM;
const calculator = (e) => {
    const inputValue = e.key;
    utility(inputValue);
}

function calulation() {
    let history = historyElement.textContent.split(" ");
    const sign = history[history.length - 1];

    switch (sign) {
        case '+':
            FINALSUM += parseFloat(inputElement.value);
            inputElement.value = FINALSUM;
            addHistory(inputElement.value);
            FINALSUM = 0;
            break;

        case '-':
            FINALSUM = FINALSUM - parseFloat(inputElement.value);
            addHistory(inputElement.value);
            inputElement.value = FINALSUM;
            FINALSUM = 0;
            break;

        case '*':
            FINALSUM *= parseFloat(inputElement.value);
            addHistory(inputElement.value);
            inputElement.value = FINALSUM;
            FINALSUM = 0;
            break;

        case '/':
            FINALSUM = FINALSUM / parseFloat(inputElement.value);
            addHistory(inputElement.value);
            inputElement.value = FINALSUM;
            FINALSUM = 0;
            break;

        default:
            break;
    }
}

function utility(inputValue) {
    try {
        const value = parseFloat(inputValue) || inputValue;
        historyElement.style.color = "black";

        console.log(value);
        switch (value) {
            case '+':
                if (inputElement.value === "") {
                    if (queue === undefined) {
                        historyElement.innerHTML = "Enter Value";
                        historyElement.style.color = "red";
                    }
                    else {
                        historyElement.innerHTML = inputElement.value + " +";
                    }
                    break;
                }
                historyElement.innerHTML = inputElement.value + " +";
                queue = parseFloat(inputElement.value);
                FINALSUM = queue + (FINALSUM || 0);
                inputElement.value = "";
                break;

            case '-':
                if (inputElement.value === "") {
                    if (queue === undefined) {
                        historyElement.innerHTML = "Enter Value";
                        historyElement.style.color = "red";
                    }
                    else {
                        historyElement.innerHTML = inputElement.value + " -";
                    }
                    break;
                }
                historyElement.innerHTML = inputElement.value + " -";
                queue = parseFloat(inputElement.value);
                console.log(FINALSUM);
                FINALSUM = queue - (FINALSUM || 0);
                console.log(FINALSUM);
                inputElement.value = "";
                break;

            case '*':
                if (inputElement.value === "") {
                    if (queue === undefined) {
                        historyElement.innerHTML = "Enter Value";
                        historyElement.style.color = "red";
                    }
                    else {
                        historyElement.innerHTML = queue + " *";
                    }
                    break;
                }
                historyElement.innerHTML = inputElement.value + " *";
                queue = parseFloat(inputElement.value);
                console.log(FINALSUM);
                FINALSUM = queue * (FINALSUM || 1);
                console.log(FINALSUM);
                inputElement.value = "";
                break;

            case '/':
                if (inputElement.value === "") {
                    if (queue === undefined) {
                        historyElement.innerHTML = "Enter Value";
                        historyElement.style.color = "red";
                    }
                    else {
                        historyElement.innerHTML = queue + " /";
                    }
                    break;
                }
                historyElement.innerHTML = inputElement.value + " /";
                queue = parseFloat(inputElement.value);
                console.log(FINALSUM);
                FINALSUM = (FINALSUM || (queue * queue)) / queue;
                inputElement.value = "";
                break;

            case '=':
                calulation();
                break;

            case "Enter":
                calulation();
                break;

            case "Backspace":
                backspace();
                break;

            case "Delete":
                clear();
                break;

            default:
                break;
        }
        if ((parseFloat(inputValue) >= 0 || parseFloat(inputValue) <= 9 || inputValue === '.') && inputElement.value === "0") {
            inputElement.value = value;
            queue = parseFloat(inputElement.value);
        }
        else if (parseFloat(inputValue) >= 0 || parseFloat(inputValue) <= 9 || inputValue === '.') {
            inputElement.value = inputElement.value + value;
            queue = parseFloat(inputElement.value);
        }

    } catch (error) {
        console.log(error);
    }
}

const clear = () => {
    FINALSUM = undefined;
    queue = undefined;
    historyElement.textContent = "";
    inputElement.value = "";
}

const backspace = () => {
    const value = inputElement.value;
    const numbers = value.split("");
    if (numbers.length === 1) {
        inputElement.value = 0;
        return;
    } else {
        let remaningNumbers = "";
        for (let i = 0; i < numbers.length - 1; i++) {
            remaningNumbers = remaningNumbers + numbers[i];
        }
        console.log(remaningNumbers);
        inputElement.value = remaningNumbers;
    }
}

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        utility(btn.value);
    })
});

historyBtn.addEventListener("click", () => {
    const history = document.querySelectorAll(".history");
    console.log(calhistory.style.display);
    if (calhistory.style.display === "none") {
        calhistory.style.display = "block";
        if (history.length === 0) {
            historys.innerHTML = `<p style="font-weight=800">No Calculation History</p>`;
        }
    } else {
        calhistory.style.display = "none";
    }
})

function addHistory(value) {
    const create = document.createElement("p");
    create.setAttribute("class", "history");
    create.textContent = historyElement.textContent + " " + value + " = " + FINALSUM;
    historys.appendChild(create);
    console.log(historys);
    historyElement.textContent = "";
}

cancelBtn.addEventListener("click", clear);
backspaceBtn.addEventListener("click", backspace);
window.addEventListener("keyup", calculator);