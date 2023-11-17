import React, { useRef, useEffect } from 'react';

function Torres() {
	const canvasRef = useRef(null);


	let canvas;
	let ctx, cor;
	let kkslide = 20;
	let integrantes = 0;
	var batata, biscoito, palony, camera;
	let flash_count = 0, num_flash = 10;
	let y, x;
	let iniciar = true;
	var intervalo = {
		atual: [100,500],
		aux: [100,500],
	};
	let direcoes = [-1,1];
	let blocos = [], pedregulho = [], alvo = [];
	let stack = {
		atual: 1,
		limite: 10,
	};

	const incremento = 0.01; //Pegar API do SpringBoot para obter a constante do incremento

	let aposta = {
		valor: 50,
		refresco: 0,
	};

	let board = [];

	function gameOver() {
		//alert("boi");
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
			ctx.fillRect(x*kkslide,(y*kkslide),blocos[i].width*kkslide,blocos[i].height*kkslide);
		}
		flash_count++;
		if (flash_count == num_flash) {
			clearInterval(batata);
			gameOver();
		}
	}

	function aumentarRefresco() {
		aposta.refresco += aposta.valor*incremento;
	}

	function shiftar() {
		for (let i = stack.limite-1; i > 0; i--) {
			blocos[i].x = blocos[i-1].x; 
			blocos[i].y = blocos[i-1].y; 
			blocos[i].width = blocos[i-1].width; 
			blocos[i].height = blocos[i-1].height; 
			blocos[i].cor = blocos[i-1].cor;
		}
		alvo.y = blocos[0].y;
		blocos[0].y = 0;
		blocos[0].x = Math.trunc(board.width/2)-5;
		blocos[0].direcao = direcoes[Math.trunc(Math.random()*2)];
		cor = "rgb("+Math.random()*256+","+Math.random()*256+","+Math.random()*256+")";
		blocos[0].cor = cor;

	}

	function pedregulhar() {
		y = pedregulho.y; x = pedregulho.x;
		if (y == blocos[1].y+blocos[1].height)
			clearInterval(palony);
		ctx.clearRect(x*kkslide,y*kkslide,pedregulho.width*kkslide,pedregulho.height*kkslide);
		y = ++pedregulho.y;
		ctx.fillStyle = pedregulho.cor;
		ctx.fillRect(x*kkslide,y*kkslide,pedregulho.width*kkslide,pedregulho.height*kkslide);
}

	function analisarSobrevivencia(x) {
		if (iniciar == true) {
			alvo.x[0] = x;
			alvo.x[1] = x+blocos[0].width;
			iniciar = false;
/*		ctx.fillStyle = "red";
		ctx.fillRect(0,0,alvo.x[0]*kkslide,canvas.height);
		ctx.fillRect(alvo.x[1]*kkslide,0,(board.width-alvo.x[1])*kkslide,canvas.height);*/
			return true;
		}
		let reducao = blocos[0].width;
		if (x+blocos[0].width < alvo.x[0]+1 || x > alvo.x[1]-1)
			return false;
		if (x <= alvo.x[0]) {
			reducao = alvo.x[0]-x;
			alvo.x[1] = x+blocos[0].width;
			pedregulho.x = alvo.x[0]-reducao;;
		}
		else {
			reducao = (x+blocos[0].width)-alvo.x[1];
			alvo.x[0] = x;
			pedregulho.x = alvo.x[1];
		}
		blocos[0].width -= reducao;
		pedregulho.y = blocos[0].y;
		pedregulho.width = reducao;
		pedregulho.height = blocos[0].height;
		pedregulho.cor = cor;
		//palony = setInterval(pedregulhar,intervalo.atual[1]);

		/*ctx.fillStyle = "red";
		ctx.fillRect(0,0,alvo.x[0]*kkslide,canvas.height);
		ctx.fillRect(alvo.x[1]*kkslide,0,(board.width-alvo.x[1])*kkslide,canvas.height);*/
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
		  clearInterval(biscoito);
		  clearInterval(camera);
		  cor = "white";
		  batata = setInterval(flash,120);
		  //locksetas and run it down to the floor then, you lose
		}
	}

	function apagarBloco() {
		y = blocos[0].y; x = blocos[0].x;
		ctx.clearRect(x*kkslide,y*kkslide,blocos[0].width*kkslide,blocos[0].height*kkslide);
	}

	function desenharBloco() {
		y = blocos[0].y; x = blocos[0].x;
		ctx.fillStyle = cor;
		ctx.fillRect(x*kkslide,y*kkslide,blocos[0].width*kkslide,blocos[0].height*kkslide);
	}

	function gravitar() {
		y = blocos[0].y;
		if (y+blocos[0].height == alvo.y) {
			calcularPrecisao();
		}
		apagarBloco();
		y = ++blocos[0].y;
		desenharBloco();			
	}

	function deslizar() {
		x = blocos[0].x;
		if (x == 0 || x+blocos[0].width == board.width) {
			blocos[0].direcao = blocos[0].direcao == -1? 1 : -1;
		}
		apagarBloco();
		blocos[0].x += blocos[0].direcao;
		x = blocos[0].x;
		desenharBloco();
	}

	function camerar() {
		alvo.y++;
		for (let i = stack.limite-1; i > 0; i--) {
			y = blocos[i].y; x = blocos[i].x;
			ctx.clearRect(x*kkslide,y*kkslide,blocos[i].width*kkslide,blocos[i].height*kkslide);
			y = ++blocos[i].y;
			ctx.fillStyle = blocos[i].cor;
			ctx.fillRect(x*kkslide,y*kkslide,blocos[i].width*kkslide,blocos[i].height*kkslide);
		}
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
			width: 8,
			height: 8,
		}];
			
		pedregulho = {
			y: 0,
			x: 0,
			width: 0,
			height: 0,
			cor: "",
		};

		for (let i = 1; i < stack.limite; i++) {
			blocos.push({
				y: 0,
				x: 0,
				width: 0,
				cor: "",
			});
		}
		alvo = {
		 	y: board.height,
			x: [0,board.width],
		};
				
		cor = "rgb("+Math.random()*256+","+Math.random()*256+","+Math.random()*256+")";		
		blocos[0].cor = cor;
		biscoito = setInterval(deslizar,intervalo.atual[0]);
		batata = setInterval(gravitar,intervalo.atual[1]);
		camera = setInterval(camerar,2000);

		window.addEventListener("keydown", function(e) {
			switch (e.keyCode) {
				case 13: intervalo.aux[1] = intervalo.atual[1];
						 clearInterval(biscoito);					  	 
						 clearInterval(batata);		
				   		 intervalo.atual[1] /= 20;
						 batata = setInterval(gravitar,intervalo.atual[1]);
		    			 break;
			}
		});

	  }, []);

	  return <canvas ref={canvasRef} />;
}

export default Torres;
