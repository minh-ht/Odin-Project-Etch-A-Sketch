// get Elements
const container = document.querySelector(".container");
const divs = container.childNodes;
const slider = document.getElementById("number");
const inbox = document.querySelector(`input[type="text"]`);
const clear = document.getElementById("clear");
const button1 = document.getElementById("mode1");
const button2 = document.getElementById("mode2");
const button3 = document.getElementById("mode3");
const button4 = document.getElementById("mode4");
//

// function declare
function makeBoard(num = 16){
    container.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${num}, 1fr)`;
    for (let _ = 0; _ < num*num; _++)
        container.append(document.createElement("div"));
}

function reset() {
    divs.forEach(div => {
        div.style.backgroundColor = "";
        div.style.filter = "brightness(1)";
    });
}

function getRandomRGB() {
    let num = Math.round(0xFFFFFF * Math.random());
    let r = num >> 16;
    let g = num >> 8 & 0xFF;
    let b = num & 0xFF;
    return `rgb(${r}, ${g}, ${b})`;
}

function mode1() {
    this.style.backgroundColor = "#000";
}

function mode2() {
    if (this.style.backgroundColor == "")
        this.style.backgroundColor = getRandomRGB();
}

function mode3() {
    if (this.style.filter == "")
        this.style.filter = "brightness(1)";
    let filter = this.style.filter;
    let regExp = /\(([^)]+)\)/;
    let matches = regExp.exec(filter);
    if (matches[1] != '0') {
        let brightness = matches[1] - 0.1;
        this.style.filter = `brightness(${brightness})`;
    }
}

function mode4() {
    if (this.style.backgroundColor == "")
        this.style.backgroundColor = getRandomRGB();
    if (this.style.filter == "")
        this.style.filter = "brightness(1)";
    let filter = this.style.filter;
    let regExp = /\(([^)]+)\)/;
    let matches = regExp.exec(filter);
    if (matches[1] != '0') {
        let brightness = matches[1] - 0.1;
        this.style.filter = `brightness(${brightness})`;
    }
}

function change1() {
    divs.forEach(div => div.addEventListener("mouseover", mode1));
}

function change2() {
    divs.forEach(div => {
        div.removeEventListener("mouseover", mode1);
        div.removeEventListener("mouseover", mode3);
        div.removeEventListener("mouseover", mode4);
        div.addEventListener("mouseover", mode2);
    });
}

function change3() {
    divs.forEach(div => {
        div.removeEventListener("mouseover", mode1);
        div.removeEventListener("mouseover", mode2);
        div.removeEventListener("mouseover", mode4);
        div.addEventListener("mouseover", mode3);
    });
}

function change4() {
    divs.forEach(div => {
        div.removeEventListener("mouseover", mode1);
        div.removeEventListener("mouseover", mode2);
        div.removeEventListener("mouseover", mode3);
        div.addEventListener("mouseover", mode4);
    });
}
//

// script
makeBoard();
divs.forEach(div => div.addEventListener("mouseover", mode4));

slider.addEventListener("input", (e) => {
    let value = e.target.value;
    inbox.value = value;
    while (container.firstChild)
        container.removeChild(container.firstChild);
    makeBoard(value);
});

inbox.addEventListener("input", (e) => {
    let value = e.target.value;
    slider.value = value;
    while (container.firstChild)
        container.removeChild(container.firstChild);
    makeBoard(value);
});

button1.addEventListener("click", change1);
document.addEventListener("keypress", (e) => {
    if (e.key == '1')
        change1();
});

button2.addEventListener("click", change2);
document.addEventListener("keypress", (e) => {
    if (e.key == '2')
        change2();
});

button3.addEventListener("click", change3);
document.addEventListener("keypress", (e) => {
    if (e.key == '3')
        change3();
});

button4.addEventListener("click", change4);
document.addEventListener("keypress", (e) => {
    if (e.key == '4')
        change4();
});

clear.addEventListener("click", reset);
document.addEventListener("keypress", (e) => {
    if (e.key == 'c')
        reset();
});
//