import "./styles.css";
import { useState, useEffect, React } from "react";
import Casino from "../index.jsx";

function Documentacao() {
	
	const [conteudo,setConteudo] = useState("");
	const [display,setDisplay] = useState("block");

	return (
		<div>
			{/*retirar esse useState*/}
			<div style={{"display": display}}>
				<title>Tela da Documentacao</title>
				<h1>Soy la Documentacion</h1>
			</div>
			{conteudo}
		</div>
	)
}

export default Documentacao;
