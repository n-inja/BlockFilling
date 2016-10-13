
const Game = function() {
    this.block = new Array();
    this.airBlock = new Array();
    this.circle = new Array();
    this.player;
    this.windowX = 640;
    this.windowY = 480;
    this.stageX;
    this.stageY;
    this.cameraX = 0;
    this.cameraY = 0;
    this.start = false;
    this.stage = 0;
    this.lock = true;
    this.isHub = true;
    this.nowStage = 0;
    this.t = 0;
};

Game.prototype.update = function() {
    if (this.lock) {
        if (left()) {
            this.lock = false;
            this.select();
        }
    } else {
        this.player.update(this.block, this.airBlock, this.circle, this.stageX, this.stageY, this.isHub);
        for (let i = 0; i < this.block.length; i++) {
            this.block[i].update();
        }
        for (let i = 0; i < this.circle.length; i++) {
            this.circle[i].update();
        }

        for (let i = 0; i < 5; i++) {
            if (this.player.getX() > 700 + i * 140 && this.player.getX() < 700 + (i + 1) * 140 && this.player.getY() > this.windowY && this.start)
                this.reset(i);
        }
        if (this.player.getClearCnt() > 0 && this.circle.length > 0)
            this.circle = new Array();
        if (this.player.getDeathCnt() < -100)
            this.reset(this.stage);
        if (!this.start && this.player.getY() > this.windowY + 100)
            this.reset(this.stage);
        if (!this.start && this.player.getDotY() < -100 && this.player.getClearCnt() > 50) {
            this.stage++;
            this.select();
        }
        if (this.windowX + this.cameraX < this.stageX && this.player.getX() - this.cameraX > this.windowX * 2 / 3)
            this.cameraX = this.player.getX() - this.windowX * 2 / 3;
        if (this.cameraX > 0 && this.player.getX() - this.cameraX < this.windowX / 3)
            this.cameraX = this.player.getX() - this.windowX / 3;
        if (!this.game) {
            if (left())
                this.game = true;
        }
        if (this.nowStage == 0)
            this.player.resetDeathCnt();
        this.t++;
    }
};

Game.prototype.draw = function() {
    ctx.clearRect(0, 0, 640, 480);
    drawRect(0, 0, 640, 480, "#F0F0F0");
    if (this.lock) {
        ctx.fillStyle = "#000000";
        ctx.fillText("Copyright (C) 2016 n-inja All Rights Reserved.", 440, 480);
    }
    for (let i = 0; i < this.block.length; i++) {
        this.block[i].draw(this.cameraX, this.cameraY);
    }
    for (let i = 0; i < this.airBlock.length; i++) {
        this.airBlock[i].draw(this.cameraX, this.cameraY);
    }
    for (let i = 0; i < this.circle.length; i++) {
        this.circle[i].draw(this.cameraX, this.cameraY);
    }
    this.player.draw(this.cameraX, this.cameraY);
}

