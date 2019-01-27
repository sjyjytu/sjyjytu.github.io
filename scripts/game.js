var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//define a ball and draw
var x = canvas.width/2;
var y = canvas.height-30;
var ballRadius = 10;
var dx = 2;
var dy = -2;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//define a paddle and draw
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

function drawPaddle() {
    if (leftDown && paddleX > 0) {
        paddleX -= 7;
    }
    if (rightDown && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "gold";
    ctx.fill();
    ctx.closePath();
}

//listen to the key and move the paddle
var leftDown = false;
var rightDown = false;
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightDown = true;
    }
    else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftDown = true;
    }
}

function keyUpHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightDown = false;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftDown = false;
    }
}
//listen to the mouse
document.addEventListener('mousemove', mouseMoveHandler, false);
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}
//define bricks
var brickWidth = 70;
var brickHeight = 20;
var brickPadding = 10;
var brickOffTop = 30;
var brickOffLeft = 30;
var brickColumn = 5;
var brickRow = 3;
var bricks = [];
var brickAbleNum = brickColumn * brickRow;
for (i = 0; i < brickColumn; i++) {
    bricks[i] = [];
    for (j = 0; j < brickRow; j++) {
        bricks[i][j] = {x: 0, y: 0, able: true};
    }
}
//draw bricks
function drawBricks() {
    for (i = 0; i < brickColumn; i++) {
        for (j = 0; j < brickRow; j++) {
            bricks[i][j].x = i * (brickWidth + brickPadding) + brickOffLeft;
            bricks[i][j].y = j * (brickHeight + brickPadding) + brickOffTop;
            if (bricks[i][j].able) {
                ctx.beginPath();
                ctx.rect(bricks[i][j].x, bricks[i][j].y, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
//detect whether hit the bricks
function detectCollision() {
    for (i = 0; i < brickColumn; i++) {
        for (j = 0; j < brickRow; j++) {
            if (bricks[i][j].able) {
                var tmp = bricks[i][j];
                if (x > tmp.x && x < tmp.x + brickWidth && y > tmp.y && y < tmp.y + brickHeight) {
                    tmp.able = false;
                    brickAbleNum--;
                    dy *= -1;
                    score++;
                }
            }
        }
    }
}
//draw the score
var score = 0;
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score:" + score, 8, 20);
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
    //bounce when hit the three walls
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx *= -1;
    }
    if (y + dy < ballRadius) {
        dy *= -1;
    }
    //bounce when hit the paddle and game over when hit the ground
    else if (y + dy > canvas.height - ballRadius - paddleHeight) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy *= -1;
        } else {
            alert('Game Over!');
            document.location.reload();
            //clearInterval(interval);
        }
    }
    //detect whether hit the bricks
    detectCollision();
    x += dx;
    y += dy;

    //check if u win
    if (brickAbleNum === 0) {
        alert('Congradulation! You win!!!');
        document.location.reload();
        //clearInterval(interval);
    }
    requestAnimationFrame(draw);
}

//var interval = setInterval(draw, 10);
draw();