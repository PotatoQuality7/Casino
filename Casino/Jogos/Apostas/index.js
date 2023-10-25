import { useState } from "react";
import Login from "../Login/index.js";
import React from "react";
import "./styles.css";

import TorreBlocos from "./TorreBlocos/index.js";
import Bounce from "./Bounce/index.js";
import Cobrinha from "./Cobrinha/index.js";
import DungeonShip from "./DungeonShip/index.js";
import F1Race from "./F1Race/index.js";
import SkatePong from "./SkatePong/index.js";
import Tetris from "./Tetris/index.js";

function Apostas() {
	
	const [conteudo,setConteudo] = useState("");
	const [display,setDisplay] = useState("block");

	const torre = (e) => {
		setDisplay("none");
		setConteudo(<TorreBlocos />);		
	}

	const tetris = (e) => {
		setDisplay("none");
		setConteudo(<Tetris />);		
	}

	const skate = (e) => {
		setDisplay("none");
		setConteudo(<SkatePong />);		
	}

	const snake = (e) => {
		setDisplay("none");
		setConteudo(<Cobrinha />);		
	}

	const bounce = (e) => {
		setDisplay("none");
		setConteudo(<Bounce />);		
	}

	const f1 = (e) => {
		setDisplay("none");
		setConteudo(<F1Race />);		
	}

	return (
		<div>
			<div>
				<h1
				<div id="borda-1" className="bordas"><button id="jogo-1" className="jogos" onClick={torre}>Torre de Blocos</button></div>
				<div id="borda-2" className="bordas"><button id="jogo-2" className="jogos" onClick={tetris}>Tetris</button></div>
				<div id="borda-3" className="bordas"><button id="jogo-3" className="jogos" onClick={skate}>SkatePong</button></div>
				<div id="borda-4" className="bordas"><button id="jogo-4" className="jogos" onClick={snake}>Snake</button></div>
				<div id="borda-5" className="bordas"><button id="jogo-5" className="jogos" onClick={bounce}>Bounce</button></div>
				<div id="borda-6" className="bordas"><button id="jogo-6" className="jogos" onClick={f1}>F1 Race</button></div>
				
				<section>
					<label>Aposta</label>
				
				</section>
			</div>
			{conteudo}
		</div>
	)
}

export default Apostas;
