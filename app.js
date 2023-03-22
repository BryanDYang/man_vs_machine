window.onload = beginningAnimation();
let computerSelection;
let playerSelection;
let computerScore = 0;
let playerScore = 0;

let button = document.querySelectorAll(".button");
const body = document.querySelector("body");
const main = document.querySelector("main");
const endAlrt = document.querySelector("#end-alert");
const endDesc = document.querySelector("#end-desc");
const returnMainBtn = document.querySelector("retry-btn");
const desc = document.querySelector("#desc3");
const container = document.querySelector("#results-container");

body.addEventListener("click", skipAnime());
body.addEventListener("keydown", skipAnime());

function skipAnime () {
    const span = document.querySelectorAll("span");
    
    span.forEach((span) => span.classList.add("skip"));
}

function beginningAnimation () {
    fadeIn();
    // need to turn nodelist of spans into an array to access last value for ontransitioned
    const desc1 = document.querySelector("#desc1");
    let descSpan = desc1.querySelectorAll("span");

    desc1Span = Array.from(desc1Span);

    const desc2 = document.querySelector("#desc2");
    const desc3 = document.querySelector("#desc3");

    desc1Span[desc1Span.length - 1].ontrasitioned = () => {
        desc1.classList.add("fade-out");
        
        desc1.addEventListener("animationed", () => {
            desc1.classList.add("disappear");
            desc1.classList.remove("animate");
            desc2.classList.remove("disappear");
            desc2.classList.add("animate");
            fadeIn();
            /* need to collect nodelist of span in the same function that activate fadein(),
                else the nodelist will be empty */
            let desc2Span = desc2.querySelectorAll("span");
            desc2Span = Array.from(desc2Span);
            
            desc2Span[desc2Span.length - 1].ontransitioned = () => {
                desc2.classList.add("fade-out");
                desc2.addEventListener("animationed", () => {
                    desc2.classList.add("disappear");
                    desc2.classList.remove("animate");
                    desc3.classList.remove("disappear");
                    desc3.classList.add("animate");
                    fadeIn();

                    let desc3Span = desc3.querySelectorAll("span");
                    desc3Span = Array.from(desc3Span);

                    desc3Span[desc3Span.length - 1].ontransitioned = () => {
                        const cta = document.querySelector("#cta");

                        cta.classList.add("drop-down");

                        cta.addEventListener("animationed", () => {
                            const gameCtn = document.querySelector("#game-container");

                            setTimeout(function () {
                                gameCtn.classList.add("fade-in");
                            }, 300);
                        });
                    };
                });
            };
        });
    };
}

function fadeIn () {
    let text = document.querySelector(".animate");

    let strText = text.textContent;
    let splitText = strText.split("");
    text.textContent = "";
    //append span tags to each character in the string
    for (i = 0; i < splitText.length; i++) {
        text.innerHTML += '<span>${splitText[i]}</span>';
    }

    let char = 0;
    let timer = setInterval(onTick, 50);

    function onTick() {
        const span = text.querySelectorAll("span")[char];
        span.classList.add("fade");
        char++;
        //stops the function from running once the end of the string has been reached
        if(char === splitText.length) {
            complete(0);
            return;
        }
    }
    function complete() {
        clearInterval(timer);
        timer = null;
    }
}

button.forEach((button) => {
    button.addEventListener("click", () => {
        const img = button.querySelector("img");
        playerSelection = img.alt.toLowerCase();

        playRound(playerSelection, computerSelection);

        if (playerSelection === 5 || computerSelection === 5) {
            declareWinner();
        }
    });
});

const myArray = ["Rock", "Paper", "Scissors"];

function computerPlay() {
    return myArray[~~(Math.random() * myArray.length)];
}

