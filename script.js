document.addEventListener("DOMContentLoaded", () => {
    const playerDisplay = document.getElementById("player");
    const gridItems = document.querySelectorAll(".grid-item");
    const restartButton = document.getElementById("restart");
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkWin() {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                return true;
            }
        }
        return false;
    }

    function checkDraw() {
        return gameState.every(cell => cell);
    }

    function handleClick(event) {
        const index = Array.from(gridItems).indexOf(event.target);
        if (gameState[index] || checkWin()) {
            return;
        }

        gameState[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWin()) {
            playerDisplay.textContent = `${currentPlayer} wins!`;
            restartButton.classList.remove("hidden");
        } else if (checkDraw()) {
            playerDisplay.textContent = "Draw!";
            restartButton.classList.remove("hidden");
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            playerDisplay.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function restartGame() {
        gameState = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gridItems.forEach(item => item.textContent = "");
        playerDisplay.textContent = `Player ${currentPlayer}'s turn`;
        restartButton.classList.add("hidden");
    }

    gridItems.forEach(item => item.addEventListener("click", handleClick));
    restartButton.addEventListener("click", restartGame);
    playerDisplay.textContent = `Player ${currentPlayer}'s turn`;
});