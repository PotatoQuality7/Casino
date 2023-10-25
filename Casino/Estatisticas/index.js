import "./styles.css";
import { useState, useEffect, React } from "react";
import Casino from "../index.js";

function Estatisticas() {
	
	const [conteudo,setConteudo] = useState("");
	const [display,setDisplay] = useState("block");

	return (
		<div>
			{/*retirar esse useState*/}
			<div style={{"display": display}}>
				<title>Tela da Estatisticas</title>
				<h1>Somos las Estatisticas</h1>
			</div>
			{conteudo}
		</div>
	)
}

export default Estatisticas;
