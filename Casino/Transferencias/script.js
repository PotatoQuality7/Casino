import React, { useRef, useEffect } from 'react';

function Canvas() {
	const canvasRef = useRef(null);

	let width, height, ctx;
	let cores = [];
	//const quads = 30;
	const quads = 20;
	let pos = -1, integrantes = 0;
	var biscoito;

	function totobolarCor() {
		let rgb = "rgba("+Math.random()*256+","+Math.random()*256+","+Math.random()*256+",";
		//integrantes = (Math.random()*11)+8;
		integrantes = (Math.random()*(quads/3))+8;
		let a = 1, k = a/integrantes;
		for (let i = pos; i < pos+integrantes; i++) {
			cores[i] = rgb+a+")";
			a -= k;
		}
		clearInterval(biscoito);
		setTimeout(() => {
			biscoito = setInterval(shiftar,(Math.random()*101)+70);
		}, Math.random()*7000);

	}

	function shiftar() {
		if (pos+integrantes < 0) {
			pos = quads+1;
			totobolarCor();
			return;
		}
		for (let i = pos; i <= pos+integrantes+1; i++) {
			if (i < 0)
				continue;
			cores[i-1] = cores[i];
			ctx.clearRect(0,(i-1)*quads,canvas.width,height);
			ctx.fillStyle = cores[i-1];
			for (let j = 0; j <= quads; j++) {
				ctx.fillRect((j*quads)+(j*17),(i-1)*quads,width,height);
			}
		}
		pos--;
	}
	let canvas;

	useEffect(() => {
	    canvas = canvasRef.current;
	    ctx = canvas.getContext('2d');

		canvas.width = 750;
        canvas.height = 500;

		ctx.fillStyle = "black";
	    ctx.fillRect(0, 0, canvas.width, canvas.height);

		width = (canvas.width/quads) - 3;
		height = (canvas.height/quads) - 9;

		for (let i = 0; i <= quads+21; i++)
			cores.push("black");
		
		for (let i = 0; i <= quads+1; i++) {
			ctx.fillStyle = cores[i];
			for (let j = 0; j <= quads+3; j++) {
				ctx.fillRect((j*quads)+(j*6),i*quads,width,height);
			
			}
		}
		
		shiftar();
	  }, []);

	  return <canvas ref={canvasRef} />;
}

export default Canvas;
