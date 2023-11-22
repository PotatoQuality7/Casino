import "./styles.css";
import JogadorService from '../../../Backend/services/JogadorService.js';
import Torres from "./script.js";
import { useState, useEffect, React } from "react";

function TorreBlocos() {

	const [conteudo,setConteudo] = useState("");
	const [display,setDisplay] = useState("block");

	var biscoito, image;
	console.log("Aqui");

	const voltar = (e) => { 
		window.location = "/Casino";
	}

	function Menu() {

		const [cor1, setCor1] = useState("yellow");	
		const [cor2, setCor2] = useState("purple");	

		function salvar() {	
			let jogador = {id: jogador.id, nome: jogador.nome, email: jogador.email, senha: jogador.senha, saldo: jogador.saldo, imagem: jogador.imagem, lingua: jogador.lingua, animacao: jogador.animacao, som: jogador.som, valores: jogador.valores};
            console.log("jogador => "+JSON.stringify(jogador));
            JogadorService.adicionarJogador(jogador).then(res => {
                alert("Ye boi");
            });
			return "soccess";
		}
		
		const animacaoBoard = (e) => {
			setCor1(cor1 == "yellow"? "purple" : "yellow");		
			setCor2(cor2 == "yellow"? "purple" : "yellow");		
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
						<Torres />
				</div>
			</div>
		)		
	}

	return (
		<div>
			<title>Tela do TorreBlocos</title>
			<Menu />
		</div>
	)

}

export default TorreBlocos;
