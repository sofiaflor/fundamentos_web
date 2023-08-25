const words = ["JAVASCRIPT", "HTML", "CSS", "CODIGO", "PROGRAMACION", "WEB", "PAGINA"];
const maxAttempts = 6;
let currentWord = "";
let guessedWord = [];
let attempts = 0;

const wordDisplay = document.getElementById("wordDisplay");
const message = document.getElementById("message");
const keys = document.querySelectorAll(".key");
const resetButton = document.getElementById("resetButton");

function chooseRandomWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = Array(currentWord.length).fill("_");
    displayWord();
}

function displayWord() {
    wordDisplay.textContent = guessedWord.join(" ");
}

function checkLetter(letter) {
    if (currentWord.includes(letter)) {
        for (let i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }
        displayWord();
        if (!guessedWord.includes("_")) {
            endGame(true);
        }
    } else {
        attempts++;
        updateHangman();
        if (attempts >= maxAttempts) {
            endGame(false);
        }
    }
}

function updateHangman() {
    const parts = ["head", "body", "left-arm", "right-arm", "left-leg", "right-leg"];
    if (attempts <= maxAttempts) {
        document.querySelector(`.hangman .${parts[attempts - 1]}`).style.backgroundColor = "red";
    }
}

function endGame(isWinner) {
    if (isWinner) {
        message.textContent = "¡Ganaste! La palabra era: " + currentWord;
    } else {
        message.textContent = "Perdiste. La palabra correcta era: " + currentWord;
    }
    disableKeyboard();
}

function disableKeyboard() {
    keys.forEach((key) => {
        key.removeEventListener("click", handleKeyPress);
        key.classList.add("disabled");
    });
}

function resetGame() {
    attempts = 0;
    document.querySelectorAll(".hangman div").forEach((part) => {
        part.style.backgroundColor = "#333";
    });
    message.textContent = "";
    enableKeyboard();
    chooseRandomWord();
}

function enableKeyboard() {
    keys.forEach((key) => {
        key.addEventListener("click", handleKeyPress);
        key.classList.remove("disabled");
    });
}

function handleKeyPress(event) {
    const letter = event.target.getAttribute("data-letter");
    event.target.classList.add("disabled");
    checkLetter(letter);
}

resetButton.addEventListener("click", resetGame);

// Iniciar el juego al cargar la página
chooseRandomWord();
enableKeyboard();