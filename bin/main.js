var ctx;
var block = new Array();
var airBlock = new Array();
var circle = new Array();
var player;
var windowX = 640, windowY = 480;
var stageX, stageY;
var start = false;
var stage = 0;
var pressKey = new Array(2);
var mode = 0;
pressKey[0] = false;
pressKey[1] = false;
var pressKeyLock = new Array(2);
pressKeyLock[0] = false;
pressKeyLock[1] = false;
var jumpLock = false;

window.onload = function () {
	screenCanvas = document.getElementById('disp');
	screenCanvas.width = 640;
	screenCanvas.height = 480;
	ctx = screenCanvas.getContext('2d');

	screenCanvas.addEventListener('mousedown', mouseDown, true);
	screenCanvas.addEventListener('mouseup', mouseUp, true);
   
	select();
	
};

var main = function () {
	ctx.clearRect(0, 0, 640, 480);
	if(mode == 0) {
		if(left()) {
			mode = 1;
			select();
		}
	} else if(mode == 1) {
		if (typeof (this.t) == "undefined") {
			this.t = 0;
		}
		player.update();
		for (var i = 0; i < block.length; i++) {
			block[i].update();
		}
		for(var i = 0; i < circle.length; i++) {
			circle[i].update();
		}
		for (var i = 0; i < block.length; i++) {
			block[i].draw();
		}
		for (var i = 0; i < airBlock.length; i++) {
			airBlock[i].draw();
		}
		for(var i = 0; i < circle.length; i++) {
			circle[i].draw();
		}
		player.draw();
		for (var i = 0; i < 5; i++) {
			if (player.getX() > 700 + i * 140 && player.getX() < 700 + (i + 1) * 140 && player.getY() > windowY && start)
				reset(i);
		}
		if (player.getDeathCnt() < -100)
			select();
		if (!start && player.getY() > windowY + 100)
			select();
		if (!start && player.getDotY() < -100 && player.getClearCnt() > 50) {
			stage++;
			select();
		}
		this.t++;
	}
	return;
};
setInterval(main, 1000/60);

function reset(s) {
	start = false;
	cameraX = 0;
	cameraY = 0;
	player = new Player();
	block = new Array();
	circle = new Array();
	airBlock = new Array();
	switch (s)
	{
	case 0:
		stageX = 640;
		for (var i = 0; i < 2; i++)
			block.push(new Block(stageX - 100, windowY - 300 + i * 100, 100, 100, false));
		for (var i = 0; i < 7; i++)
			block.push(new Block(i * 100, windowY - 100, 100, 101, false));
		circle.push(new Circle(stageX - 80, windowY - 380));
		break;
	case 1:
		stageX = 1000;
		for (var i = 0; i < 3; i++)
			block.push(new Block(i * 100, windowY - 100, 100, 101, false));
		for (var i = 0; i < 4; i++)
			block.push(new Block(600 + i * 100, windowY - 100, 100, 101, false));
		for (var i = 0; i < 3; i++)
			airBlock.push(new AirBlock(300 + i * 100, windowY - 100, 100, 101, false));
		circle.push(new Circle(stageX - 80, windowY - 180));
		break;
	case 2:
		stageX = 1040;
		for (var i = 0; i < 3; i++)
			block.push(new Block(i * 80, windowY - 80, 80, 81, false));
		block.push(new Block(160, windowY - 160, 80, 80, false));
		for (var i = 0; i < 6; i++)
			block.push(new Block(stageX - 80 - i * 80, windowY - 80, 80, 81, false));
		circle.push(new Circle(stageX - 80, windowY - 380));
		break;
	case 3:
		stageX = 640;
		for (var i = 0; i < 4; i++)
			block.push(new Block(i * 80, windowY - 80, 80, 81, false));
		for (var i = 0; i < 4; i++)
			airBlock.push(new AirBlock(i * 80 + 320, windowY - 80, 80, 81, false));
		circle.push(new Circle(20, 20));
		break;
	case 4:
		stageX = 640;
		for (var i = 0; i < 9; i++)
			block.push(new Block(i * 40, windowY - 40, 40, 41, false));
		for (var i = 0; i < 3; i++)
			block.push(new Block(i * 60 + 230, 0, 60, 60, false));
		for (var i = 0; i < 2; i++)
			block.push(new Block(i * 120 + 230, 60, 60, 60, false));
		circle.push(new Circle(290, 60));
		break;
	default:
		break;
	}

}
	
