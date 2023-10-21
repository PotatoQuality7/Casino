import './styles.css';
import { useState } from 'react';
import Login from '../Login/index.js';

function Casino() {
	
	const [conteudo,setConteudo] = useState("");
	const [display,setDisplay] = useState("block");

	function logout() {
		setConteudo(<Login />);
		setDisplay("none");
	}

	function Menu() {
		
		const [flt, setFlt] = useState([
			{x: 600, y: 600},
			{x: 600, y: 600},
			{x: 600, y: 600},
			{x: 600, y: 600},
		])

		const [dir, setDir] = useState([
			{x: 0, y: 0},
			{x: 0, y: 0},
			{x: 0, y: 0},
			{x: 0, y: 0},
		])

		const [duracao, setDuracao] = useState(0,0);

		//const algo = setInterval(moverButoes, 2000);
		moverButoes();
		console.log("A");
		function moverButoes() {
			if (duracao[0] == duracao[1])
				gerarDirecoes();
			const temp = [];		
			for (let i = 0; i <= 3; i++) {
				temp.push([
					{x: (flt[i].x+dir[i].x), y: (flt[i].y+dir[i].y)}
				]);
			}
			setFlt(temp);
			//setDuracao([duracao[0]] [duracao[1]++]);
		}

		function gerarDirecoes() {
			setDuracao((Math.random() * 15) + 10,0);
			const temp = [];
			for (let i = 0; i <= 3; i++) {
				temp.push([
					{x: (Math.random()*3)-1, y: (Math.random()*3)-1}
				]);
			}
			console.log(duracao[0]);
			setDuracao(10,0);
			console.log(duracao[0]);
			setDir(temp);
		}

		return (
			<div>
				<div>
					<h1>Casino</h1>
					<button onClick={logout}>POWER</button>
					<button id="jogo-1" class="jogos">Torre de Blocos</button>
					<button id="jogo-2" class="jogos">Tetris</button>
					<button id="jogo-3" class="jogos">SkatePong</button>
					<button id="jogo-4" class="jogos">Snake</button>
					<button id="jogo-5" class="jogos">Bounce</button>
					<button id="jogo-6" class="jogos">F1 Race</button>
				</div>
				<nav>
					<button id="flt-1" class="flutuantes" style={{"left": flt[0].x, "top": flt[0].y}}>Perfil</button>
					<button id="flt-2" class="flutuantes" style={{"left": flt[1].x, "top": flt[1].y}}>Estatisticas</button>
					<button id="flt-3" class="flutuantes" style={{"left": flt[2].x, "top": flt[2].y}}>Transferencias</button>
					<button id="flt-4" class="flutuantes" style={{"left": flt[3].x, "top": flt[3].y}}>Documentacao</button>					
				</nav>
			</div>
		)
	}

	return (
		<div>
			<div id="bordas" style={{"display": display}}>
				<title>Casino</title>
				<Menu />
			</div>
			{conteudo}
		</div>
	)
}

export default Casino;
