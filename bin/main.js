let ctx;
let pressKey = new Array(2);
let pressKeyLock = new Array(2);

(window.onresize = function() {
    var cv = document.querySelector("#can");
    let rect = document.body.getBoundingClientRect();
    let scaleW = rect.width / cv.width;
    let scaleH = rect.height / cv.height;
    let scale = scaleW < scaleH ? scaleW : scaleH;
    cv.style.transform = "scale(" + scale + ", " + scale + ")";
    cv.style.position = "fixed";
    cv.style.left = ((scale - 1) * cv.width / 2 + (rect.width - cv.width * scale) / 2) + "px";
    cv.style.top = ((scale - 1) * cv.height / 2 + (rect.height - cv.height * scale) / 2) + "px";
})();

//初期化
window.onload = function() {
    screenCanvas = document.getElementById('can');
    screenCanvas.width = 640;
    screenCanvas.height = 480;
    ctx = screenCanvas.getContext('2d');
    game = new Game();

    let getDevice = (function() {
        let ua = navigator.userAgent;
        if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
            return 'sp';
        } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
            return 'sp';
        } else {
            return 'other';
        }
    })();

    if (getDevice == 'other') {
        screenCanvas.addEventListener('mousedown', mouseDown, true);
        screenCanvas.addEventListener('mouseup', mouseUp, true);
    } else {
        touchSetting();
    }
    game.select();
};

function touchSetting() {
    if (window.TouchEvent) {
        if (window.addEventListener) {
            function touchDown(event) {
                pressKey[0] = true;
            }

            function touchUp(event) {
                pressKey[0] = false;
                pressKeyLock[0] = false;
            }

            let element = document.getElementById("can");

            element.addEventListener("touchstart", touchDown);
            element.addEventListener("touchend", touchUp);
        }
    }
}

function mouseDown(event) {
    let ck = event.button;
    if (ck == 0) {
        pressKey[0] = true;
    } else if (ck == 2) {
        pressKey[1] = true;
    }
}

function mouseUp(event) {
    let ck = event.button;
    if (ck == 0) {
        pressKey[0] = false;
        pressKeyLock[0] = false;
    } else if (ck == 2) {
        pressKey[1] = false;
        pressKeyLock[1] = false;
    }
}

function right() {
    if (pressKey[1] && !pressKeyLock[1]) {
        pressKeyLock[1] = true;
        return true;
    } else {
        return false;
    }
}

function left() {
    if (pressKey[0] && !pressKeyLock[0]) {
        pressKeyLock[0] = true;
        return true;
    } else {
        return false;
    }
}

//メイン関数
let main = function() {
    game.update();
    game.draw();
};
setInterval(main, 1000 / 60);

//継承関数
let inherits = function(childCtor, parentCtor) {
    Object.setPrototypeOf(childCtor.prototype, parentCtor.prototype);
};

//描画関数
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
    drawRect(x, y, 1, 1, color);
    return;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.arc(x, y, 1, 0, Math.PI * 2, false);
    ctx.fill();
}

function drawCircle(x, y, r, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.stroke();
}
