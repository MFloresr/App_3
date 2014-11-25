'use strict';
// http://www.jlabstudio.com/webgl/2013/04/uso-practico-de-vectores-pong-y-un-poco-de-sonido/
// https://medium.com/javascript-scene/
function Game(idCanvas,w,h) {
    this.puntuacio = 0;
    
    /* Crear el canvas */
    var canvas = document.createElement(idCanvas);
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    canvas.width = w;
    canvas.height = h;
    this.canvas = canvas;
    this.ctx =ctx;
    this.paleta= new Paleta((w/2)-25,
                            h-20,
                            50,
                            10,
                            w,
                            h,
                            5);
    this.teclas={}
    var _this = this;
    document.addEventListener("keydown", function(e) {
        _this.teclas[e.keyCode] = true;
    });
    
    document.addEventListener("keyup", function(e) {
        delete _this.teclas[e.keyCode];
    });
    
    this.animar = function() {
        var dreta = 39;
        var esquerra = 37;
        if (_this.teclas[dreta])
            _this.paleta.moverDreta();
        if (_this.teclas[esquerra])
            _this.paleta.moverEsquerra();
        _this.pintarCanvas();
        window.requestAnimationFrame(_this.animar,_this.canvas);
    }
    this.play = function() {
        window.requestAnimationFrame(this.animar,this.canvas);
    }
    
}

Game.prototype.pintarCanvas = function() {
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.paleta.pintar(this.ctx);
}


function CanvasElement(x,y,w,h,mx,my,v) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.v = v;
    this.mx = mx;
    this.my = my;
}

CanvasElement.prototype.colisio= function(ce) {
    
}
CanvasElement.moverDreta = function() {
    if ((this.x+this.w) < this.mx)
        this.x += this.v;
}
CanvasElement.moverEsquerra = function() {
    if (this.x > 0)
        this.x -= this.v;
}

function Paleta(x,y,w,h,mx,my,v) { 
    CanvasElement.call(this, x,y,w,h,mx,my,v);
}

Paleta.prototype = Object.create(CanvasElement.prototype);

Paleta.prototype.constructor = Paleta;
Paleta.prototype.pintar = function(ctx) {
    ctx.fillRect(this.x, this.y, this.w, this.h);
}

/**************************************************************/

var game = new Game('canvas', 400,500);
game.pintarCanvas();
game.play();