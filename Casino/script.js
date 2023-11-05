import React, { useRef, useEffect } from 'react';

function Canvas() {
	const canvasRef = useRef(null);


	let width, height, ctx;
	let cores = [];
	const quads = 30;
	let pos = -1, integrantes = 0;
	var biscoito;

	function kickStart() {}	

	function totobolarCor() {
		let rgb = "rgba("+Math.random()*256+","+Math.random()*256+","+Math.random()*256+",0.1)";
		integrantes = (Math.random()*11)+5;
		let a = 1, k = a/integrantes;
		for (let i = pos; i < pos+integrantes; i++) {
			cores[i] = rgb;
		}
		clearInterval(biscoito);
		setTimeout(() => {
			biscoito = setInterval(shiftar,(Math.random()*131)+70);
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
			for (let j = 0; j <= quads+3; j++) {
				ctx.fillStyle = cores[i-1];
				ctx.fillRect((j*quads)+(j*6),(i-1)*quads,width,height);
			}
		}
		pos--;
	}

	useEffect(() => {
	    const canvas = canvasRef.current;
	    ctx = canvas.getContext('2d');

	    ctx.fillRect(0, 0, canvas.width, canvas.height);

	    canvas.width = 1180;
	    canvas.height = 1000;


		width = (canvas.width/quads) - 6;
		height = (canvas.height/quads) - 6;

		for (let i = 0; i <= quads+18; i++)
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
