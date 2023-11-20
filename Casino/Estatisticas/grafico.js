import React, { useState, useRef, useEffect } from 'react';

function Grafico(props) {
	const canvasRef = useRef(null);	

	//const [cor, setCor] = useState();

	let canvas, ctx;
	let lucros = 0, perdas = 0;
	let pos, valores = [], pontos = [];
	const cores = ["purple","blue","green","yellow", "orange","red","white"];
	const meses = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];
	let colunas, cor, unir = 1, tamanho;
	const c = 7;
	let break_even;
	let gap;

	let id, idd;

	function converterValores() {
        let max = 0, temp;
		pontos = [];

       for (let i = 0; i < tamanho; i++) {
	        for (let j = 0; j < colunas; j++) {
	            temp = Math.abs(valores[idd[i]-1][j].y);
	            if (temp > max)
	                max = temp;
	        }
		}
		pontos = JSON.parse(JSON.stringify(valores));
        const ratio = (canvas.height-20)/(max*2);

        for (let i = 0; i < tamanho; i++) {
            for (let j = 0; j < colunas; j++) {
                pontos[idd[i]-1][j].y = (Math.trunc(-1*valores[idd[i]-1][j].y*ratio))+break_even;
            }
        }		
	}

	function dividirCanvas() {
		ctx.fillStyle = "rgba(0,255,0,0.3)";
		ctx.fillRect(0,0,canvas.width,break_even);
		ctx.fillStyle = "rgba(255,0,0,0.3)";
		ctx.fillRect(0,break_even,canvas.width,canvas.height-break_even);
	}

	function unificarValores() {
		let temp = [];
		let soma;
		for (let j = 0; j < colunas; j++) {
			soma = 0;
			for (let i = 0; i < tamanho; i++) {
				soma += valores[idd[i]-1][j].y;	
			}
			valores[6][j].y = soma;
			console.log(soma);
		}
	}

	function desenharValores() {
		ctx.font = "30px Arial";
		ctx.fillStyle = "green";
		ctx.fillText("$"+lucros,canvas.width/2-50, break_even/2);
		ctx.fillStyle = "red";
		ctx.fillText("$"+perdas,canvas.width/2-50, break_even+((canvas.height-break_even)/2));
	}

	function definirCor() {

		cor = cores[id];
	}

	function desenharBolinhas() {
		ctx.fillStyle = "white";
		ctx.font = "20px Arial";
		for (let i = 0; i < colunas; i++) {
			ctx.beginPath();
			ctx.ellipse(gap+(pontos[pos][i].x*gap),pontos[pos][i].y-1,c,c,0,0,2*Math.PI);
			ctx.fill();
			ctx.closePath();
			ctx.fillText(meses[i],gap+(pontos[pos][i].x*gap)-15,break_even+25);
		}
	}

	function desenharLinhas() {
		ctx.strokeStyle = cor;
		ctx.lineWidth = "3";
		ctx.beginPath();
		ctx.moveTo(0,break_even);
		for (let i = 0; i < colunas; i++) {
			ctx.lineTo(gap+(pontos[pos][i].x*gap),pontos[pos][i].y);
			ctx.stroke();
			if (valores[pos][i].y > 0)
				lucros += valores[pos][i].y;
			 else
				perdas += valores[pos][i].y;
		}
		ctx.closePath();
	}

	function desenharGrafico(id) {
		definirCor();
		pos = id;
		converterValores();
		desenharBolinhas();
		desenharLinhas();
		desenharBolinhas();
	}

	useEffect(() => {
	    canvas = canvasRef.current;
	    ctx = canvas.getContext('2d');

		canvas.width = 1055;
		canvas.height = 737;

		break_even = canvas.height/2;

		idd = props.idd;
		colunas = props.colunas;
		valores = props.valores;		

		tamanho = idd.length;
		gap = canvas.width/(colunas+1);		

		lucros = 0;
		perdas = 0;

console.log(valores[5][0].y);
if (props.unir) {
	id = 6;
	if (tamanho != 0) {
		unificarValores();
		idd = [7];
		tamanho = 1;
		desenharGrafico(id);
	}
}
else {
		for (let i = 0; i < tamanho; i++) {
			id = parseInt(idd[i])-1;
			desenharGrafico(id);
		}
}
		dividirCanvas();
		desenharValores();
	
		canvas.addEventListener("click", (e) => {
			let x = e.clientX-434;
			let y = e.clientY-156;
			x = (x-gap)/gap;

			let trig = false;

			for (let i = 0; i < tamanho; i++) {
				id = idd[i]-1;
				for (let j = 0; j < colunas; j++) {
					if ((pontos[id][j].y-5 <= y && y <= pontos[id][j].y+9) && (pontos[id][j].x-0.12 <= x && x <= pontos[id][j].x+0.6)) {
						let valor = valores[id][j].y;
						if (valor < 0) {
							valor *= -1;
							alert("-$"+valor);
						}
						else
							alert("$"+valor);
						trig = true;
						break;
					}
				}
				if (trig)
					break;
			}
		});

  	});

	return <canvas ref={canvasRef} />;
}

export default Grafico;
