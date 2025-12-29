// Game State Variables
let playerScore = 0;
let botScore = 0;
let round = 1;
const maxRounds = 3; // Best of 3 format (First to 2 wins)

let isRolling = false; // Flag to prevent multiple clicks during animation

// DOM Elements
const playerDiceEl = document.getElementById('player-dice');
const botDiceEl = document.getElementById('bot-dice');
const playerScoreEl = document.getElementById('player-score');
const botScoreEl = document.getElementById('bot-score');
const rollBtn = document.getElementById('roll-btn');
const resetBtn = document.getElementById('reset-btn');
const statusEl = document.getElementById('status');

// Helper function: Generate a random number between 1 and 6
function getRandomDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// Helper function: Update the visual representation of the dice (CSS classes)
function updateDiceVisual(diceElement, number) {
    // Remove existing face classes
    for (let i = 1; i <= 6; i++) {
        diceElement.classList.remove(`show-${i}`);
    }
    // Add the class for the new number
    diceElement.classList.add(`show-${number}`);
}

// Main function: Handle the dice roll event
function handleRoll() {
    if (isRolling) return;
    isRolling = true;
    rollBtn.disabled = true;
    statusEl.textContent = "Rolling...";

    // Add shaking animation class
    playerDiceEl.classList.add('shaking');
    botDiceEl.classList.add('shaking');

    // Simulate rolling delay (1 second)
    setTimeout(() => {
        // Remove animation
        playerDiceEl.classList.remove('shaking');
        botDiceEl.classList.remove('shaking');

        // Generate results
        const playerRoll = getRandomDice();
        const botRoll = getRandomDice();

        // Update UI
        updateDiceVisual(playerDiceEl, playerRoll);
        updateDiceVisual(botDiceEl, botRoll);

        // Determine winner
        determineRoundWinner(playerRoll, botRoll);
        
        isRolling = false;
        
        // Re-enable button only if the game hasn't ended
        if (!checkGameOver()) {
            rollBtn.disabled = false;
        }
    }, 1000);
}

// Function: Compare rolls and update scores
function determineRoundWinner(pRoll, bRoll) {
    if (pRoll > bRoll) {
        playerScore++;
        statusEl.textContent = `You win this round! (${pRoll} vs ${bRoll})`;
        statusEl.style.color = "#a6e3a1"; // Green (Catppuccin Green)
    } else if (bRoll > pRoll) {
        botScore++;
        statusEl.textContent = `Bot wins this round! (${pRoll} vs ${bRoll})`;
        statusEl.style.color = "#f38ba8"; // Red (Catppuccin Red)
    } else {
        statusEl.textContent = `It's a draw! (${pRoll} vs ${bRoll}) - Roll again!`;
        statusEl.style.color = "#f9e2af"; // Yellow (Catppuccin Yellow)
        // In case of a draw, scores do not change and the round repeats (First to 2 wins)
        return; 
    }
    
    // Update Score Board Display
    playerScoreEl.textContent = playerScore;
    botScoreEl.textContent = botScore;
}

// Function: Check if a win condition is met (Best of 3)
function checkGameOver() {
    if (playerScore >= 2) {
        endGame("Congratulations! You won the match!");
        return true;
    } else if (botScore >= 2) {
        endGame("Bot won the match! Better luck next time.");
        return true;
    }
    
    return false;
}

// Function: Handle game over state
function endGame(message) {
    statusEl.textContent = message;
    statusEl.style.color = "#cdd6f4"; // Default Text Color
    rollBtn.style.display = 'none';
    resetBtn.style.display = 'inline-block';
}

// Function: Reset the game to initial state
function resetGame() {
    playerScore = 0;
    botScore = 0;
    round = 1;
    playerScoreEl.textContent = '0';
    botScoreEl.textContent = '0';
    statusEl.textContent = 'Round 1';
    statusEl.style.color = '#cdd6f4'; // Default Text Color
    
    // Toggle buttons
    rollBtn.style.display = 'inline-block';
    resetBtn.style.display = 'none';
    rollBtn.disabled = false;
    
    // Reset dice visuals to 1
    updateDiceVisual(playerDiceEl, 1);
    updateDiceVisual(botDiceEl, 1);
}

// Event Listeners
rollBtn.addEventListener('click', handleRoll);
resetBtn.addEventListener('click', resetGame);
