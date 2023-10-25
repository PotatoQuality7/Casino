import "./styles.css";
import { useState, useEffect, React } from "react";
import Casino from "../index.js";

function Perfil() {
	
	const [conteudo,setConteudo] = useState("");
	const [display,setDisplay] = useState("block");

	return (
		<div>
			{/*retirar esse useState*/}
			<div style={{"display": display}}>
				<title>Tela da Perfil</title>
				<h1>Soy el Perfil</h1>
			</div>
			{conteudo}
		</div>
	)
}

export default Perfil;
