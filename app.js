let systemSequence = [];
let userSequence = [];

let startValue = false;
let gameLevel = highScore = 0;
let buttonColor = ["btn-red", "btn-yellow", "btn-purple", "btn-green"];

let headingTwo = document.querySelector("h2");
let headingThree = document.querySelector("h3");

document.addEventListener("keypress", function () {
    if (startValue == false) {
        console.log("game is started!");
        startValue = true;
    }

    levelUp();
});

function buttonFlash(button) {
    button.classList.add("flash");
    setTimeout(() => {
        button.classList.remove("flash")
    }, 300);
    // console.log(button);
}

function levelUp() {
    userSequence = [];
    gameLevel++;// gameLevel = gameLevel + 1
    headingTwo.innerText = `Level ${gameLevel}`;

    let randomIndex = Math.floor(Math.random() * 4);
    let randomColor = buttonColor[randomIndex];

    let randomButton = document.querySelector(`#${randomColor}`);
    systemSequence.push(randomColor);
    console.log(systemSequence);
    buttonFlash(randomButton);
}

function checkAnwer(index) {
    if (systemSequence[index] === userSequence[index]) {
        if (systemSequence.length == userSequence.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        headingTwo.innerText = `Game Over :( \n Your score is: ${gameLevel-1} \n Press any key(*) to start again`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 130);
        if (gameLevel > highScore) {
            headingThree.innerText = `High Score is : ${gameLevel-1}`
        }
        resetGame();
    }
}

function buttonPress() {
    // console.log("button was clicked"); 
    let button = this;
    buttonFlash(button);

    let userColor = button.getAttribute("id");
    userSequence.push(userColor);
    console.log(userSequence);

    checkAnwer(userSequence.length - 1);
}

let allButtons = document.querySelectorAll(".btn");
for (button of allButtons) {
    button.addEventListener("click", buttonPress);
}

function resetGame() {
    highScore = gameLevel;
    startValue = false;
    systemSequence = [];
    userSequence = [];
    gameLevel = 0; 
}