import "./styles.css";
import Canvas from "./script.js";
import { useState, useEffect, React } from "react";
import Casino from "../index.jsx";

function Transferencias() {

	const [conteudo,setConteudo] = useState("");
	const [display,setDisplay] = useState("block");

	const [conteudoM,setConteudoM] = useState("");
	const [displayM,setDisplayM] = useState("block");

	let trigged = false, pivo, prev;
	var algo, biscoito, batata;

	const voltar = (e) => {
		setConteudo(<Casino />);
		setDisplay("block");
	}

	const imagens = [
        require("../../Art/foto-1.jpg"),
    ];

	function Menu() {

		const [cor1, setCor1] = useState("yellow");	
		const [cor2, setCor2] = useState("purple");	

		const animacaoBoard = (e) => {
			setCor1(cor1 == "yellow"? "purple" : "yellow");		
			setCor2(cor2 == "yellow"? "purple" : "yellow");		
		}

		const voltarM = (e) => {
			setDisplayM("block");
			setConteudoM("");		
		}

		useEffect(() => {
			biscoito = setInterval(animacaoBoard, 60);
			return () => clearInterval(biscoito);
		}, [cor1, cor2]);

		return (
			<div id="tela-borda" ref={el => {
		            if (el) {
					  let pattern = "repeating-linear-gradient(-45deg, "+cor1+" 5px, "+cor1+", "+cor2+" 10px, "+cor2+", "+cor1+" 15px)";
		              el.style.setProperty("background", pattern, 'important'); }}}>
				<div id="tela">
					
					<h1 id="titulo">Transferências</h1>

					<button id="voltar" onClick={voltar}>Voltar</button>
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
			</div>
			{conteudo}
		</div>
	)

}

export default Transferencias;
