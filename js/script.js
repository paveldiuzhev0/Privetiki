const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

let box = 32; //размер клеточки

let score = 0; //общий щет в игре

let food = { // создам параметр фоод которая будет морковку размещать в рандомном порядке
	x: Math.floor((Math.random() * 17 + 1)) * box, // диапазон от 1 до 17 
	y: Math.floor((Math.random() * 15 + 3)) * box, 
};

let snake = []; // создаем масив змейки
snake[0] = { // делаем так что бы змека в начале игры была по середине 
	x: 9 * box,
	y: 10 * box
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) { // создаем ивент который срабатывает при нажатии на кнопку на клавиатуре 
	// у каждой кнопке на клавиатуре есть ее код их можно посмотреть в интернете так вот нам нужны такие значеня как 37 это стрелка в лево 38 в вверх 39 в право 49 в низ
	if(event.keyCode == 37 && dir != "right") // в конце проверяем если змеяя двигается в лево то она не может пойти на право
		dir = "left";
	else if(event.keyCode == 38 && dir != "down")
		dir = "up";
	else if(event.keyCode == 39 && dir != "left")
		dir = "right";
	else if(event.keyCode == 40 && dir != "up")
		dir = "down";
}

function eatTail(head, arr) { // сдесь мы делаем так что бы если змея косается своего хвоста то игра заканчивается
	for(let i = 0; i < arr.length; i++) {
		if(head.x == arr[i].x && head.y == arr[i].y)
			clearInterval(game);
	}
}

function drawGame() { // эта функция рисует нам поле и морковку 
	ctx.drawImage(ground, 0, 0);

	ctx.drawImage(foodImg, food.x, food.y); // делаем рандом спавна для морковки

	for(let i = 0; i < snake.length; i++) { // при съедании морковки наша змея увеличуться
		ctx.fillStyle = i == 0 ? "green" : "red"; // голова зеленая тело красное 
		ctx.fillRect(snake[i].x, snake[i].y, box, box); // создае голову змеи 
	}

	ctx.fillStyle = "white"; // создам текст белого цвета
	ctx.font = "50px Arial"; // тут размер и шрифт
	ctx.fillText(score, box * 2.5, box * 1.7); // сдесь его значение скор и координаты его местоположения

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if(snakeX == food.x && snakeY == food.y) { // если голова змеи находится на координатах еды то еда пропадает а змейка становится больше
		score++;
		food = {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 15 + 3)) * box,
		};
	} else
		snake.pop(); // удаляет последние значение в масиве 

	if(snakeX < box || snakeX > box * 17 // делаем остановку игры после выхода змеи за границы кода
		|| snakeY < 3 * box || snakeY > box * 17) // тут прописываем границы 
		clearInterval(game); // тут останавливаем игру
// делаем так что бы змейка могла ползать 
	if(dir == "left") snakeX -= box; // если дир равен стрелка в лево то змея перемещается на лево 
	if(dir == "right") snakeX += box;
	if(dir == "up") snakeY -= box;
	if(dir == "down") snakeY += box;

	let newHead = {
		x: snakeX,
		y: snakeY
	};

	eatTail(newHead, snake);

	snake.unshift(newHead); //Метод unshift() добавляет один или более элементов в начало массива и возвращает новую длину массива
}

let game = setInterval(drawGame, 100); // обновляет картинку каждие 100 милесекунд