Game.prototype.reset = function(s) {
    this.isHub = false;
    this.start = false;
    this.cameraX = 0;
    this.cameraY = 0;
    this.player = new Player();
    this.block = new Array();
    this.circle = new Array();
    this.airBlock = new Array();
    this.nowStage = s + 1;
    switch (s % 5) {
        case 0:
            this.stageX = 640;
            for (let i = 0; i < 2; i++)
                this.block.push(new Block(this.stageX - 100, this.windowY - 300 + i * 100, 100, 100, false));
            for (let i = 0; i < 7; i++)
                this.block.push(new Block(i * 100, this.windowY - 100, 100, 101, false));
            this.circle.push(new Circle(this.stageX - 80, this.windowY - 380));
            break;
        case 1:
            this.stageX = 1000;
            for (let i = 0; i < 3; i++)
                this.block.push(new Block(i * 100, this.windowY - 100, 100, 101, false));
            for (let i = 0; i < 4; i++)
                this.block.push(new Block(600 + i * 100, this.windowY - 100, 100, 101, false));
            for (let i = 0; i < 3; i++)
                this.airBlock.push(new AirBlock(300 + i * 100, this.windowY - 100, 100, 101, false));
            this.circle.push(new Circle(this.stageX - 80, this.windowY - 180));
            break;
        case 2:
            this.stageX = 1040;
            for (let i = 0; i < 3; i++)
                this.block.push(new Block(i * 80, this.windowY - 80, 80, 81, false));
            this.block.push(new Block(160, this.windowY - 160, 80, 80, false));
            for (let i = 0; i < 6; i++)
                this.block.push(new Block(this.stageX - 80 - i * 80, this.windowY - 80, 80, 81, false));
            this.circle.push(new Circle(this.stageX - 80, this.windowY - 380));
            break;
        case 3:
            this.stageX = 640;
            for (let i = 0; i < 4; i++)
                this.block.push(new Block(i * 80, this.windowY - 80, 80, 81, false));
            for (let i = 0; i < 4; i++)
                this.airBlock.push(new AirBlock(i * 80 + 320, this.windowY - 80, 80, 81, false));
            this.circle.push(new Circle(20, 20));
            break;
        case 4:
            this.stageX = 640;
            for (let i = 0; i < 9; i++)
                this.block.push(new Block(i * 40, this.windowY - 40, 40, 41, false));
            for (let i = 0; i < 3; i++)
                this.block.push(new Block(i * 60 + 230, 0, 60, 60, false));
            for (let i = 0; i < 2; i++)
                this.block.push(new Block(i * 120 + 230, 60, 60, 60, false));
            this.circle.push(new Circle(290, 60));
            break;
        default:
            break;
    }
};

Game.prototype.select = function() {
    this.start = true;
    this.isHub = true;
    this.cameraX = 0;
    this.cameraY = 0;
    this.stageX = 2000 - 640;
    this.player = new Player();
    this.block = new Array();
    this.airBlock = new Array();
    this.circle = new Array();
    this.nowStage = 0;
    let logo = [
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
    let cha = [
        [],
        [0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 2, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 2, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [],
        [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 2, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 1, 0, 2, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0],
        [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0],
        []
    ];
    let num = [
        [
            [],
            [0, 1, 0],
            [1, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 1],
            []
        ],
        [
            [],
            [1, 1, 0],
            [0, 0, 1],
            [0, 1, 0],
            [1, 0, 0],
            [1, 1, 1],
            []
        ],
        [
            [],
            [1, 1, 0],
            [0, 0, 1],
            [0, 1, 0],
            [0, 0, 1],
            [1, 1, 0],
            []
        ],
        [
            [],
            [0, 0, 1],
            [0, 1, 1],
            [1, 0, 1],
            [1, 1, 1],
            [0, 0, 1],
            []
        ],
        [
            [],
            [1, 1, 1],
            [1, 0, 0],
            [1, 1, 0],
            [0, 0, 1],
            [1, 1, 0],
            []
        ]
    ];
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 30; j++) {
            if (logo[i][j] == 1)
                this.block.push(new Block(20 + j * 20, i * 20, 20, 20, true));
        }
    }
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 7; j++) {
            for (let k = 0; k < 3; k++) {
                if (num[i][j][k] == 1) {
                    if (this.stage % 5 <= i)
                        this.block.push(new Block(1360 + i * 140 + k * 20 - 640, 200 + j * 20, 20, 20, true));
                    else
                        this.airBlock.push(new AirBlock(1360 + i * 140 + k * 20 - 640, 200 + j * 20, 20, 20, true));
                }
            }
        }
    }

    for (let i = 0; i < 32; i++)
        this.block.push(new Block(i * 20, this.windowY - 20, 20, 20, true));
    /*for (let i = 0; i < 640 / 20; i++)
    	this.block.push(new Block(i * 20, this.windowY - 40, 20, 20, true));*/
    for (let i = 0; i < 2; i++)
        for (let j = 33; j < 35; j++)
            for (let k = 0; k < 5; k++)
                this.block.push(new Block(j * 20 + k * 140, this.windowY - 40 + i * 20, 20, 20, true));
    for (let i = 0; i < 5; i++)
        for (let j = 0; j < 5; j++)
            if (this.stage % 5 <= i)
                this.airBlock.push(new AirBlock(j * 20 + i * 140 + 1340 - 640, this.windowY - 40, 20, 20, true));
            else
                this.block.push(new Block(j * 20 + i * 140 + 1340 - 640, this.windowY - 40, 20, 20, true));
};