function select() {
	start = true;
	cameraX = 0;
	cameraY = 0;
	stageX = 2000 - 640;
	player = new Player();
	block = new Array();
	airBlock = new Array();
	circle = new Array();
	var logo = [
		[],
		[0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
		[]
	];
	var cha = [
		[],
		[0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 1, 2, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 1, 2, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
		[0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
		[0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
		[0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,0 ],
		[],
		[0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 1, 0, 2, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
		[0, 1, 0, 2, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0],
		[0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0],
		[0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
		[0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0],
		[]
	];
	var num = [
		[
			[],
			[ 0, 1, 0 ],
			[ 1, 1, 0 ],
			[ 0, 1, 0 ],
			[ 0, 1, 0 ],
			[ 1, 1, 1 ],
			[]
		],
		[
			[],
			[ 1, 1, 0 ],
			[ 0, 0, 1 ],
			[ 0, 1, 0 ],
			[ 1, 0, 0 ],
			[ 1, 1, 1 ],
			[]
		],
		[
			[],
			[ 1, 1, 0 ],
			[ 0, 0, 1 ],
			[ 0, 1, 0 ],
			[ 0, 0, 1 ],
			[ 1, 1, 0 ],
			[]
		],
		[
			[],
			[ 0, 0, 1 ],
			[ 0, 1, 1 ],
			[ 1, 0, 1 ],
			[ 1, 1, 1 ],
			[ 0, 0, 1 ],
			[]
		],
		[
			[],
			[ 1, 1, 1 ],
			[ 1, 0, 0 ],
			[ 1, 1, 0 ],
			[ 0, 0, 1 ],
			[ 1, 1, 0 ],
			[]
		]	
	];
	for (var i = 0; i < 16; i++) {
		for (var j = 0; j < 30; j++) {
			if(logo[i][j] == 1)
				block.push(new Block(20 + j*20, i*20, 20, 20, true));
		}
	}
	/*
	for (var i = 0; i < 16; i++) {
		for (var j = 0; j < 26; j++) {
			if (cha[i][j] == 1){
				airBlock.push(new AirBlock(680 + j * 20, i * 20 + 40, 20, 20, true));
			}
			else if(cha[i][j] == 2)
				block.push(new Block(680 + j * 20, i * 20 + 40, 20, 20, true));
		}
	}
	*/
	for (var i = 0; i < 5; i++) {
		for (var j = 0; j < 7; j++) {
			for (var k = 0; k < 3; k++) {
				if (num[i][j][k] == 1) {
					if(stage <= i)
						block.push(new Block(1360 + i * 140 + k * 20 - 640, 200 + j * 20, 20, 20, true));
					else
						airBlock.push(new AirBlock(1360 + i * 140 + k * 20 - 640, 200 + j * 20, 20, 20, true));
				}
			}
		}
	}

	for (var i = 0; i < 32; i++)
		block.push(new Block(i*20, windowY - 20, 20, 20, true));
	for (var i = 0; i < 640 / 20; i++)
		block.push(new Block(i * 20, windowY - 40, 20, 20, true));
	for (var i = 0; i < 2; i++)
		for (var j = 33; j < 35; j++)
			for (var k = 0; k < 5; k++)
				block.push(new Block(j * 20 + k*140, windowY - 40 + i * 20, 20, 20, true));
	for (var i = 0; i < 5; i++)
		for (var j = 0; j < 5; j++)
			if (stage <= i)
				airBlock.push(new AirBlock(j * 20 + i * 140 + 1340 - 640, windowY - 40, 20, 20, true));
			else
				block.push(new Block(j * 20 + i * 140 + 1340 - 640, windowY - 40, 20, 20, true));
}

function touch() {
	if(window.TouchEvent){
		if(window.addEventListener){
			function TouchEventFunc(e){
				console.log("タッチスクリーン入力された");
			}

			var element = document.getElementById("aaa");

			element.addEventListener("touchstart",TouchEventFunc);

			element.addEventListener("touchend",TouchEventFunc);
		}
	}
}

function mouseDown(event) {
	var ck = event.button;
	if (ck == 0) {
		pressKey[0] = true;
	} else if (ck == 2) {
		pressKey[1] = true;
	}
}

function mouseUp(event) {
	var ck = event.button;
	if (ck == 0) {
		pressKey[0] = false;
        pressKeyLock[0] = false;
		jumpLock = false;
	} else if (ck == 2) {
		pressKey[1] = false;
        pressKeyLock[1] = false;
		jumpLock = false;
	}
}

function right() {
    if(pressKey[1] && !pressKeyLock[1]) {
        pressKeyLock[1] = true;
        return true;
    }
    else {
        return false;
    }
}

function jump() {
    if(pressKey[0] && !jumpLock) {
		jumpLock = true;
        return true;
    }
    else {
        return false;
    }
}

function left() {
    if(pressKey[0] && !pressKeyLock[0]) {
        pressKeyLock[0] = true;
        return true;
    }
    else {
        return false;
    }
}

var cameraX = 0;
var cameraY = 0;

var inherits = function(childCtor, parentCtor) {
    Object.setPrototypeOf(childCtor.prototype, parentCtor.prototype);
};

function drawRect(x, y, width, height, color) {
    ctx.beginPath();
	ctx.lineWidth = 1;
    ctx.fillStyle = color;
	ctx.strokeStyle = color;
    ctx.rect(x, y, width, height);
    ctx.fill();
}

function drawStrokeRect(x, y, width, height, color) {
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.strokeRect(x, y, width, height);
}

function drawLine(x1, y1, x2, y2, color) {
    ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawTriangle(x1, y1, x2, y2, x3, y3, color) {
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.lineTo(x3, y3);
	ctx.fill();
}

function drawPoint(x, y, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
	ctx.strokeStyle = color;
    ctx.arc(x, y, 1, 0, Math.PI*2, false);
    ctx.fill();
}

function drawCircle(x, y, r, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
	ctx.strokeStyle = color;
    ctx.arc(x, y, r, 0, Math.PI*2, false);
    ctx.stroke();
}

var Block = function(x, y, width, height, isRight) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isRight = isRight;
    this.t = 0;
    this.trans = 0;
    this.fillSpeed = 20;
    this.color = "#";
    for (var i = 0; i < 3; i++) {
        var temp = 100 + Math.floor(Math.random()*100);
        this.color += temp.toString(16);
    }
};

Block.prototype.getIsRight = function() {
    return this.isRight;
};

Block.prototype.getFillSpeed = function() {
    return this.fillSpeed;
};

Block.prototype.getX = function() {
    return this.x;
};

Block.prototype.getY = function() {
    return this.y;
};

Block.prototype.getWidth = function() {
    return this.width;
};

Block.prototype.getHeight = function() {
    return this.height;
};

Block.prototype.getColor = function() {
    return this.color;
};

Block.prototype.getT = function() {
	return this.t;
};

Block.prototype.line = function() {
    if(this.isRight){
        if(this.t*2 < this.fillSpeed) {
            var delta = (1.0 - Math.cos(Math.PI * this.t / this.fillSpeed));
            drawLine(this.x - cameraX, this.y - cameraY, this.x + Math.floor(delta*this.width) - cameraX, this.y - cameraY, this.color);
            drawLine(this.x - cameraX, this.y - cameraY, this.x - cameraX, this.y + Math.floor(delta*this.height) - cameraY, this.color);
        } else {
            drawLine(this.x - cameraX, this.y - cameraY, this.x + this.width - cameraX, this.y - cameraY, this.color);
			drawLine(this.x - cameraX, this.y - cameraY, this.x - cameraX, this.y + this.height - cameraY, this.color);
			var delta = (Math.cos(Math.PI * (this.fillSpeed - this.t) / this.fillSpeed));
			drawLine(this.x + this.width - cameraX, this.y - cameraY, this.x + this.width - cameraX, this.y + Math.floor(delta * this.height) - cameraY, this.color);
			drawLine(this.x - cameraX, this.y + this.height - cameraY, this.x + Math.floor(delta * this.width) - cameraX, this.y + this.height - cameraY, this.color);
        }
    } else {
		if (this.t*2 < this.fillSpeed) {
			var delta = (1.0 - Math.cos(Math.PI * this.t / this.fillSpeed));
			drawLine(this.x + this.width - cameraX, this.y - cameraY, this.x + this.width - Math.floor(delta * this.width) - cameraX, this.y - cameraY, this.color);
			drawLine(this.x + this.width - cameraX, this.y - cameraY, this.x + this.width - cameraX, this.y + Math.floor(delta * this.height) - cameraY, this.color);
		}
		else {
			drawLine(this.x + this.width - cameraX, this.y - cameraY, this.x - cameraX, this.y - cameraY, this.color);
			drawLine(this.x + this.width - cameraX, this.y - cameraY, this.x + this.width - cameraX, this.y + this.height - cameraY, this.color);
			var delta = (Math.cos(Math.PI * (this.fillSpeed - this.t) / this.fillSpeed));
			drawLine(this.x - cameraX, this.y - cameraY, this.x - cameraX, this.y + Math.floor(delta * this.height) - cameraY, this.color);
			drawLine(this.x + this.width - cameraX, this.y + this.height - cameraY, this.x + this.width - Math.floor(delta * this.width) - cameraX, this.y + this.height - cameraY, this.color);
		}
	}
};

Block.prototype.fill = function() {
	drawLine(this.x - cameraX, this.y - cameraY, this.x + this.width - cameraX, this.y - cameraY, this.color);
	drawLine(this.x - cameraX, this.y - cameraY, this.x - cameraX, this.y + this.height - cameraY, this.color);
	drawLine(this.x + this.width - cameraX, this.y - cameraY, this.x + this.width - cameraX, this.y + this.height - cameraY, this.color);
	drawLine(this.x - cameraX, this.y + this.height - cameraY, this.x + this.width - cameraX, this.y + this.height - cameraY, this.color);
	if (this.isRight) {
		var delta = (1.0 - Math.cos(Math.PI * this.t / this.fillSpeed / 2));
		drawTriangle(this.x + this.width - cameraX, this.y - cameraY, this.x + this.width - Math.floor(delta * this.width) - cameraX, this.y - cameraY, this.x + this.width - cameraX, this.y + Math.floor(delta * this.height) - cameraY, this.color);
		drawTriangle(this.x - cameraX, this.y + this.height - cameraY, this.x + Math.floor(delta * this.width) - cameraX, this.y + this.height - cameraY, this.x - cameraX, this.y + this.height - Math.floor(delta * this.height) - cameraY, this.color);
	}
	else {
		var delta = (1.0 - Math.cos(Math.PI * this.t / this.fillSpeed / 2));
		drawTriangle(this.x - cameraX, this.y - cameraY, this.x + Math.floor(delta* this.width) - cameraX, this.y - cameraY, this.x - cameraX, this.y + Math.floor(delta*this.height) - cameraY, this.color);
		drawTriangle(this.x + this.width - cameraX, this.y + this.height - cameraY, this.x + this.width - Math.floor(delta * this.width) - cameraX, this.y + this.height - cameraY, this.x + this.width - cameraX, this.y + this.height - Math.floor(delta * this.height) - cameraY, this.color);
	}
};

Block.prototype.stable = function() {
	drawRect(this.x - cameraX, this.y - cameraY, this.width, this.height, this.color);
};

Block.prototype.update = function() {
	this.t++;
	if (this.t > this.fillSpeed && this.trans == 0) {
		this.trans++;
		this.t = 0;
	}
	if (this.t > this.fillSpeed && this.trans == 1) {
		this.trans++;
		this.t = 0;
	}
}	

Block.prototype.draw = function() {
	if(this.trans == 0) {
		this.line();
	} else if(this.trans == 1) {
		this.fill();
	} else {
		this.stable();
	}
}

var AirBlock = function(x, y, width, height, isRight) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isRight = isRight;
    this.t = 0;
    this.trans = 0;
    this.fillSpeed = 20;
    this.color = "#";
    for (var i = 0; i < 3; i++) {
        var temp = 100 + Math.floor(Math.random()*100);
        this.color += temp.toString(16);
    }
};

AirBlock.prototype.getX = function() {
	return this.x;
}

AirBlock.prototype.getY = function() {
	return this.y;
}

AirBlock.prototype.getWidth = function() {
	return this.width;
}

AirBlock.prototype.getHeight = function() {
	return this.height;
}

AirBlock.prototype.draw = function() {
	drawStrokeRect(this.x - cameraX, this.y - cameraY, this.width, this.height, this.color);
};

var Circle = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.color = "#";
    for (var i = 0; i < 3; i++) {
        var temp = 100 + Math.floor(Math.random()*100);
        this.color += temp.toString(16);
    }
    this.r = this.height/2;
    this.t = 0;
    this.T = 50;
};

Circle.prototype.update = function() {
    this.t++;
};

Circle.prototype.draw = function() {
    drawCircle(this.x + this.r - cameraX, this.y + this.r - cameraY, this.r, this.color);
    var x1 = this.x + this.width / 2 + this.r * Math.cos(this.t*Math.PI / this.T) - cameraX, y1 = this.y + this.height / 2 + this.r * Math.sin(this.t*Math.PI / this.T) - cameraY;
    var x2 = Math.floor(this.x + this.width / 2 + this.r * Math.cos((this.t + this.T*2/3)*Math.PI / this.T)) - cameraX, y2 = Math.floor(this.y + this.height / 2 + this.r * Math.sin((this.t + this.T*2/3)*Math.PI / this.T)) - cameraY;
    var x3 = Math.floor(this.x + this.width / 2 + this.r * Math.cos((this.t + this.T*4/3)*Math.PI / this.T)) - cameraX, y3 = Math.floor(this.y + this.height / 2 + this.r * Math.sin((this.t + this.T*4/3)*Math.PI / this.T)) - cameraY;
    drawTriangle(x1, y1, x2, y2, x3, y3, this.color);
	console.log("" + this.x + this.width / 2 + " " + this.r + " " + Math.cos(this.t*Math.PI / this.T) + " " + cameraX + " " + x3 + " " + y3);
    x1 = Math.floor(this.x + this.width / 2 + this.r * Math.cos((this.t + this.T/3)*Math.PI / this.T)) - cameraX;
    y1 = Math.floor(this.y + this.height / 2 + this.r * Math.sin((this.t + this.T/3)*Math.PI / this.T)) - cameraY;
    x2 = Math.floor(this.x + this.width / 2 + this.r * Math.cos((this.t + this.T)*Math.PI / this.T)) - cameraX;
    y2 = Math.floor(this.y + this.height / 2 + this.r * Math.sin((this.t + this.T)*Math.PI / this.T)) - cameraY;
    x3 = Math.floor(this.x + this.width / 2 + this.r * Math.cos((this.t + this.T*5 / 3)*Math.PI / this.T)) - cameraX;
    y3 = Math.floor(this.y + this.height / 2 + this.r * Math.sin((this.t + this.T*5 / 3)*Math.PI / this.T)) - cameraY;
    drawTriangle(x1, y1, x2, y2, x3, y3, this.color);
};

Circle.prototype.getX = function() {
	return this.x;
};

Circle.prototype.getY = function() {
	return this.y;
};
Circle.prototype.getWidth = function() {
	return this.width;
};
Circle.prototype.getHeight = function() {
	return this.height;
};


var Player = function() {
	this.x = 0;
	this.y = 240;
    this.game = false;
	this.width = 50;
	this.height = 50;
	this.deathCnt = 0;
	this.velocityX = 3;
	this.velocityY = 0;
	this.clearCnt = 0;
    this.deathCnt = 0;
	this.color = "#FF6464";
    this.isGround = false;
    this.dotX = new Array(50);
    this.dotY = new Array(50);
    this.dotVX = new Array(50);
    this.dotVY = new Array(50);
    this.accelerationY = 1;
    for(var i = 0; i < 50; i++) {
        this.dotX[i] = new Array(50);
        this.dotY[i] = new Array(50);
        this.dotVX[i] = new Array(50);
        this.dotVY[i] = new Array(50);
    }
};

Player.prototype.draw = function() {
    if (this.clearCnt > 50) {
        for (var i = 0; i < 50; i++) {
            for (var j = 0; j < 50; j++) {
                drawPoint(Math.floor(this.dotX[j][i]) - cameraX, Math.floor(this.dotY[j][i]) - cameraY, this.color);
            }
        }
        return;
    }
    var randX = 0, randY = 0;
    if (this.deathCnt > 100) {
        randX = Math.floor(Math.random()*(this.deathCnt - 100)) - (this.deathCnt - 100) / 2;
        randY = Math.floor(Math.random()*(this.deathCnt - 100)) - (this.deathCnt - 100) / 2;
    }
    if (this.deathCnt >= 0) {
        drawRect(this.x - cameraX + randX, this.y + randY, this.width, this.height, this.color);
    }
    else {
        for (var i = 0; i < 50; i++) {
            for (var j = 0; j < 50; j++) {
                drawPoint(Math.floor(this.dotX[j][i]) - cameraX, Math.floor(this.dotY[j][i]) - cameraY, this.color);
            }
        }
    }
};

Player.prototype.update = function() {
    if (this.clearCnt > 50) {
        for (var i = 0; i < 50; i++) {
            for (var j = 0; j < 50; j++) {
                this.dotX[j][i] += this.dotVX[j][i];
                this.dotY[j][i] += this.dotVY[j][i];
                this.dotVY[j][i] += -1;
            }
        }
        return;
    }
    if (!this.game) {
        if (left())
            this.game = true;
        return;
    }
    if (this.deathCnt < 0) {
        for (var i = 0; i < 50; i++) {
            for (var j = 0; j < 50; j++) {
                this.dotX[j][i] += this.dotVX[j][i];
                this.dotY[j][i] += this.dotVY[j][i];
                this.dotVY[j][i] += this.accelerationY;
            }
        }
        this.deathCnt--;
    }
    else {
        var tempX = -1, tempY = -1;
        
        if (windowX + cameraX < stageX && this.x - cameraX > windowX * 2 / 3)
            cameraX = this.x - windowX * 2 / 3;
        if (cameraX > 0 && this.x - cameraX < windowX / 3)
            cameraX = this.x - windowX / 3;
        if (!this.game) {
            if (left())
                this.game = true;
            return;
        }
		for (var i = 0; i < circle.length; i++) {
			if (this.x + this.width > circle[i].getX() && this.x < circle[i].getX() + circle[i].getWidth() && this.y + this.height > circle[i].getY() && this.y < circle[i].getY() + circle[i].getHeight()) {
				this.clearCnt = 1;
			}
		}
		if (this.clearCnt > 0) {
			for (var i = 0; i < 50; i++) {
				for (var j = 0; j < 50; j++) {
					this.dotX[j][i] = this.x + j;
					this.dotY[j][i] = this.y + i;
					this.dotVX[j][i] = 0;
					this.dotVY[j][i] = 0;
				}
			}
		}
        if (this.clearCnt > 0) {
            this.clearCnt++;
            circle = new Array();
        }
        if (this.velocityX > 0) {
            if (this.x + this.velocityX + this.width > stageX) {
                tempX = stageX - Math.abs(this.x + this.velocityX - stageX);
            }
            for (var i = 0; i < block.length; i++) {
                if (this.x + this.width + this.velocityX > block[i].getX() && this.y < block[i].getY() + block[i].getHeight() && this.y + this.height > block[i].getY() && this.x + this.velocityX < block[i].getX() + block[i].getWidth()) {
                    tempX = this.x - Math.abs(this.x + this.width + this.velocityX - block[i].getX());
                }
            }
        }
        else {
            if (this.x + this.velocityX < 0) {
                tempX = this.x + Math.abs(this.x + this.velocityX - 0);
            }
            for (var i = 0; i < block.length; i++) {
                if (this.x + this.velocityX < block[i].getX() + block[i].getWidth() && this.y < block[i].getY() + block[i].getHeight() && this.y + this.height > block[i].getY() && this.x + this.width + this.velocityX > block[i].getX()) {
                    tempX = this.x + Math.abs(this.x + this.velocityX - block[i].getX() - block[i].getWidth());
                }
            }
        }
        if (tempX != -1) {
            this.x = tempX;
            this.velocityX = -this.velocityX;
        }
        else {
            this.x += this.velocityX;
        }
        if (!this.isGround) {
            if (this.velocityY > 0) {
                for (var i = 0; i < block.length; i++) {
                    if (this.y + this.height + this.velocityY > block[i].getY() && this.x < block[i].getX() + block[i].getWidth() && this.x + this.width > block[i].getX() && this.y < block[i].getY() + block[i].getHeight()) {
                        tempY = block[i].getY() - this.height;
                        this.velocityY = 0;
                        this.isGround = true;
                    }
				}
            }
            else {
                for (var i = 0; i < block.length; i++) {
                    if (this.y + this.velocityY < block[i].getY() + block[i].getHeight() && this.x < block[i].getX() + block[i].getWidth() && this.x + this.width > block[i].getX() && this.y + this.height > block[i].getY()) {
                        tempY = block[i].getY() + block[i].getHeight();
                        this.velocityY = -this.velocityY;
                        this.isGround = true;
                    }
                }
            }
            if (tempY != -1) {
                this.y = tempY;
            }
            else {
                this.y += this.velocityY;
            }
            if (this.velocityY < 30)
                this.velocityY += this.accelerationY;
        }
        else {
            var tempGround = true;
            for (var i = 0; i < block.length; i++) {
                if (this.y + this.height + 1 > block[i].getY() && (this.x > block[i].getX() + block[i].getWidth() || this.x + this.width < block[i].getX())) {
                    tempGround = false;
                }
            }
            this.isGround = tempGround;
        }

        if ((!this.isGround) && !start) {
			if(left()) {
            var minSide = 1000;
            for (var i = 0; i < airBlock.length; i++) {
                if (this.velocityX > 0) {
                    if (this.x < airBlock[i].getX() + airBlock[i].getWidth() && this.x > airBlock[i].getX() && this.y + this.height < airBlock[i].getY() && minSide > airBlock[i].getY() - this.y - this.height)
                        minSide = airBlock[i].getY() - this.y - this.height;
                }
                else
                {
                    if (this.x + this.width < airBlock[i].getX() + airBlock[i].getWidth() && this.x + this.width > airBlock[i].getX() && this.y + this.height < airBlock[i].getY() && minSide > airBlock[i].getY() - this.y - this.height)
                        minSide = airBlock[i].getY() - this.y - this.height;
                }
            }
            for (var i = 0; i < block.length; i++) {
                if (this.velocityX > 0) {
                    if (this.x < block[i].getX() + block[i].getWidth() && this.x > block[i].getX() && this.y + this.height < block[i].getY() && minSide > block[i].getY() - this.y - this.height)
                        minSide = block[i].getY() - this.y - this.height;
                }
                else
                {
                    if (this.x + this.width < block[i].getX() + block[i].getWidth() && this.x + this.width > block[i].getX() && this.y + this.height < block[i].getY() && minSide > block[i].getY() - this.y - this.height)
                        minSide = block[i].getY() - this.y - this.height;
                }
            }
            if (this.velocityX > 0) {
                var temp = true;
                for (var i = 0; i < block.length; i++) {
                    if (((this.x + minSide >= block[i].getX() && this.x + minSide <= block[i].getX() + block[i].getWidth()) || (this.x >= block[i].getX() && this.x <= block[i].getX() + block[i].getWidth())) && ((this.y + minSide + this.height > block[i].getY() && this.y + this.height + minSide < block[i].getY() + block[i].getHeight()) || (this.y + this.height <= block[i].getY() + block[i].getHeight() && this.y + this.height >= block[i].getY())))
                        temp = false;
                    if (this.y + this.height + minSide > block[i].getY() && this.x < block[i].getX() + block[i].getWidth() && this.x + minSide > block[i].getX() && this.y + this.height < block[i].getY() + block[i].getHeight())
                        temp = false;
                }

                if (this.x + minSide < stageX && temp && minSide > 30) {
                    block.push(new Block(this.x, this.y + this.height, minSide, minSide, true));
					jumpLock = true;
                }
            }
            else {
                var temp = true;
                for (var i = 0; i < block.length; i++) {
                    if ((this.x + this.width - minSide >= block[i].getX() && this.x + this.width - minSide <= block[i].getX() + block[i].getWidth() || this.x + this.width >= block[i].getX() && this.x + this.width <= block[i].getX() + block[i].getWidth()) && ((this.y + minSide + this.height > block[i].getY() && this.y + minSide + this.height < block[i].getY() + block[i].getHeight()) || (this.y + this.height <= block[i].getY() + block[i].getHeight() && this.y + this.height >= block[i].getY())))
                        temp = false;
                    if (this.y + this.height + minSide > block[i].getY() && this.x + this.width - minSide < block[i].getX() + block[i].getWidth() && this.x + this.width > block[i].getX() && this.y + this.height < block[i].getY() + block[i].getHeight())
                        temp = false;
                }

                if (this.x + this.width - minSide > 0 && temp && minSide > 30) {
                    block.push(new Block(this.x + this.width - minSide, this.y + this.height, minSide, minSide, false));
                }
            }
			}
        }

        if (this.isGround) {
			if(jump()) {
				this.velocityY = -15;
				this.isGround = false;
			}
        }

        if (this.deathCnt > 200) {

            this.deathCnt = -1;
            for (var i = 0; i < 50; i++) {
                for (var j = 0; j < 50; j++) {
                    this.dotX[j][i] = this.x + j;
                    this.dotY[j][i] = this.y + i;
                    this.dotVX[j][i] = Math.pow((Math.pow((i - 25), 2) + Math.pow((j - 25), 2)), 0.5) * Math.cos(Math.atan2(this.dotY[j][i] - this.y - this.height / 2, this.dotX[j][i] - this.x - this.width / 2)) / 5;
                    this.dotVY[j][i] = Math.pow((Math.pow((i - 25), 2) + Math.pow((j - 25), 2)), 0.5) * Math.sin(Math.atan2(this.dotY[j][i] - this.y - this.height / 2, this.dotX[j][i] - this.x - this.width / 2)) / 5 - 10;
                }
            }
        }

        if (pressKey[0] && this.deathCnt >= 0) {
            this.deathCnt++;
        }
        for (var i = 0; i < 10; i++)
            if (this.deathCnt > 0 && !pressKey[0])
                this.deathCnt--;
    }
};

Player.prototype.getDeathCnt = function() {
	return this.deathCnt;
};

Player.prototype.getClearCnt = function() {
	return this.clearCnt;
};

Player.prototype.getDotY = function() {
	return this.dotY[0][0];
};

Player.prototype.getX = function() {
	return this.x;
};

Player.prototype.getY = function() {
	return this.y;
};

