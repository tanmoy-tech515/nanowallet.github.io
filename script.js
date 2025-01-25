document.addEventListener("DOMContentLoaded", function () {
    const hangmanImage = document.querySelector(".hangman-box img");
    const wordDisplay = document.querySelector(".word-display");
    const guessText = document.querySelector(".guesses-text b");
    const keyboardDiv = document.querySelector(".keyboard");
    const gameModal = document.querySelector(".game-modal");
    const playagainBtn = document.querySelector(".play-again");
    
    let currentWord, correctLetters , wrongGuessCount;
    const maxGuesses = 6;

    const resetGame=() => {
        //reseting all game variables and ui elements
        correctLetters =[];
        wrongGuessCount = 0;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
        guessText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
        keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
        wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
        gameModal.classList.remove("show"); 
    }

    const getRandomWord = () => {
        const { word, hint } = WordList[Math.floor(Math.random() * WordList.length)];
        currentWord = word;
        console.log(word);
        document.querySelector(".hint-text b").innerText = hint;
        resetGame();
    };

    const gameOver = (isVictory) => {
        setTimeout(() => {
            const modalText = isVictory ? `You found the word:` : `The correct word was:`;
            const modalImage = gameModal.querySelector("img");
            modalImage.src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
            modalImage.onload = () => {
                gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over'}`;
                gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
                gameModal.classList.add("show"); // Ensure "show" is correctly added
            };
        }, 300);
    };

    const initGame = (clickedLetter, button) => {
        if (currentWord.includes(clickedLetter)) {
            [...currentWord].forEach((letter, index) => {
                if (letter === clickedLetter) {
                    correctLetters.push(letter);
                    wordDisplay.querySelectorAll("li")[index].innerText = letter;
                    wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
                }
            });
        } else {
            wrongGuessCount++;
            hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
        }
        button.disabled = true; 
        guessText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
        // calling gameOver function if any of these condition meets.
        if (wrongGuessCount === maxGuesses) return gameOver(false);
        if (correctLetters.length === currentWord.length) return gameOver(true);
    };

    for (let i = 97; i <= 122; i++) {
        const button = document.createElement("button");
        button.innerText = String.fromCharCode(i);
        keyboardDiv.appendChild(button);
        button.addEventListener("click", () => initGame(String.fromCharCode(i), button));
    }
    
    getRandomWord();
    playagainBtn.addEventListener("click", getRandomWord);
});