const Block = function(x, y, width, height, isRight) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isRight = isRight;
    this.t = 0;
    this.trans = 0;
    this.fillSpeed = 20;
    this.color = "#";
    for (let i = 0; i < 3; i++) {
        let temp = 100 + Math.floor(Math.random() * 100);
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

Block.prototype.line = function(cameraX, cameraY) {
    if (this.isRight) {
        if (this.t * 2 < this.fillSpeed) {
            let delta = (1.0 - Math.cos(Math.PI * this.t / this.fillSpeed));
            drawLine(this.x - cameraX, this.y - cameraY, this.x + Math.floor(delta * this.width) - cameraX, this.y - cameraY, this.color);
            drawLine(this.x - cameraX, this.y - cameraY, this.x - cameraX, this.y + Math.floor(delta * this.height) - cameraY, this.color);
        } else {
            drawLine(this.x - cameraX, this.y - cameraY, this.x + this.width - cameraX, this.y - cameraY, this.color);
            drawLine(this.x - cameraX, this.y - cameraY, this.x - cameraX, this.y + this.height - cameraY, this.color);
            let delta = (Math.cos(Math.PI * (this.fillSpeed - this.t) / this.fillSpeed));
            drawLine(this.x + this.width - cameraX, this.y - cameraY, this.x + this.width - cameraX, this.y + Math.floor(delta * this.height) - cameraY, this.color);
            drawLine(this.x - cameraX, this.y + this.height - cameraY, this.x + Math.floor(delta * this.width) - cameraX, this.y + this.height - cameraY, this.color);
        }
    } else {
        if (this.t * 2 < this.fillSpeed) {
            let delta = (1.0 - Math.cos(Math.PI * this.t / this.fillSpeed));
            drawLine(this.x + this.width - cameraX, this.y - cameraY, this.x + this.width - Math.floor(delta * this.width) - cameraX, this.y - cameraY, this.color);
            drawLine(this.x + this.width - cameraX, this.y - cameraY, this.x + this.width - cameraX, this.y + Math.floor(delta * this.height) - cameraY, this.color);
        } else {
            drawLine(this.x + this.width - cameraX, this.y - cameraY, this.x - cameraX, this.y - cameraY, this.color);
            drawLine(this.x + this.width - cameraX, this.y - cameraY, this.x + this.width - cameraX, this.y + this.height - cameraY, this.color);
            let delta = (Math.cos(Math.PI * (this.fillSpeed - this.t) / this.fillSpeed));
            drawLine(this.x - cameraX, this.y - cameraY, this.x - cameraX, this.y + Math.floor(delta * this.height) - cameraY, this.color);
            drawLine(this.x + this.width - cameraX, this.y + this.height - cameraY, this.x + this.width - Math.floor(delta * this.width) - cameraX, this.y + this.height - cameraY, this.color);
        }
    }
};

Block.prototype.fill = function(cameraX, cameraY) {
    drawLine(this.x - cameraX, this.y - cameraY, this.x + this.width - cameraX, this.y - cameraY, this.color);
    drawLine(this.x - cameraX, this.y - cameraY, this.x - cameraX, this.y + this.height - cameraY, this.color);
    drawLine(this.x + this.width - cameraX, this.y - cameraY, this.x + this.width - cameraX, this.y + this.height - cameraY, this.color);
    drawLine(this.x - cameraX, this.y + this.height - cameraY, this.x + this.width - cameraX, this.y + this.height - cameraY, this.color);
    if (this.isRight) {
        let delta = (1.0 - Math.cos(Math.PI * this.t / this.fillSpeed / 2));
        drawTriangle(this.x + this.width - cameraX, this.y - cameraY, this.x + this.width - Math.floor(delta * this.width) - cameraX, this.y - cameraY, this.x + this.width - cameraX, this.y + Math.floor(delta * this.height) - cameraY, this.color);
        drawTriangle(this.x - cameraX, this.y + this.height - cameraY, this.x + Math.floor(delta * this.width) - cameraX, this.y + this.height - cameraY, this.x - cameraX, this.y + this.height - Math.floor(delta * this.height) - cameraY, this.color);
    } else {
        let delta = (1.0 - Math.cos(Math.PI * this.t / this.fillSpeed / 2));
        drawTriangle(this.x - cameraX, this.y - cameraY, this.x + Math.floor(delta * this.width) - cameraX, this.y - cameraY, this.x - cameraX, this.y + Math.floor(delta * this.height) - cameraY, this.color);
        drawTriangle(this.x + this.width - cameraX, this.y + this.height - cameraY, this.x + this.width - Math.floor(delta * this.width) - cameraX, this.y + this.height - cameraY, this.x + this.width - cameraX, this.y + this.height - Math.floor(delta * this.height) - cameraY, this.color);
    }
};

Block.prototype.stable = function(cameraX, cameraY) {
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

Block.prototype.draw = function(cameraX, cameraY) {
    if (this.trans == 0) {
        this.line(cameraX, cameraY);
    } else if (this.trans == 1) {
        this.fill(cameraX, cameraY);
    } else {
        this.stable(cameraX, cameraY);
    }
}

const AirBlock = function(x, y, width, height, isRight) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isRight = isRight;
    this.t = 0;
    this.trans = 0;
    this.fillSpeed = 20;
    this.color = "#";
    for (let i = 0; i < 3; i++) {
        let temp = 100 + Math.floor(Math.random() * 100);
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

AirBlock.prototype.draw = function(cameraX, cameraY) {
    drawStrokeRect(this.x - cameraX, this.y - cameraY, this.width, this.height, this.color);
};

const Circle = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 60;
    this.color = "#";
    for (let i = 0; i < 3; i++) {
        let temp = 100 + Math.floor(Math.random() * 100);
        this.color += temp.toString(16);
    }
    this.r = this.height / 2;
    this.t = 0;
    this.T = 50;
};

Circle.prototype.update = function() {
    this.t++;
};

Circle.prototype.draw = function(cameraX, cameraY) {
    drawCircle(this.x + this.r - cameraX, this.y + this.r - cameraY, this.r, this.color);
    let x1 = this.x + this.width / 2 + this.r * Math.cos(this.t * Math.PI / this.T) - cameraX,
        y1 = this.y + this.height / 2 + this.r * Math.sin(this.t * Math.PI / this.T) - cameraY;
    let x2 = Math.floor(this.x + this.width / 2 + this.r * Math.cos((this.t + this.T * 2 / 3) * Math.PI / this.T)) - cameraX,
        y2 = Math.floor(this.y + this.height / 2 + this.r * Math.sin((this.t + this.T * 2 / 3) * Math.PI / this.T)) - cameraY;
    let x3 = Math.floor(this.x + this.width / 2 + this.r * Math.cos((this.t + this.T * 4 / 3) * Math.PI / this.T)) - cameraX,
        y3 = Math.floor(this.y + this.height / 2 + this.r * Math.sin((this.t + this.T * 4 / 3) * Math.PI / this.T)) - cameraY;
    drawTriangle(x1, y1, x2, y2, x3, y3, this.color);
    x1 = Math.floor(this.x + this.width / 2 + this.r * Math.cos((this.t + this.T / 3) * Math.PI / this.T)) - cameraX;
    y1 = Math.floor(this.y + this.height / 2 + this.r * Math.sin((this.t + this.T / 3) * Math.PI / this.T)) - cameraY;
    x2 = Math.floor(this.x + this.width / 2 + this.r * Math.cos((this.t + this.T) * Math.PI / this.T)) - cameraX;
    y2 = Math.floor(this.y + this.height / 2 + this.r * Math.sin((this.t + this.T) * Math.PI / this.T)) - cameraY;
    x3 = Math.floor(this.x + this.width / 2 + this.r * Math.cos((this.t + this.T * 5 / 3) * Math.PI / this.T)) - cameraX;
    y3 = Math.floor(this.y + this.height / 2 + this.r * Math.sin((this.t + this.T * 5 / 3) * Math.PI / this.T)) - cameraY;
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


const Player = function() {
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
    for (let i = 0; i < 50; i++) {
        this.dotX[i] = new Array(50);
        this.dotY[i] = new Array(50);
        this.dotVX[i] = new Array(50);
        this.dotVY[i] = new Array(50);
    }
};

Player.prototype.jump = function() {
    if (left()) {
        return true;
    } else {
        return false;
    }
}

Player.prototype.draw = function(cameraX, cameraY) {
    if (this.clearCnt > 50) {
        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 50; j++) {
                drawPoint(Math.floor(this.dotX[j][i]) - cameraX, Math.floor(this.dotY[j][i]) - cameraY, this.color);
            }
        }
        return;
    }
    let randX = 0,
        randY = 0;
    if (this.deathCnt > 100) {
        randX = Math.floor(Math.random() * (this.deathCnt - 100)) - (this.deathCnt - 100) / 2;
        randY = Math.floor(Math.random() * (this.deathCnt - 100)) - (this.deathCnt - 100) / 2;
    }
    if (this.deathCnt >= 0) {
        drawRect(this.x - cameraX + randX, this.y + randY, this.width, this.height, this.color);
    } else {
        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 50; j++) {
                drawPoint(Math.floor(this.dotX[j][i]) - cameraX, Math.floor(this.dotY[j][i]) - cameraY, this.color);
            }
        }
    }
};

