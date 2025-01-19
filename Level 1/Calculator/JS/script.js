const inputElement = document.querySelector("input");
const historyElement = document.querySelector(".history");
const cancel = document.querySelector(".cancel");

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
            historyElement.textContent = "";
            FINALSUM = 0;
            break;

        case '-':
            FINALSUM = FINALSUM - parseFloat(inputElement.value);
            historyElement.textContent = "";
            inputElement.value = FINALSUM;
            FINALSUM = 0;
            break;

        case '*':
            FINALSUM *= parseFloat(inputElement.value);
            historyElement.textContent = "";
            inputElement.value = FINALSUM;
            FINALSUM = 0;
            break;

        case '/':
            FINALSUM = FINALSUM / parseFloat(inputElement.value);
            historyElement.textContent = "";
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

            case "Backspace":
                backspace();
                break;

            case "Delete":
                clear()
                break;

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

            case 'Enter':
                calulation();
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
    historyElement.textContent = "";
    inputElement.value = "";
    FINALSUM = 0;
    queue = 0;
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

cancel.addEventListener("click", clear);
window.addEventListener("keyup", calculator);