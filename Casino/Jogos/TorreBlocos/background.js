import React, { useRef, useEffect } from 'react';

function Torres() {
	const canvasRef = useRef(null);


	let canvas;
	let ctx, cor;
	let kkslide = 20;
	let integrantes = 0;
	var batata, biscoito;
	let flash_count = 0;
	let y, x;
	var intervalo = {
		atual: [100,500],
		aux: [100,500],
	};
	let direcoes = [-1,1];
	let blocos = [], alvo = [];
	let stack = [
		{atual: 1},
		{limite: 15},
	];

	const incremento = 0.01; //Pegar API do SpringBoot para obter a constante do incremento

	let aposta = [
		{valor: 50},
		{refresco: 0},
	];

	let board = [];

	function gameOver() {
		console.log("boi");
		//show results of game here
	}

	function flash() {
		ctx.fillStyle = cor;
		ctx.fillRect(0,0,canvas.width,canvas.height);
		cor = cor == "black"? "white" : "black";
		ctx.fillStyle = cor;
		for (let i = 0; i < stack.limite; i++) {
			y = blocos[i].y;
			x = blocos[i].x;
			ctx.fillRect(x*kkslide,(y*kkslide)-blocos[i].height,blocos[i].width,blocos[i].height);
		}
		flash_count++;
		if (flash_count == 5) {
			clearInterval(batata);
			gameOver();
		}
	}

	function aumentarRefresco() {
		aposta.refresco += aposta.valor*incremento;
	}

	function shiftar() {
		for (let i = 0; i < stack.limite-1; i++) {
			blocos[i+1].x = blocos[i].x; 
			blocos[i+1].y = blocos[i].y; 
			blocos[i+1].width = blocos[i].width; 
			blocos[i+1].height = blocos[i].height; 
		}
		blocos[0].direcao = direcoes[Math.trunc(Math.random()*2)];
		cor = "rgb("+Math.random()*256+","+Math.random()*256+","+Math.random()*256+")";

	}

	function analisarSobrevivencia(x) {
		let resto = blocos[0].width;
		if (x+blocos[0].width < alvo.x[0]+1 || x > alvo.x[1]-1)
			return false;
		if (x <= alvo.x[0])
			resto -= alvo.x[0]-x;
		 else
			resto -= blocos[0].width-alvo.x[1];
		blocos[0].width = resto;
		return true;

	}

	function mudarVelocidades() {
		clearInterval(batata);
		clearInterval(biscoito);
		intervalo.aux[0] = intervalo.atual[0] = intervalo.aux[0]-1;
		intervalo.aux[1] = intervalo.atual[1] = intervalo.aux[1]-1;
		biscoito = setInterval(deslizar,intervalo.atual[0]);
		batata = setInterval(gravitar,intervalo.atual[1]);
	}

	function calcularPrecisao() {
		x = blocos[0].x;
		if (analisarSobrevivencia(x) == true) {
			aumentarRefresco();
			shiftar();
			mudarVelocidades();
		}
		else {
		  clearInterval(batata);
		  cor = "white";
		  batata = setInterval(flash,1000);
		  //locksetas and run it down to the floor then, you lose
		}
	}

	function apagarBloco() {
		ctx.clearRect(blocos.x*kkslide,blocos.y,blocos[0].width,blocos[0].height);
	}

	function desenharBloco() {
		ctx.fillStyle = cor;
		ctx.fillRect(x*kkslide,y*kkslide,blocos[0].width*kkslide,blocos[0].height*kkslide);
	}

	function gravitar() {
		y = blocos[0].y; x = blocos[0].x;
		if (y == alvo.y) {
			calcularPrecisao();
		}
		apagarBloco();
		blocos[0].y++;
		y = blocos[0].y;
		desenharBloco();
			
	}

	function deslizar() {
		y = blocos[0].y; x = blocos[0].x;
		if (x == 0 || x+blocos[0].width == board.width) {
			blocos[0].direcao = blocos[0].direcao == -1? 1 : -1;
		}
		apagarBloco();
		blocos[0].x += blocos[0].direcao;
		x = blocos[0].x;
		desenharBloco();
	}

	useEffect(() => {
	    canvas = canvasRef.current;
	    ctx = canvas.getContext('2d');

	    canvas.width = 1180;
	    canvas.height = 1000;

		board = {
			width: Math.trunc(canvas.width/kkslide),
			height: Math.trunc(canvas.height/kkslide),
		};

		blocos = [{
			y: 0,
			x: Math.trunc(board.width/2)-5,
			direcao: direcoes[Math.trunc(Math.random()*2)],
			width: 5,
			height: 5,
		}];
			
		console.log(blocos);	
		console.log(blocos[0].x);
		for (let i = 1; i < stack.limite; i++) {
			blocos.push([{
				y: 0,
				x: 0,
				width: 0,
			}]);
		}

		alvo = {
			y: canvas.height,
			x: [0,canvas.width/kkslide],
		};
				
		cor = "rgb("+Math.random()*256+","+Math.random()*256+","+Math.random()*256+")";		
		biscoito = setInterval(deslizar,intervalo.atual[0]);
		batata = setInterval(gravitar,intervalo.atual[1]);

		window.addEventListener("keydown", function(e) {
			switch (e.keyCode) {
				case 13: intervalo.aux[1] = intervalo.atual[1];
					  	 clearInterval(batata);		
				   		 intervalo.atual[1] /= 10;
						 batata = setInterval(gravitar,intervalo.atual[1]);
						 console.log("crashing");
		    			 break;
			}
		});

	  }, []);

	  return <canvas ref={canvasRef} />;
}

export default Torres;