Player.prototype.update = function(block, airBlock, circle, stageX, stageY, isHub) {
    if (this.clearCnt > 50) {
        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 50; j++) {
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
        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 50; j++) {
                this.dotX[j][i] += this.dotVX[j][i];
                this.dotY[j][i] += this.dotVY[j][i];
                this.dotVY[j][i] += this.accelerationY;
            }
        }
        this.deathCnt--;
    } else {
        let tempX = -1,
            tempY = -1;

        for (let i = 0; i < circle.length; i++) {
            if (this.x + this.width > circle[i].getX() && this.x < circle[i].getX() + circle[i].getWidth() && this.y + this.height > circle[i].getY() && this.y < circle[i].getY() + circle[i].getHeight()) {
                this.clearCnt = 1;
            }
        }
        if (this.clearCnt > 0) {
            for (let i = 0; i < 50; i++) {
                for (let j = 0; j < 50; j++) {
                    this.dotX[j][i] = this.x + j;
                    this.dotY[j][i] = this.y + i;
                    this.dotVX[j][i] = 0;
                    this.dotVY[j][i] = 0;
                }
            }
        }
        if (this.clearCnt > 0) {
            this.clearCnt++;
        }
        if (this.velocityX > 0) {
            if (this.x + this.velocityX + this.width > stageX) {
                tempX = stageX - Math.abs(this.x + this.velocityX - stageX);
            }
            for (let i = 0; i < block.length; i++) {
                if (this.x + this.width + this.velocityX > block[i].getX() && this.y < block[i].getY() + block[i].getHeight() && this.y + this.height > block[i].getY() && this.x + this.velocityX < block[i].getX() + block[i].getWidth()) {
                    tempX = this.x - Math.abs(this.x + this.width + this.velocityX - block[i].getX());
                }
            }
        } else {
            if (this.x + this.velocityX < 0) {
                tempX = this.x + Math.abs(this.x + this.velocityX - 0);
            }
            for (let i = 0; i < block.length; i++) {
                if (this.x + this.velocityX < block[i].getX() + block[i].getWidth() && this.y < block[i].getY() + block[i].getHeight() && this.y + this.height > block[i].getY() && this.x + this.width + this.velocityX > block[i].getX()) {
                    tempX = this.x + Math.abs(this.x + this.velocityX - block[i].getX() - block[i].getWidth());
                }
            }
        }
        if (tempX != -1) {
            this.x = tempX;
            this.velocityX = -this.velocityX;
        } else {
            this.x += this.velocityX;
        }
        if (!this.isGround) {
            if (this.velocityY > 0) {
                for (let i = 0; i < block.length; i++) {
                    if (this.y + this.height + this.velocityY > block[i].getY() && this.x < block[i].getX() + block[i].getWidth() && this.x + this.width > block[i].getX() && this.y < block[i].getY() + block[i].getHeight()) {
                        tempY = block[i].getY() - this.height;
                        this.velocityY = 0;
                        this.isGround = true;
                    }
                }
            } else {
                for (let i = 0; i < block.length; i++) {
                    if (this.y + this.velocityY < block[i].getY() + block[i].getHeight() && this.x < block[i].getX() + block[i].getWidth() && this.x + this.width > block[i].getX() && this.y + this.height > block[i].getY()) {
                        tempY = block[i].getY() + block[i].getHeight();
                        this.velocityY = -this.velocityY;
                        this.isGround = false;
                    }
                }
            }
            if (tempY != -1) {
                this.y = tempY;
            } else {
                this.y += this.velocityY;
            }
            if (this.velocityY < 30)
                this.velocityY += this.accelerationY;
        } else {
            let tempGround = false;
            for (let i = 0; i < block.length; i++) {
                if (!(this.x + this.width < block[i].x || block[i].x + block[i].width < this.x) && block[i].y - this.y == this.height) {
                    tempGround = true;
                }
            }
            this.isGround = tempGround;
        }

        if (!this.isGround && !isHub) {
            if (left()) {
                let minSide = 3000;
                for (let i = 0; i < airBlock.length; i++) {
                    if (this.velocityX > 0) {
                        if (this.x < airBlock[i].getX() + airBlock[i].getWidth() && this.x > airBlock[i].getX() && this.y + this.height < airBlock[i].getY() && minSide > airBlock[i].getY() - this.y - this.height)
                            minSide = airBlock[i].getY() - this.y - this.height;
                    } else {
                        if (this.x + this.width < airBlock[i].getX() + airBlock[i].getWidth() && this.x + this.width > airBlock[i].getX() && this.y + this.height < airBlock[i].getY() && minSide > airBlock[i].getY() - this.y - this.height)
                            minSide = airBlock[i].getY() - this.y - this.height;
                    }
                }
                for (let i = 0; i < block.length; i++) {
                    if (this.velocityX > 0) {
                        if (this.x < block[i].getX() + block[i].getWidth() && this.x > block[i].getX() && this.y + this.height < block[i].getY() && minSide > block[i].getY() - this.y - this.height)
                            minSide = block[i].getY() - this.y - this.height;
                    } else {
                        if (this.x + this.width < block[i].getX() + block[i].getWidth() && this.x + this.width > block[i].getX() && this.y + this.height < block[i].getY() && minSide > block[i].getY() - this.y - this.height)
                            minSide = block[i].getY() - this.y - this.height;
                    }
                }
                if (this.velocityX > 0) {
                    let temp = true;
                    for (let i = 0; i < block.length; i++) {
                        if (((this.x + minSide >= block[i].getX() && this.x + minSide <= block[i].getX() + block[i].getWidth()) || (this.x >= block[i].getX() && this.x <= block[i].getX() + block[i].getWidth())) && ((this.y + minSide + this.height > block[i].getY() && this.y + this.height + minSide < block[i].getY() + block[i].getHeight()) || (this.y + this.height <= block[i].getY() + block[i].getHeight() && this.y + this.height >= block[i].getY())))
                            temp = false;
                        if (this.y + this.height + minSide > block[i].getY() && this.x < block[i].getX() + block[i].getWidth() && this.x + minSide > block[i].getX() && this.y + this.height < block[i].getY() + block[i].getHeight())
                            temp = false;
                    }

                    if (this.x + minSide < stageX && temp && minSide > 30) {
                        block.push(new Block(this.x, this.y + this.height, minSide, minSide, true));
                    }
                } else {
                    let temp = true;
                    for (let i = 0; i < block.length; i++) {
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
            if (this.jump()) {
                this.velocityY = -15;
                this.isGround = false;
            }
        }

        if (this.deathCnt > 200) {

            this.deathCnt = -1;
            for (let i = 0; i < 50; i++) {
                for (let j = 0; j < 50; j++) {
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
        for (let i = 0; i < 10; i++)
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

Player.prototype.resetDeathCnt = function() {
    this.deathCnt = 0;
};