function playRound(playerSelection, computerSelection) {
    computerSelection = computerPlay().toLowerCase();
    playerSelection = playerSelection.toLowerCase();
    if (computerSelection == playerSelection) {
        displayResults("Tie Game!");
    } else if (
        (computerSelection == "rock" && playerSelection == "scissors") ||
        (computerSelection == "scissors" && playerSelection == "paper") ||
        (computerSelection == "paper" && playerSelection == "rock")
    ) {
        computerScore = ++computerScore;
        keepCpuScore();
        if (computerScore === 1) {
            displayResults (
                `Oh no! You lost.
                ${capitalize(computerSelection)} beats ${playerSelection}.`
            );
        } else if (computerScore === 2) {
            displayResults(
                `Arghh. ${capitalize(
                    computerSelection
                )} beats ${playerSelection}. Give it another shot!`
            );
        } else if (computerScore === 3) {
            displayResults (
                `${capitalize(
                    computerSelection
                )} beats ${playerSelection}. It's ok. You got this!!`
            );
        } else if (computerScore === 4) {
            displayResults(
                `Oh no. It's match point!! ${capitalize(
                    computerSelection
                )} beats ${playerSelection}. Don't let us down!`
            );
        } else {
            displayResults(`${computerSelection} beats ${playerSelection}`);
        }
    } else {
        playerScore = ++playerScore;
        keepPlayerScore();
        if (playerScore == 1) {
            displayResults(
                `Let's go! You won!!
                ${capitalize(playerSelection)} beats ${computerSelection}.`
            );
        } else if (playerScore === 2) {
            displayResults(
                `You're pretty good at this. ${capitalize(
                    playerSelection
                )} beats ${computerSelection}.`
            );
        } else if (playerScore === 3){
            displayResults(
                `${capitalize(
                    playerSelection
                )} beats ${computerSelection}! Has mankind found its savior??`
            );
        } else if (playerScore === 4){
            displayResults(
                `${capitalize(
                    playerSelection
                )} beats ${computerSelection}. One more and you're a hero!`
            );
        } else {
            displayResults(`${playerSelection} beats ${computerSelection}`);
        }
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function displayResults(str) {
    container.animate([{ opacity: 0}, {opacity: 1}], {
        duration: 300,
        fill: "forwards",
        iterations: 1,
        delay: 0,
        easing: "ease-out",
    });
    container.textContent = str;
}

function declareWinner() {
    rplContent();
    if (playerScore > computerScore) {
        endDesc.textContent = "You win! Mankind lives another day!!";
        returnMainBtn.innerText = "Play Again";
    } else {
        endDesc.textContent = "You lost... who will save mankind now?";
        returnMainBtn.innerText = "Play Again";
    }
    fadeIn();

    let endDescSpan = endDesc.querySelectorAll("span");
    endDescSpan = Array.from(endDescSpan);

    endDescSpan[endDescSpan.length - 1].onanimationend = () => {
        returnMainBtn.classList.add("fade-in");
        /*returnMainBtn.animate([{ opacity: 0}, { opacity: 1}], {
            duration: 00,
            fill: "forwards",
            iterations: 1,
            delay: 0,
            easing: "ease-in",
        });*/
    };
}

function rplContent() {
    main.classList.add("disappear");
    endAlrt.classList.remove("disappear");
    desc.classList.remove("animate");
    endDesc.classList.add("animate");

    returnMainBtn.addEventListener("click", () => {
        main.classList.remove("disappear");
        endAlrt.classList.add("disappear");
        desc.classList.add("animate");
        returnMainBtn.classList.remove("fade-in");
        resetGame();
    });
}

function resetGame() {
    fadeIn();
    container.textContent = "";
    playerScore = 0;
    computerScore = 0;
    keepPlayerScore();
    keepCpuScore();
}

function keepPlayerScore () {
    let playerScoreBox = document.querySelector("#player-score");

    playerScoreBox.animate([{opacity: 0}, {opacity: 1}], {
        duration: 300,
        fill: "forwards",
        iterations: 1,
        delay: 0,
        easing: "ease-out",
    });

    playerScoreBox.textContent = playerScore;
}


function keepCpuScore() {
    let computerScoreBox = document.querySelector("#computer-score");

    computerScoreBox.animate([{opacity: 0}, {opacity: 1}], {
        duration: 300,
        fill: "forwards",
        iterations: 1,
        delay: 0,
        easing: "ease-out",
    });

    computerScoreBox.textContent = computerScore;
}