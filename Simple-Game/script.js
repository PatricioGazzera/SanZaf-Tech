const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;


let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const changeFoodPosition = () => {
    // Randomize food position 
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    // reboot of timer and page reload after game over
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to play again");
    location.reload();
}

const changeDirection = (e) => {
    // Movement definition with arrow keys
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
    initGame();
}

const initGame = () => {
    if(gameOver) return handleGameOver(); // If the game is over return handleGameOver
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`; // Food Creation

    //Checking if the snake hits food
    if(snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]); //Pushing food to the snake body array
        score++; // Increment score

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY]; // Setting first element of the snake body to the snake position

    // Movement assignation to the snake head
    snakeX += velocityX;
    snakeY += velocityY;

    // Checks if the snake hits the wall
    if(snakeX  <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }
    
    for (let i = 0; i < snakeBody.length; i++) {
        // Adding a div for each body part
        htmlMarkup += `<div class="snakeHead" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`; // Snake Creation
        // If the snake head hit the snake body, return game over
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup; // div Food implementation
}
changeFoodPosition();
setIntervalId = setInterval(initGame, 125); // Adding auto-movement to the snake head (125ms is the speed)
document.addEventListener("keydown", changeDirection);