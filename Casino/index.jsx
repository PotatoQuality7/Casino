import "./styles.css";
import Canvas from "./script.js";
import { useState, useEffect, React } from "react";
import JogadorService from '../Backend/services/JogadorService.js';

function Casino() {

	const [conteudo, setConteudo] = useState("");
	const [display, setDisplay] = useState("block");

	const [conteudoM, setConteudoM] = useState("");
	const [displayM, setDisplayM] = useState("block");
	const [conta, setConta] = useState("root");

	var atual = 0, image;
	var limite = 0;
	var dir = [];
	var adjust = [
		[0,0],
		[0,0],
		[0,0],
		[0,0],
		[0,0],
	];

	const docks = [
		[245,240],//Torre
		[15,15],//Tetris
		[440,15],//Skate
		[440,715],//Snake
		[15,380],//Bounce
		[15,715],//F1
	];

	var metas = [
		[0,0],
		[0,0],
		[0,0],
		[0,0],
		[0,0],
		[0,0],
	];
	
	var movimentoFator = [
		[0,0],
		[0,0],
		[0,0],
		[0,0],
		[0,0],
		[0,0],
	];

	var movimentoHops = [
		[0,0],
		[0,0],
		[0,0],
		[0,0],
		[0,0],
		[0,0],
	];

	let tamanho = [
		200, 200, 200, 200, 200, 200,
	];

	const metaTamanho = [450,200];
	let tamanhoFator = [0,0]; //0 = in, 1 = out

	let trigged = false, pivo, prev;
	var algo, biscoito, batata;

	const logout = (e) => {
		/*setConteudo(<Login />);
		setDisplay("none");*/
		window.location = "/";
	}
		
	const buttonClick = (e) => {
		//setDisplay("none");
		switch (e.target.value) {
			case "perfil": window.location = "./Casino/Perfil";
						   break;
			case "estatisticas": window.location = "./Casino/Estatisticas";
						  		 break;
			case "historico": window.location = "./Casino/Historico";
						  		 break;
			case "transferencias": window.location = "./Casino/Transferencias";
						   		   break;
			case "documentacao": window.location = "./Casino/Documentacao";
						   		 break;
		}
	}

	const voltar = (e) => {
		setConteudoM("");
		setDisplayM("block");
	}

	function Menu() {

		const [jogo,setJogo] = useState("");
		const [jogador,setJogador] = useState("");
		const [nome,setNome] = useState("");
		const [hax,setHax] = useState(115);
		const [descricao,setDescricao] = useState("");
		const [multiplicador,setMultiplicador] = useState("");
		const [imagem,setImagem] = useState("");
		const [cor1, setCor1] = useState("yellow");	
		const [cor2, setCor2] = useState("purple");	

		const [escolhido, setEscolhido] = useState();

		const [flt, setFlt] = useState([
			{x: -120, y: 500},
			{x: 520, y: -30},
			{x: 520, y: 975},
			{x: 1176, y: 500},
			{x: 1176, y: 500},
		]);

		const [caixinha, setCaixinha] = useState([
			{x: 180, y: 280},
			{x: 490, y: 280},
			{x: 800, y: 280},
			{x: 180, y: 580},
			{x: 490, y: 580},
			{x: 800, y: 580},
		]);

		const [duracao, setDuracao] = useState([0,0]);
					

		const animacaoBoard = (e) => {
			setCor1(cor1 == "yellow"? "purple" : "yellow");		
			setCor2(cor2 == "yellow"? "purple" : "yellow");		
		}

		function gerarDirecoes() {
			dir = [];
			let x, y;
			for (let i = 0; i <= 4; i++) {
				x = (Math.trunc(Math.random()*3)-1);
				y = (Math.trunc(Math.random()*3)-1);
				if (x == 0 && y == 0)
					i--;
				 else
					dir.push([x,y]);
			}
			atual = 0;
			limite = Math.trunc((Math.random() * 151) + 150);//original: 51+250
			//setDuracao([(Math.trunc(Math.random() * 15) + 10),32]);
		}

		const moverButoes = (e) => {
			if (atual == limite) {
				gerarDirecoes();
			}
			for (let i = 0; i <= 4; i++) {
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
				{x: (flt[4].x+dir[4][0]+adjust[4][0]), y: (flt[4].y+dir[4][1]+adjust[4][1])},
			]);
			atual++;
			//setDuracao([duracao[0],++duracao[1]]);
		}

		const voltarM = (e) => {
			setDisplayM("block");
			setConteudoM("");		
		}

		const jogar = (e) => {
			setDisplayM("none");
			switch (escolhido) {
				case "0": window.location = "./Casino/Jogos/TorreBlocos"; break;		
				case "1": window.location = "./Casino/Jogos/Tetris"; break;		
				case "2": window.location = "./Casino/Jogos/SkatePong"; break;		
				case "3": window.location = "./Casino/Jogos/Cobrinha"; break;		
				case "4": window.location = "./Casino/Jogos/Bounce"; break;		
				case "5": window.location = "./Casino/Jogos/F1Race"; break;		
			}
		}

		useEffect(() => {
			JogadorService.getJogadores().then((res) => {
                res.data.forEach((jgr) => {
                    if (hax == jgr.id) {
                        setJogador(jgr);
                    };
                });
            });

		}, []);

		useEffect(() => {
			biscoito = setInterval(animacaoBoard, 60);
			return () => clearInterval(biscoito);
		}, [cor1, cor2]);

		useEffect(() => {
			algo = setInterval(moverButoes, 20);//original = 30
			return () => clearInterval(algo);
		}, [flt]);

		useEffect(() => {
			batata = setInterval(deslocar, 1);
			return () => clearInterval(batata);
		}, [caixinha]);

		function determinarMovimento(i) {
			let time = 150;
			movimentoFator[i][0] = ((caixinha[i].x-metas[i][0]) * -1)/time;
			movimentoFator[i][1] = ((caixinha[i].y-metas[i][1]) * -1)/time;
			movimentoHops[i][0] = time;
		}

		function determinarTamanho() {
			tamanhoFator[0] = (metaTamanho[0]-metaTamanho[1])/movimentoHops[pivo][0];
			if (prev != null) {
				tamanhoFator[1] = (metaTamanho[1]-metaTamanho[0])/movimentoHops[prev][0];
			}
		}
		
		function manipularTamanho(i) {
			tamanho[i] += i == pivo? tamanhoFator[0] : tamanhoFator[1];
//			if (tamanho[i] > metaTamanho[0])
//				tamanho[i] = metaTamanho[0];
		}

		const trig = (e) => {
			if ((e.target.value == pivo || trigged == true) && prev != null)
				return "";
			prev = pivo;
			pivo = e.target.value;
			setEscolhido(pivo);
			JogadorService.getJogos().then((res) => {
	            res.data.forEach((jgr) => {
	                if (jgr.id-1 == pivo) {
	                    setJogo(jgr);
	                    setNome(jgr.nome);
	                    setDescricao(jgr.descricao);
	                    setMultiplicador(jgr.multiplicador);
	                    setImagem(jgr.imagem);
	                    image = require('../Art/Cool Background.png');
	                };
	            });
	        });

			trigged = true; 
			let temp = [1,2,3,4,5];
			metas[pivo][0] = docks[0][0]
			metas[pivo][1] = docks[0][1];
			movimentoHops[pivo][0] = 0;
			movimentoHops[pivo][1] = 0;
			determinarMovimento(pivo);				
			let j, k = 0;
			for (let i = 4; i >= 0; i--) {
				j = Math.trunc(Math.random()*(i+1));
				if (k == pivo)
					k++;
				metas[k][0] = docks[ temp[j] ][0];
				metas[k][1] = docks[ temp[j] ][1];
				movimentoHops[k][0] = 0;
				movimentoHops[k][1] = 0;
				determinarMovimento(k);
				k++;				
				let t = temp[i];
				temp[i] = temp[j];
				temp[j] = t;
			}
			determinarTamanho();
		}

		const deslocar = (e) => {
			if (trigged == false)
				return "";
			let movimento = false;
            for (let i = 0; i <= 5; i++) {
                if (movimentoHops[i][0] != movimentoHops[i][1]) {//y e x terminam ao mesmo tempo
            		movimentoHops[i][1]++;
				 	movimento = true;
					if (i == pivo || i == prev)
						manipularTamanho(i);
				}
				else {
					movimentoFator[i][0] = 0;
					movimentoFator[i][1] = 0;
					caixinha[i].x = metas[i][0];
					caixinha[i].y = metas[i][1];
				}
            }
			setCaixinha([
				{x: (caixinha[0].x+movimentoFator[0][0]), y: (caixinha[0].y+movimentoFator[0][1])},
				{x: (caixinha[1].x+movimentoFator[1][0]), y: (caixinha[1].y+movimentoFator[1][1])},
				{x: (caixinha[2].x+movimentoFator[2][0]), y: (caixinha[2].y+movimentoFator[2][1])},
				{x: (caixinha[3].x+movimentoFator[3][0]), y: (caixinha[3].y+movimentoFator[3][1])},
				{x: (caixinha[4].x+movimentoFator[4][0]), y: (caixinha[4].y+movimentoFator[4][1])},
				{x: (caixinha[5].x+movimentoFator[5][0]), y: (caixinha[5].y+movimentoFator[5][1])},
			]);

			if (movimento == false) {
				trigged = false;
				clearInterval(batata);
			}
			
		}
		return (
			<div id="tela-borda" ref={el => {
		            if (el) {
					  let pattern = "repeating-linear-gradient(-45deg, "+cor1+" 5px, "+cor1+", "+cor2+" 10px, "+cor2+", "+cor1+" 15px)";
		              el.style.setProperty("background", pattern, 'important'); }}}>
				<div id="tela">
						<Canvas />
						<div>
							<h1 id="ctitulo">Casino</h1>
							<button id="power" onClick={logout}>POWER</button>
							<div>
								<div id="borda-1" className="cbordas" ref={el => {
						            if (el) {
						              el.style.setProperty('top', (caixinha[0].y+"px"), 'important');
						              el.style.setProperty('left', (caixinha[0].x+"px"), 'important');
						              el.style.setProperty('width', (tamanho[0]+"px"), 'important');
						              el.style.setProperty('height', (tamanho[0]+"px"), 'important');
						            }}}>
									<button id="cjogo-1" className="cjogos" value="0" onClick={trig}>Torre de Blocos</button>
								</div>
								<div id="borda-2" className="cbordas" ref={el => {
						            if (el) {
						              el.style.setProperty('top', (caixinha[1].y+"px"), 'important');
						              el.style.setProperty('left', (caixinha[1].x+"px"), 'important');
						              el.style.setProperty('width', (tamanho[1]+"px"), 'important');
						              el.style.setProperty('height', (tamanho[1]+"px"), 'important');
						            }}}>
									<button id="cjogo-2" className="cjogos" value="1" onClick={trig}>Tetris</button>
								</div>
								<div id="borda-3" className="cbordas" ref={el => {
						            if (el) {
						              el.style.setProperty('top', (caixinha[2].y+"px"), 'important');
						              el.style.setProperty('left', (caixinha[2].x+"px"), 'important');
						              el.style.setProperty('width', (tamanho[2]+"px"), 'important');
						              el.style.setProperty('height', (tamanho[2]+"px"), 'important');
						            }}}> 
									<button id="cjogo-3" className="cjogos" value="2" onClick={trig}>SkatePong</button>
								</div>
								<div id="borda-4" className="cbordas" ref={el => {
						            if (el) {
						              el.style.setProperty('top', (caixinha[3].y+"px"), 'important');
						              el.style.setProperty('left', (caixinha[3].x+"px"), 'important');
						              el.style.setProperty('width', (tamanho[3]+"px"), 'important');
						              el.style.setProperty('height', (tamanho[3]+"px"), 'important');
						            }}}> 
									<button id="cjogo-4" className="cjogos" value="3" onClick={trig}>Snake</button>
								</div>
								<div id="borda-5" className="cbordas" ref={el => {
						            if (el) {
						              el.style.setProperty('top', (caixinha[4].y+"px"), 'important');
						              el.style.setProperty('left', (caixinha[4].x+"px"), 'important');
						              el.style.setProperty('width', (tamanho[4]+"px"), 'important');
						              el.style.setProperty('height', (tamanho[4]+"px"), 'important');
						            }}}>
									<button id="cjogo-5" className="cjogos" value="4" onClick={trig}>Bounce</button>
								</div>
								<div id="borda-6" className="cbordas" ref={el => {
						            if (el) {
						              el.style.setProperty('top', (caixinha[5].y+"px"), 'important');
						              el.style.setProperty('left', (caixinha[5].x+"px"), 'important');
						              el.style.setProperty('width', (tamanho[5]+"px"), 'important');
						              el.style.setProperty('height', (tamanho[5]+"px"), 'important');
						            }}}>
									<button id="cjogo-6" className="cjogos" value="5" onClick={trig}>F1 Race</button></div>
								</div>
							</div>

							<nav>
								<button id="flt-1" className="flutuantes" value="perfil" onClick={buttonClick}
									ref={el => {
							            if (el) {
							              el.style.setProperty('top', (flt[0].y+"px"), 'important');
							              el.style.setProperty('left', (flt[0].x+"px"), 'important');
							            }
							     	 }}>Perfil</button>
								<button id="flt-2" className="flutuantes" value={"historico"} onClick={buttonClick}
									ref={el => {
							            if (el) {
							              el.style.setProperty('top', (flt[1].y+"px"), 'important');
							              el.style.setProperty('left', (flt[1].x+"px"), 'important');
							            }
								     	 }}>{"Histórico"}</button>
								<button id="flt-3" className="flutuantes" value="transferencias" onClick={buttonClick}
									ref={el => {
							            if (el) {
							              el.style.setProperty('top', (flt[2].y+"px"), 'important');
							              el.style.setProperty('left', (flt[2].x+"px"), 'important');
							            }
							     	 }}>Transferências</button>
								<button id="flt-4" className="flutuantes" value="documentacao" onClick={buttonClick}
									ref={el => {
							            if (el) {
							              el.style.setProperty('top', (flt[3].y+"px"), 'important');
							              el.style.setProperty('left', (flt[3].x+"px"), 'important');
							            }
							     	 }}>Documentação</button>						
								<button id="flt-5" className="flutuantes" value="estatisticas" onClick={buttonClick}
									ref={el => {
							            if (el) {
							              el.style.setProperty('top', (flt[4].y+"px"), 'important');
							              el.style.setProperty('left', (flt[4].x+"px"), 'important');
							            }
							    }}>Estatisticas</button>						
							</nav>

							<div style={{"display": escolhido == null? "none": "inline-block"}}x>
								<fieldset id="cdetalhes">
									<legend>{nome}</legend>
									<textarea id="cdescricao" value={descricao}>
										{descricao}
									</textarea>
									<form action="" method="POST">
											<label>Aposta</label>
											<div style={{"background": "yellow", "width": "150px","height": "40px"}}>
											<label id="aposta" style={{"display": "inline-block"}}>MZN</label>
												<input id="apostaField" name="aposta" type="number" placeholder={"MAX: "+jogador.saldo} required />
											</div>
										<button onClick={jogar}>Jogar</button>
										<button>Tutorial</button>
									</form>
								</fieldset>
							</div>						
				</div>
			</div>
		)		
	}

	return (
		<div>
			{/*retirar esse useState*/}
			<div style={{"display": display}}>
				<title>Tela do Menu</title>
				<div style={{"display": displayM}}>
					<Menu />
				</div>
				{conteudoM}
				<div>
                    <div id="cortina-l"></div>
                    <div id="cortina-r"></div>
                </div>				
				<div style={{"display": displayM == "block"? "none" : "block"}}>
					{/*<h1>Prosseguir?</h1>
						<button>Yes boss</button>
						<button>Cancelar</button>*/}
					<button onClick={voltar}>Voltar</button> 
				</div>
			</div>
			{conteudo}
		</div>
	)

}

export default Casino;
