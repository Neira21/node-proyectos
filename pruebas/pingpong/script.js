const ball = document.getElementById('ball');
const leftPaddle = document.getElementById('leftPaddle');
const rightPaddle = document.getElementById('rightPaddle');
const gameArea = document.getElementById('gameArea');

let ballXSpeed = 5;
let ballYSpeed = 5;

let leftPaddleY = 160;
let rightPaddleY = 160;

let leftPaddleDirection = 0;
let rightPaddleDirection = 0;

function update() {
  // Move paddles
  leftPaddleY += leftPaddleDirection * 5;
  rightPaddleY += rightPaddleDirection * 5;

  // Update paddle position
  leftPaddle.style.top = leftPaddleY + 'px';
  rightPaddle.style.top = rightPaddleY + 'px';

  // Move ball
  const ballX = parseInt(ball.style.left) || 290;
  const ballY = parseInt(ball.style.top) || 190;
  ball.style.left = ballX + ballXSpeed + 'px';
  ball.style.top = ballY + ballYSpeed + 'px';

  // Ball collision with top and bottom walls
  if (ballY <= 0 || ballY >= 380) {
    ballYSpeed = -ballYSpeed;
  }

  // Ball collision with paddles
  if (
    (ballX <= 50 && ballX >= 40 && ballY + 20 >= leftPaddleY && ballY <= leftPaddleY + 100) ||
    (ballX >= 540 && ballX <= 550 && ballY + 20 >= rightPaddleY && ballY <= rightPaddleY + 100)
  ) {
    ballXSpeed = -ballXSpeed;
  }

  // Ball collision with left and right walls (scoring)
  if (ballX <= 0 || ballX >= 580) {
    ball.style.left = '290px';
    ball.style.top = '190px';
    ballXSpeed = 5;
    ballYSpeed = 5;
  }
}

setInterval(update, 1000 / 60);

document.addEventListener('keydown', function(event) {
  if (event.key === 'w') {
    leftPaddleDirection = -1;
  } else if (event.key === 's') {
    leftPaddleDirection = 1;
  } else if (event.key === 'ArrowUp') {
    rightPaddleDirection = -1;
  } else if (event.key === 'ArrowDown') {
    rightPaddleDirection = 1;
  }
});

document.addEventListener('keyup', function(event) {
  if (event.key === 'w' || event.key === 's') {
    leftPaddleDirection = 0;
  } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    rightPaddleDirection = 0;
  }
});
