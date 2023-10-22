import './styles.css';
import { useState } from 'react';
import Login from '../Login/index.js';
import React from 'react';

function Casino() {
	
	const [conteudo,setConteudo] = useState("");
	const [display,setDisplay] = useState("block");

	var atual = 0;
	var limite = 0;
	var dir = [];
	var adjust = [
		[0,0],
		[0,0],
		[0,0],
		[0,0],
	];

	const logout = (e) => {
		setConteudo(<Login />);
		setDisplay("none");
	}

	function Menu() {

		const [nome,setNome] = useState("Algoo");
		const [senha,setSenha] = useState("Algoo");
		const [cor1, setCor1] = useState("yellow");	
		const [cor2, setCor2] = useState("purple");	

		const [flt, setFlt] = useState([
			{x: -120, y: 500},
			{x: 520, y: -30},
			{x: 520, y: 945},
			{x: 1152, y: 500},
		])

		const [duracao, setDuracao] = useState([0,0]);
			
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

		function coisa() {
			console.log("Tarde");
		}		

		const moverButoes = (e) => {
			if (atual == limite) {
				gerarDirecoes();
			}
			setCor1(cor1 == "yellow"? "purple" : "yellow");		
			setCor2(cor2 == "yellow"? "purple" : "yellow");		
			for (let i = 0; i <= 3; i++) {
				adjust[i][0] = 0;
				adjust[i][1] = 0;
				switch (flt[i].x) {
					case -120: adjust[i][0] = 1214; break;
					case 1152: adjust[i][0] = -1214; break;			
				}
				switch (flt[i].y) {
					case -30: adjust[i][1] = 934; break;
					case 945: adjust[i][1] = -934; break;			
				}
			}
		
			setFlt([
				{x: (flt[0].x+dir[0][0]+adjust[0][0]), y: (flt[0].y+dir[0][1]+adjust[0][1])},
				{x: (flt[1].x+dir[1][0]+adjust[1][0]), y: (flt[1].y+dir[1][1]+adjust[1][1])},
				{x: (flt[2].x+dir[2][0]+adjust[2][0]), y: (flt[2].y+dir[2][1]+adjust[2][1])},
				{x: (flt[3].x+dir[3][0]+adjust[3][0]), y: (flt[3].y+dir[3][1]+adjust[3][1])},
			]);
			atual++;
			//setDuracao([duracao[0],++duracao[1]]);
		}

		//let algo = setInterval(moverButoes, 2000);

		function gerarDirecoes() {
			dir = [];
			let x, y;
			for (let i = 0; i <= 3; i++) {
				x = (Math.trunc(Math.random()*3)-1);
				y = (Math.trunc(Math.random()*3)-1);
				if (x == 0 && y == 0)
					i--;
				 else
					dir.push([x,y]);
			}
			atual = 0;
			limite = Math.trunc((Math.random() * 51) + 250);
			//setDuracao([(Math.trunc(Math.random() * 15) + 10),32]);
		}

		return (

			<div id="tela-borda" ref={el => {
		            if (el) {
					  let pattern = "repeating-linear-gradient(-45deg, "+cor1+" 9px, "+cor1+", "+cor2+" 18px, "+cor2+", "+cor1+" 27px)";
		              el.style.setProperty("background", pattern, 'important'); }}}>
				<div id="tela">
					<div style={{"display": display}}>
						<div>
							<h1>Casino</h1>
							<button onClick={logout}>POWER</button>
							<div id="borda-1" className="bordas"><button id="jogo-1" className="jogos">Torre de Blocos</button></div>
							<div id="borda-2" className="bordas"><button id="jogo-2" className="jogos">Tetris</button></div>
							<div id="borda-3" className="bordas"><button id="jogo-3" className="jogos">SkatePong</button></div>
							<div id="borda-4" className="bordas"><button id="jogo-4" className="jogos">Snake</button></div>
							<div id="borda-5" className="bordas"><button id="jogo-5" className="jogos">Bounce</button></div>
							<div id="borda-6" className="bordas"><button id="jogo-6" className="jogos">F1 Race</button></div>
						</div>
						<nav>
							<button id="flt-1" className="flutuantes" 
							ref={el => {
					            if (el) {
					              el.style.setProperty('top', (flt[0].y+"px"), 'important');
					              el.style.setProperty('left', (flt[0].x+"px"), 'important');
					            }
					     	 }}>Perfil</button>
							<button id="flt-2" className="flutuantes" 
							ref={el => {
					            if (el) {
					              el.style.setProperty('top', (flt[1].y+"px"), 'important');
					              el.style.setProperty('left', (flt[1].x+"px"), 'important');
					            }
					     	 }}>Estatisticas</button>
							<button id="flt-3" className="flutuantes" 
							ref={el => {
					            if (el) {
					              el.style.setProperty('top', (flt[2].y+"px"), 'important');
					              el.style.setProperty('left', (flt[2].x+"px"), 'important');
					            }
					     	 }}>Transferencias</button>
							<button id="flt-4" className="flutuantes" 
							ref={el => {
					            if (el) {
					              el.style.setProperty('top', (flt[3].y+"px"), 'important');
					              el.style.setProperty('left', (flt[3].x+"px"), 'important');
					            }
					     	 }}>Documentacao</button>						
						</nav>
						<button onClick={moverButoes}>Algo</button>
					</div>
					{conteudo}
				</div>
			</div>
		)		
	}

	return (
		<div>
			{/*retirar esse useState*/}
			<div style={{"display": display}}>
				<title>Tela do Casino</title>
				<Menu />
				{/*<div>
					<div id="cortina-l"></div>
					<div id="cortina-r"></div>
				</div> */}
			</div>
			{conteudo}
		</div>
	)
}

export default Casino;
