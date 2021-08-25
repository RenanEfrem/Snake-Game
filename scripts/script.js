let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let scoreText = document.getElementById("score");
let box = 32;
let snake = [];
snake[0] = {
    x: 5 * box,
    y: 5 * box
}
let direction = "right";
let score = 0;

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, 
    y: Math.floor(Math.random() * 15 + 1) * box
}
//cria o background
function criarBG() {
    context.fillStyle = "#444941";
    context.fillRect(0, 0 , 16 * box, 16 * box);
}
//cria a cobra
function criarCobrinha() {
    for(i = 0; i < snake.length; i++) {
        context.fillStyle = "#93B5C6";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}
//desenha a comida na tela
function drawFood() {
    context.fillStyle = "#DF2E2E";
    context.fillRect(food.x, food.y, box, box);

}
//adiciona o evento do teclado
document.addEventListener('keydown', update);

//checa se o botao foi pressionado
function update(event) {
    if(event.keyCode == 37 && direction != "right")direction = "left";
    if(event.keyCode == 38 && direction != "down")direction = "up";
    if(event.keyCode == 39 && direction != "left")direction = "right";
    if(event.keyCode == 40 && direction != "up")direction = "down";
}

//inicia o jogo executado a cada 1 segundo
function iniciarJogo(){

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 * box && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 * box && direction == "up") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {  
            score = 0;
            scoreText.innerText = "Score: " + score;
            clearInterval();
            location.reload();
            
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //move a cobra para as direções
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    //checa se pegou a comida
    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    }else {
        //pegou a comida
        score++;
        scoreText.innerText = "Score: " + score;
        console.log(score);
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    
    //cria a cabeça da cobra
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);


}

let jogo = setInterval(iniciarJogo, 100); 



