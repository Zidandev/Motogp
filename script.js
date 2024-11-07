const words = [
    "ROSSI", "MARQUEZ", "DUCATI", "YAMAHA", "HONDA", "LORENZO", "SUZUKI", "APRILIA", "MOTOGP",
    "KTM", "MARTIN", "PECCO", "ACOSTA", "DOOHAN", "HAYDEN", "NAKAGAMI", "STONER", "PEDROSA"
];

let chosenWord = words[Math.floor(Math.random() * words.length)];
let displayWord = "_".repeat(chosenWord.length);
let guessedLetters = [];
let lives = 5;
let score = 0;
let cooldown = false;
let cooldownTime = 30; // Cooldown time in seconds

// Update the word display
document.getElementById("word-display").textContent = displayWord;
document.getElementById("score").textContent = score;
document.getElementById("lives").textContent = lives;

let clue = generateClue(); // Generate the clue

// Function to update clue
function updateClue() {
    clue = generateClue();
    document.getElementById("clue").textContent = `Clue: ${clue}`;
}

// Generate a random clue (one word in a random position of the word)
function generateClue() {
    let cluePosition = Math.floor(Math.random() * chosenWord.length); // Random position in the word
    let clueLetter = chosenWord[cluePosition]; // The letter at the random position
    let clueWord = "_".repeat(chosenWord.length); // Start with all underscores

    // Replace the underscore at the random position with the correct letter
    clueWord = clueWord.slice(0, cluePosition) + clueLetter + clueWord.slice(cluePosition + 1);

    return clueWord;
}

// Display the first clue
updateClue();

// Handle guess input
document.getElementById("guess-button").addEventListener("click", function() {
    const guessInput = document.getElementById("guess-input");
    const guessedLetter = guessInput.value.toUpperCase();
    guessInput.value = ""; // Clear input

    if (cooldown) {
        showMessage("Tunggu 30 detik sebelum mencoba lagi.");
        return;
    }

    if (guessedLetter.length !== 1 || !/^[A-Z]$/.test(guessedLetter)) {
        showMessage("Masukkan satu huruf saja!");
        return;
    }

    if (guessedLetters.includes(guessedLetter)) {
        showMessage(`Huruf ${guessedLetter} sudah ditebak!`);
        return;
    }

    guessedLetters.push(guessedLetter);

    if (chosenWord.includes(guessedLetter)) {
        updateDisplayWord(guessedLetter);
        score += 10;
    } else {
        lives--;
        showMessage(`Huruf ${guessedLetter} tidak ada!`);
    }

    document.getElementById("lives").textContent = lives;
    document.getElementById("score").textContent = score;

    if (lives <= 0) {
        showMessage("Game Over! Anda kehabisan nyawa.");
        startCooldown();
        resetGame(false);
    } else if (!displayWord.includes("_")) {
        showMessage("Selamat! Anda menebak kata dengan benar.");
        score += 50;
        resetGame(true);
    }
});

// Update the word display
function updateDisplayWord(letter) {
    let newDisplay = "";
    for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === letter) {
            newDisplay += letter;
        } else {
            newDisplay += displayWord[i];
        }
    }
    displayWord = newDisplay;
    document.getElementById("word-display").textContent = displayWord;
    updateClue(); // Update clue every time a letter is guessed correctly
}

// Show message on the screen
function showMessage(message) {
    document.getElementById("message").textContent = message;
}

// Start cooldown when lives are exhausted
function startCooldown() {
    cooldown = true;
    let timer = cooldownTime;
    const cooldownDisplay = document.getElementById("cooldown");
    cooldownDisplay.textContent = `Cooldown: ${timer}s`;
    
    const interval = setInterval(() => {
        timer--;
        cooldownDisplay.textContent = `Cooldown: ${timer}s`;
        if (timer <= 0) {
            clearInterval(interval);
            cooldown = false;
            cooldownDisplay.textContent = "";
        }
    }, 1000);
}

// Reset game after a win or game over
function resetGame(win = false) {
    if (win) score += 100;
    chosenWord = words[Math.floor(Math.random() * words.length)];
    displayWord = "_".repeat(chosenWord.length);
    guessedLetters = [];
    lives = 5;
    document.getElementById("word-display").textContent = displayWord;
    document.getElementById("lives").textContent = lives;
    document.getElementById("score").textContent = score;
    document.getElementById("message").textContent = "";
    updateClue(); // Update clue for the new word
}
