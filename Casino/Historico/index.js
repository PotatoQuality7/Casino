import "./styles.css";
import { useState, useEffect, React } from "react";
import Casino from "../index.jsx";

function Historico() {
	
	const [conteudo,setConteudo] = useState("");
	const [display,setDisplay] = useState("block");

	return (
		<div>
			{/*retirar esse useState*/}
			<div style={{"display": display}}>
				<title>Tela da Historico</title>
				<h1>Soy el Historico</h1>
			</div>
			{conteudo}
		</div>
	)
}

export default Historico;
