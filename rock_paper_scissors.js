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


