// Array of words to choose from
const words = ["tyler", "bug", "stinky"];

// Select a random word from the array
let selectedWord = words[Math.floor(Math.random() * words.length)];

// Array to store guessed letters
let guessedLetters = [];

// Number of attempts allowed
let attempts = 6;

// Function to initialize the game
function initializeGame() {
    // Display underscores for each letter in the selected word
    let displayWord = selectedWord.replace(/[a-z]/g, "_");
    document.getElementById("word-container").textContent = displayWord;

    // Display remaining attempts
    document.getElementById("attempts-container").textContent = `Attempts remaining: ${attempts}`;
}

// Function to make a guess
function makeGuess() {
    // Get the guessed letter from the input field
    let guess = document.getElementById("guess-input").value.toLowerCase();

    // Check if the guessed letter is valid
    if (guess.match(/[a-z]/) && guess.length === 1) {
        // Check if the letter has not been guessed before
        if (!guessedLetters.includes(guess)) {
            guessedLetters.push(guess);

            // Check if the guessed letter is in the selected word
            if (selectedWord.includes(guess)) {
                updateDisplayWord();
            } else {
                attempts--;
            }

            // Display the guessed letters and remaining attempts
            document.getElementById("guesses-container").textContent = `Guessed letters: ${guessedLetters.join(", ")}`;
            document.getElementById("attempts-container").textContent = `Attempts remaining: ${attempts}`;

            // Check if the game is won or lost
            if (isGameWon()) {
                alert("Congratulations! You won!");
                resetGame();
            } else if (attempts === 0) {
                alert(`Sorry, you lost. The correct word was "${selectedWord}".`);
                resetGame();
            }
        } else {
            alert("You already guessed that letter. Try another one.");
        }
    } else {
        alert("Please enter a valid single letter.");
    }

    // Clear the input field
    document.getElementById("guess-input").value = "";
}

// Function to update the displayed word with correctly guessed letters
function updateDisplayWord() {
    let displayWord = "";
    for (let char of selectedWord) {
        if (guessedLetters.includes(char)) {
            displayWord += char;
        } else {
            displayWord += "_";
        }
    }
    document.getElementById("word-container").textContent = displayWord;
}

// Function to check if the game is won
function isGameWon() {
    return document.getElementById("word-container").textContent === selectedWord;
}

// Function to reset the game
function resetGame() {
    // Reset variables
    guessedLetters = [];
    attempts = 6;
    selectedWord = words[Math.floor(Math.random() * words.length)];

    // Reset display
    initializeGame();
    document.getElementById("guesses-container").textContent = "";
}

// Initialize the game when the page loads
initializeGame();