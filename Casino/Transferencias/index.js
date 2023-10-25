import "./styles.css";
import { useState, useEffect, React } from "react";
import Casino from "../index.js";

function Transferencias() {
	
	const [conteudo,setConteudo] = useState("");
	const [display,setDisplay] = useState("block");

	return (
		<div>
			{/*retirar esse useState*/}
			<div style={{"display": display}}>
				<title>Tela da Transferencias</title>
				<h1>Somos las Transferencias</h1>
			</div>
			{conteudo}
		</div>
	)
}

export default Transferencias;
