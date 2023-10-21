import './styles.css';
import { useState } from 'react';
import Login from '../Login/index.js';

function Casino() {
	
	const [conteudo,setConteudo] = useState("");
	const [display,setDisplay] = useState("block");
	
	const logout = (e) => {
		setConteudo(<Login />);
		setDisplay("none");
	}

	function Menu() {

		const [nome,setNome] = useState("Algoo");
		const [senha,setSenha] = useState("Algoo");
		const [cor,setCor] = useState("red");

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
		]);

		const [duracao, setDuracao] = useState(0);
		
		const upNome = (e) => {
			setNome(e.target.value);
		}
	
		const upSenha = (e) => {
			setSenha(e.target.value);
		}

		function cadastrar() {
			setDisplay("none");
		}

		function logar() {
			setDisplay("none");
		}

		const moverButoes = (e) => {
			if (duracao[0] == duracao[1])
				gerarDirecoes();
			const temp = [];		
			for (let i = 0; i <= 3; i++) {
				temp.push([
					{x: (flt[i].x+dir[i].x), y: (flt[i].y+dir[i].y)}
				]);
			}
			alert("ss");
			//setFlt(temp);
			//setDuracao([duracao[0],duracao[1]++);
		}

		function gerarDirecoes() {
			setDuracao([(Math.random() * 15) + 10,0]);
			setDuracao([ (Math.random() * 15) , 5]);
			const temp = [];
			for (let i = 0; i <= 3; i++) {
				temp.push([
					{x: (Math.random()*3)-1, y: (Math.random()*3)-1}
				]);
			}
			temp.push([
				{x: (Math.random()*3)-1, y: (Math.random()*3)-1}
			]);

			setDir([
				{x: 0, y: 0},
				{x: 0, y: 0},
				{x: 0, y: 0},
				{x: 0, y: 0},
			]);

			//setDir(temp);
			alert(dir[3].x);
		}

		return (
			<div>
				<div style={{"display": display}}>
					<div>
						<h1>Casino</h1>
						<button onClick={logout}>POWER</button>
						<button id="jogo-1" className="jogos">Torre de Blocos</button>
						<button id="jogo-2" className="jogos">Tetris</button>
						<button id="jogo-3" className="jogos">SkatePong</button>
						<button id="jogo-4" className="jogos">Snake</button>
						<button id="jogo-5" className="jogos">Bounce</button>
						<button id="jogo-6" className="jogos">F1 Race</button>
					</div>
					<nav>
						<button id="flt-1" className="flutuantes" 
						ref={el => {
				            if (el) {
				              el.style.setProperty('top', (flt[0].x+"px"), 'important');
				              el.style.setProperty('left', (flt[0].y+"px"), 'important');
				            }
				     	 }}>Perfil</button>
						<button id="flt-2" className="flutuantes" 
						ref={el => {
				            if (el) {
				              el.style.setProperty('top', (flt[1].x+"px"), 'important');
				              el.style.setProperty('left', (flt[1].y+"px"), 'important');
				            }
				     	 }}>Estatisticas</button>
						<button id="flt-3" className="flutuantes" 
						ref={el => {
				            if (el) {
				              el.style.setProperty('top', (flt[2].x+"px"), 'important');
				              el.style.setProperty('left', (flt[2].y+"px"), 'important');
				            }
				     	 }}>Transferencias</button>
						<button id="flt-4" className="flutuantes" 
						ref={el => {
				            if (el) {
				              el.style.setProperty('top', (flt[3].x+"px"), 'important');
				              el.style.setProperty('left', (flt[3].y+"px"), 'important');
				            }
				     	 }}>Documentacao</button>						
					</nav>
					
					<button className="jogos" onClick={gerarDirecoes}>Algo</button>
					<label>{flt[0].y}--{flt[0].x}</label>
					</div>
					{conteudo}
			</div>
		)		
	}

	return (
		<div>
			{/*retirar esse useState*/}
			<div id="bordas" style={{"display": display}}>
				<title>Tela do Casino</title>
				<Menu />
			</div>
			{conteudo}
		</div>
	)
}

export default Casino;
