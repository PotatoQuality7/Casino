import "./styles.css";
import Canvas from "./script.js";
import { useState, useEffect, React } from "react";

import Casino from "../index.jsx";

function Historico() {

	const [conteudo,setConteudo] = useState("");
	const [display,setDisplay] = useState("block");

	var biscoito, batata, palony;
	var fill = 0, fill_count = 0, step = 4;

	var steps = [
		0,0,0,0,0,0
	];

	const voltar = (e) => {
		/*setDisplay("");
		setConteudo(<Casino />);*/
		window.location = "/Casino";
	}
		const [green,setGreen] = useState("none");
		const [red,setRed] = useState("none");

	function Menu() {

		const [nome, setNome] = useState("Algoo");
		const [senha, setSenha] = useState("Algoo");
		const [cor1, setCor1] = useState("yellow");	
		const [cor2, setCor2] = useState("purple");	
		const [permissao, setPermissao] = useState(false);
	let calibrou = false;

		const [total, setTotal] = useState([
            0,0,0,0,0,0
        ]);

		const [lucros, setLucros] = useState([
            {real: Math.trunc(Math.random()*100), demo: 0},
            {real: Math.trunc(Math.random()*100), demo: 0},
            {real: Math.trunc(Math.random()*100), demo: 0},
            {real: Math.trunc(Math.random()*100), demo: 0},
            {real: Math.trunc(Math.random()*100), demo: 0},
            {real: Math.trunc(Math.random()*100), demo: 0},
        ]);

		const [perdas, setPerdas] = useState([
            {real: Math.trunc(Math.random()*100), demo: 0},
            {real: Math.trunc(Math.random()*100), demo: 0},
            {real: Math.trunc(Math.random()*100), demo: 0},
            {real: Math.trunc(Math.random()*100), demo: 0},
            {real: Math.trunc(Math.random()*100), demo: 0},
            {real: Math.trunc(Math.random()*100), demo: 0},
        ]);

		const animacaoBoard = (e) => {
			setCor1(cor1 == "yellow"? "purple" : "yellow");		
			setCor2(cor2 == "yellow"? "purple" : "yellow");		
		}

		function calibrar() {
			if (permissao == false && calibrou == false)
				return "";
			setTotal([
				total[0]+steps[0],
				total[1]+steps[1],
				total[2]+steps[2],
				total[3]+steps[3],
				total[4]+steps[4],
				total[5]+steps[5],
			]);
			fill_count++;
			if (fill_count == 500) {
				setPermissao(false);
				calibrou = true;
				clearInterval(palony);
			}
		}

		function definirDemos() {
			let max = -1, temp;
			for (let i = 0; i <= 5; i++) {
				temp = lucros[i].real+perdas[i].real;
				if (temp > max)
					max = temp;
			}
			const ratio = 650/max;
			temp = [];
			temp.push(lucros,perdas);
			for (let i = 0; i <= 1; i++) {
				for (let j = 0; j <= 5; j++) {
					temp[i][j].demo = temp[i][j].real*ratio;
				}
			}
			setLucros(temp[0]);	
			setPerdas(temp[1]);
		}

		useEffect(() => {
			definirDemos();
		}, [lucros,perdas]);

		useEffect(() => {
			palony = setInterval(calibrar, 1);
			return () => clearInterval(palony);
		}, [total,step]);

		function definirSaltos() {
			for (let i = 0; i <= 5; i++) {
				total[i] = lucros[i].demo+perdas[i].demo;
				steps[i] = total[i]/500;
				total[i] = 0;
			}
			setPermissao(true);
		}

		const fillar = (e) => {
			setTotal([
				fill,fill,fill,fill,fill,fill
			]);
			fill += step;
			if (fill == 680)
				step *= -1;
			if (fill < 0) {
				step *= -1;
				setGreen("green");
				setRed("red");
				clearInterval(batata)
				definirSaltos();
			}
		}

		useEffect(() => {
			biscoito = setInterval(animacaoBoard, 60);
			return () => clearInterval(biscoito);
		}, [cor1, cor2]);

		useEffect(() => {
			batata = setInterval(fillar, 5);
			return () => clearInterval(batata);
		}, []);
		
		return (
			<div id="tela-borda" ref={el => {
		            if (el) {
					  let pattern = "repeating-linear-gradient(-45deg, "+cor1+" 5px, "+cor1+", "+cor2+" 10px, "+cor2+", "+cor1+" 15px)";
		              el.style.setProperty("background", pattern, 'important'); }}}>
				<div id="tela">
					<Canvas />
					<h1 id="titulo">HISTÓRICO</h1>
					<div id="hcontainer">
						<section>
							<div className="valor" id="valor-1" style={{bottom: (650-total[0])-26+"px"}}>
								<label className="lucro">${lucros[0].real}</label> |
								<label className="perda">${perdas[0].real}</label>
							</div>
							<div className="jogos" id="jogo-1" ref={el => {
								if (el) {
									el.style.setProperty("height",total[0]+"px","important");}}}>
								<div className="fill" style={{background: green, height: lucros[0].demo+"px"}}></div>
								<div className="fill" style={{background: red, height: perdas[0].demo+"px"}}></div>
							</div>
						</section>
						<section>

							<div className="valor" id="valor-2" style={{bottom: (650-total[1])-26+"px"}}>
								<label className="lucro">${lucros[1].real}</label> |
								<label className="perda">${perdas[1].real}</label>
							</div>						<label className="texto" id="texto-1">Torre de Blocos</label>
							<div className="jogos" id="jogo-2" ref={el => {
								if (el) {
									el.style.setProperty("height",total[1]+"px","important");}}}>
								<div className="fill" style={{background: green, height: lucros[1].demo+"px"}}></div>
								<div className="fill" style={{background: red, height: perdas[1].demo+"px"}}></div>
							</div>
						</section>
						<section>
							<div className="valor" id="valor-3" style={{bottom:  (650-total[2])-26+"px"}}>
								<label className="lucro">${lucros[2].real}</label> |
								<label className="perda">${perdas[2].real}</label>
							</div>
							<label className="texto" id="texto-2">Tetris</label>
							<div className="jogos" id="jogo-3" ref={el => {
								if (el) {
									el.style.setProperty("height",total[2]+"px","important");}}}>
								<div className="fill" style={{background: green, height: lucros[2].demo+"px"}}></div>
								<div className="fill" style={{background: red, height: perdas[2].demo+"px"}}></div>
							</div>
						</section>
						<section>
							<div className="valor" id="valor-4" style={{bottom:  (650-total[3])-26+"px"}}>
								<label className="lucro">${lucros[3].real}</label> |
								<label className="perda">${perdas[3].real}</label>
							</div>
							<label className="texto" id="texto-3">SkatePong</label>
							<div className="jogos" id="jogo-4" ref={el => {
								if (el) {
									el.style.setProperty("height",total[3]+"px","important");}}}>
								<div className="fill" style={{background: green, height: lucros[3].demo+"px"}}></div>
								<div className="fill" style={{background: red, height: perdas[3].demo+"px"}}></div>
							</div>
						</section>
						<section>
							<div className="valor" id="valor-5" style={{bottom:  (650-total[4])-26+"px"}}>
								<label className="lucro">${lucros[4].real}</label> |
								<label className="perda">${perdas[4].real}</label>
							</div>
							<label className="texto" id="texto-4">Snake</label>
							<div className="jogos" id="jogo-5" ref={el => {
								if (el) {
									el.style.setProperty("height",total[4]+"px","important");}}}>
								<div className="fill" style={{background: green, height: lucros[4].demo+"px"}}></div>
								<div className="fill" style={{background: red, height: perdas[4].demo+"px"}}></div>
							</div>
						</section>
						<section>
							<div className="valor" id="valor-6" style={{bottom:  (650-total[5])-26+"px"}}>
								<label className="lucro">${lucros[5].real}</label> |
								<label className="perda">${perdas[5].real}</label>
							</div>
							<label className="texto" id="texto-5">Bounce</label>
							<div className="jogos" id="jogo-6" ref={el => {
								if (el) {
									el.style.setProperty("height",total[5]+"px","important");}}}>
								<div className="fill" style={{background: green, height: lucros[5].demo+"px"}}></div>
								<div className="fill" style={{background: red, height: perdas[5].demo+"px"}}></div>
							</div>
							<label className="texto" id="texto-6">F1 Race</label>
						</section>
						<button id="colapsar"></button>
					</div>
					<button id="voltar" onClick={voltar}>Voltar</button>
				</div>
			</div>
		)		
	}

	return (
		<div>
			<div style={{"display": display}}>
				<title>Tela do Historico</title>
				<Menu />
			</div>
			<div>
                <div id="cortina-l"></div>
                <div id="cortina-r"></div>
            </div>
			{conteudo}
		</div>
	)

}

export default Historico;
