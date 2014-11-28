'use strict';
function Game(idCanvas,w,h){

	var canvas = document.createElement(idCanvas);
	document.body.appendChild(canvas);
	var ctx = canvas.getContext('2d');
	canvas.width = w;
	canvas.height = h;
	this.canvas = canvas;
	this.ctx = ctx;
	this.paleta = new paleta((w/2)-25, h-20, 50, 10, w, h, 5);
	this.teclas = {}
	var _this = this;

	document.addEventListener("keydown", function(e) {
		_this.teclas[e.keyCode] = true;
	});

	document.addEventListener("keyup", function(e) {
		delete _this.teclas[e.keyCode];
	});


	this.animar = function(){
		var derecha = 39;
		var isquierda = 37;
		if (_this.teclas[derecha]){
			_this.paleta.moverDerecha();
		}
		if (_this.teclas[isquierda]){
			_this.paleta.moverIsquierda();
		}
		_this.pintarCanvas();
		window.requestAnimationFrame(_this.animar,_this.canvas);
	}

	this.play = function(){
		window.requestAnimationFrame(this.animar,this.canvas);
	}

}



	Game.prototype.pintarCanvas = function(){
	 this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.paleta.pintar(this.ctx);
	}

	function canvasElement(x,y,w,h,mx,my,v){
	    this.x = x;
    	this.y = y;
    	this.w = w;
    	this.h = h;
    	this.v = v;
    	this.mx = mx;
    	this.my = my; 
	}

	canvasElement.prototype.colicion= function(ce){

	}

	canvasElement.prototype.moverDerecha = function(){
		if ((this.x+this.w) < this.mx){
			this.x += this.v;
		}	
	}

	canvasElement.prototype.moverIsquierda = function(){
		if (this.x > 0 ){
			this.x -= this.v;
		}
	}

/**************************************************************/

	function paleta(x,y,w,h,mx,my,v){
		canvasElement.call(this, x,y,w,h,mx,my,v);
	};

	paleta.prototype = Object.create(canvasElement.prototype);

	paleta.prototype.constructor = paleta;
	paleta.prototype.pintar = function(ctx) {
    ctx.fillRect(this.x, this.y, this.w, this.h);
	}

/**************************************************************/
	var game = new Game('canvas', 400,500);
	game.pintarCanvas();
	game.play();

/**************************************************************/


