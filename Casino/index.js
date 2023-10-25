import "./styles.css";
import { useState, useEffect, React } from "react";
import Login from "../Login/index.js";

import Perfil from "./Perfil/index.js";
import Estatisticas from "./Estatisticas/index.js";
import Transferencias from "./Transferencias/index.js";
import Documentacao from "./Documentacao/index.js";
 
import TorreBlocos from "./Jogos/TorreBlocos/index.js";
import Bounce from "./Jogos/Bounce/index.js";
import Cobrinha from "./Jogos/Cobrinha/index.js";
import DungeonShip from "./Jogos/DungeonShip/index.js";
import F1Race from "./Jogos/F1Race/index.js";
import SkatePong from "./Jogos/SkatePong/index.js";
import Tetris from "./Jogos/Tetris/index.js";

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

	var docks = [
		[500,500],
		[0,0],
		[400,0],
		[0,100],
		[0,200],
		[0,500],
	];

	var metas = [
		[0,0],
		[0,0],
		[0,0],
		[0,0],
		[0,0],
		[0,0],
	];
	
	var shift = [
		[0,0],
		[0,0],
		[0,0],
		[0,0],
		[0,0],
		[0,0],
	];

	let trigged = false;
	const logout = (e) => {
		setConteudo(<Login />);
		setDisplay("none");
	}
	
	var algo, biscoito, batata;
	
	const buttonClick = (e) => {
		setDisplay("none");
		switch (e.target.value) {
			case "perfil": setConteudo(<Perfil />);
						   break;
			case "estatisticas": setConteudo(<Estatisticas />);
						   break;
			case "trans": setConteudo(<Transferencias />);
						   break;
			case "documentacao": setConteudo(<Documentacao />);
						   break;
		}
	}

	const voltar = (e) => {
		setConteudo("");
		setDisplay("block");
	}

	function Menu() {

		const [conteudoM,setConteudoM] = useState("");
		const [displayM,setDisplayM] = useState("block");

		const [nome,setNome] = useState("Algoo");
		const [senha,setSenha] = useState("Algoo");
		const [cor1, setCor1] = useState("yellow");	
		const [cor2, setCor2] = useState("purple");	

		const [flt, setFlt] = useState([
			{x: -120, y: 500},
			{x: 520, y: -30},
			{x: 520, y: 975},
			{x: 1176, y: 500},
		])

		const [caixinha, setCaixinha] = useState([
			{x: 180, y: 280},
			{x: 490, y: 280},
			{x: 800, y: 280},
			{x: 180, y: 580},
			{x: 490, y: 580},
			{x: 800, y: 580},
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

		const animacaoBoard = (e) => {
			setCor1(cor1 == "yellow"? "purple" : "yellow");		
			setCor2(cor2 == "yellow"? "purple" : "yellow");		
		}

		const moverButoes = (e) => {
			if (atual == limite) {
				gerarDirecoes();
			}
			for (let i = 0; i <= 3; i++) {
				adjust[i][0] = 0;
				adjust[i][1] = 0;
				switch (flt[i].x) {
					case -121: adjust[i][0] = 1296; break;
					case 1177: adjust[i][0] = -1296; break;			
				}
				switch (flt[i].y) {
					case -31: adjust[i][1] = 1005; break;
					case 976: adjust[i][1] = -1005; break;			
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

		const torre = (e) => {
			setDisplayM("none");
			setConteudoM(<TorreBlocos />);		
		}

		const tetris = (e) => {
			setDisplayM("none");
			setConteudoM(<Tetris />);		
		}

		const skate = (e) => {
			setDisplayM("none");
			setConteudoM(<SkatePong />);		
		}

		const snake = (e) => {
			setDisplayM("none");
			setConteudoM(<Cobrinha />);		
		}

		const bounce = (e) => {
			setDisplayM("none");
			setConteudoM(<Bounce />);		
		}

		const f1 = (e) => {
			setDisplayM("none");
			setConteudoM(<F1Race />);		
		}

		const voltarM = (e) => {
			setDisplayM("block");
			setConteudoM("");		
		}

		const trig = (e) => {
			let pivo = e.target.value;
			if (trigged == false) {
				trigged = true; 
				let temp = [1,2,3,4,5];
				metas[pivo][0] = docks[0][0]
				metas[pivo][1] = docks[0][1];
				let j, k = 0;
				for (let i = 4; i >= 0; i--) {
					j = Math.trunc(Math.random()*(i+1));
					if (k == pivo)
						k++;
					metas[k][0] = docks[ temp[j] ][0];
					metas[k++][1] = docks[ temp[j] ][1];
					let t = temp[i];
					temp[i] = temp[j];
					temp[j] = t;
				}
			}
			else
				alert("Assinalado");
		}

		useEffect(() => {
			biscoito = setInterval(animacaoBoard, 60);
			return () => clearInterval(biscoito);
		}, [cor1, cor2]);

		useEffect(() => {
			algo = setInterval(moverButoes, 30);
			return () => clearInterval(algo);
		}, [flt]);

		useEffect(() => {
			batata = setInterval(deslocar, 2000);
			return () => clearInterval(batata);
		}, [caixinha]);

		const deslocar = (e) => {
			if (trigged == false)
				return "";
			let movimento = false;
			for (let i = 0; i <= 5; i++) {
				shift[i][0] = 0;
				shift[i][1] = 0;
				if (caixinha[i].x != metas[i][0]) {
					shift[i][0] = caixinha[i].x < metas[i][0]? 1 : -1;
					movimento = true;
				}
				if (caixinha[i].y != metas[i][1]) {
					shift[i][1] = caixinha[i].y < metas[i][1]? 1 : -1;
					movimento = true;
				}
				
			}
			setCaixinha([
				{x: (caixinha[0].x+shift[0][0]), y: (caixinha[0].y+shift[0][1])},
				{x: (caixinha[1].x+shift[1][0]), y: (caixinha[1].y+shift[1][1])},
				{x: (caixinha[2].x+shift[2][0]), y: (caixinha[2].y+shift[2][1])},
				{x: (caixinha[3].x+shift[3][0]), y: (caixinha[3].y+shift[3][1])},
				{x: (caixinha[4].x+shift[4][0]), y: (caixinha[4].y+shift[4][1])},
				{x: (caixinha[5].x+shift[5][0]), y: (caixinha[5].y+shift[5][1])},
			]);
			if (movimento == false) {
				alert("Finito");
				clearInterval(batata);
			}
			
		}

		return (
			<div id="tela-borda" ref={el => {
		            if (el) {
					  let pattern = "repeating-linear-gradient(-45deg, "+cor1+" 5px, "+cor1+", "+cor2+" 10px, "+cor2+", "+cor1+" 15px)";
		              el.style.setProperty("background", pattern, 'important'); }}}>
				<div id="tela">
					<div style={{"display": displayM}}>
						<div>
							<h1>Casino</h1>
							<button onClick={logout}>POWER</button>
							<div id="borda-1" className="bordas" ref={el => {
					            if (el) {
					              el.style.setProperty('top', (caixinha[0].y+"px"), 'important');
					              el.style.setProperty('left', (caixinha[0].x+"px"), 'important');
					            }}}>
								<button id="jogo-1" className="jogos" value="0" onClick={trig}>Torre de Blocos</button>
							</div>
							<div id="borda-2" className="bordas" ref={el => {
					            if (el) {
					              el.style.setProperty('top', (caixinha[1].y+"px"), 'important');
					              el.style.setProperty('left', (caixinha[1].x+"px"), 'important');
					            }}}>
								<button id="jogo-2" className="jogos" value="1" onClick={trig}>Tetris</button>
							</div>
							<div id="borda-3" className="bordas" ref={el => {
					            if (el) {
					              el.style.setProperty('top', (caixinha[2].y+"px"), 'important');
					              el.style.setProperty('left', (caixinha[2].x+"px"), 'important');
					            }}}> 
								<button id="jogo-3" className="jogos" value="2" onClick={trig}>SkatePong</button>
							</div>
							<div id="borda-4" className="bordas" ref={el => {
					            if (el) {
					              el.style.setProperty('top', (caixinha[3].y+"px"), 'important');
					              el.style.setProperty('left', (caixinha[3].x+"px"), 'important');
					            }}}> 
								<button id="jogo-4" className="jogos" value="3" onClick={trig}>Snake</button>
							</div>
							<div id="borda-5" className="bordas" ref={el => {
					            if (el) {
					              el.style.setProperty('top', (caixinha[4].y+"px"), 'important');
					              el.style.setProperty('left', (caixinha[4].x+"px"), 'important');
					            }}}>
								<button id="jogo-5" className="jogos" value="4" onClick={trig}>Bounce</button>
							</div>
							<div id="borda-6" className="bordas" ref={el => {
					            if (el) {
					              el.style.setProperty('top', (caixinha[5].y+"px"), 'important');
					              el.style.setProperty('left', (caixinha[5].x+"px"), 'important');
					            }}}>
								<button id="jogo-6" className="jogos" value="5" onClick={trig}>F1 Race</button></div>
							</div>
						<nav>
							<button id="flt-1" className="flutuantes" value="perfil" onClick={buttonClick}
							ref={el => {
					            if (el) {
					              el.style.setProperty('top', (flt[0].y+"px"), 'important');
					              el.style.setProperty('left', (flt[0].x+"px"), 'important');
					            }
					     	 }}>Perfil</button>
							<button id="flt-2" className="flutuantes" value="estatisticas" onClick={buttonClick}
							ref={el => {
					            if (el) {
					              el.style.setProperty('top', (flt[1].y+"px"), 'important');
					              el.style.setProperty('left', (flt[1].x+"px"), 'important');
					            }
						     	 }}>Estatisticas</button>
							<button id="flt-3" className="flutuantes" value="trans" onClick={buttonClick}
							ref={el => {
					            if (el) {
					              el.style.setProperty('top', (flt[2].y+"px"), 'important');
					              el.style.setProperty('left', (flt[2].x+"px"), 'important');
					            }
					     	 }}>Transferencias</button>
							<button id="flt-4" className="flutuantes" value="documentacao" onClick={buttonClick}
							ref={el => {
					            if (el) {
					              el.style.setProperty('top', (flt[3].y+"px"), 'important');
					              el.style.setProperty('left', (flt[3].x+"px"), 'important');
					            }
					     	 }}>Documentacao</button>						
						</nav>
						<button onClick={moverButoes}>Algo</button>
						<button onClick={deslocar}>Trig</button>
					</div>
					{conteudoM}
					<button style={{"display": displayM == "none"? "block" : "none"}} onClick={voltarM}>VoltarM</button>
				</div>
			</div>
		)		
	}

	return (
		<div>
			{/*retirar esse useState*/}
			<div style={{"display": display}}>
				<title>Tela do Menu</title>
				<Menu />
				<div>
					<div id="cortina-l"></div>
					<div id="cortina-r"></div>
				</div>
			</div>
			<div style={{"display": display == "block"? "none" : "block"}}>
				{conteudo}
				<button onClick={voltar}>Voltar</button> 
			</div>
		</div>
	)
}

export default Casino;
