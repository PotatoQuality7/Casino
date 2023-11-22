import "./styles.css";
import jogador from "../../Login/index.jsx";
import JogadorService from '../../Backend/services/JogadorService.js';
import Canvas from "./script.js";
import { useState, useEffect, React } from "react";

function Perfil() {

	const [conteudo,setConteudo] = useState("");
	const [display,setDisplay] = useState("block");

	var biscoito, image;
	console.log("Aqui");

	const voltar = (e) => { 
		window.location = "/Casino";
	}

	function Menu() {

		const [jogador,setJogador] = useState("");
		const [id,setId] = useState("");
		const [nome,setNome] = useState("");
		const [email,setEmail] = useState("");
		const [imagem,setImagem] = useState("");
		const [date,setDate] = useState("");
		const [senha,setSenha] = useState("");
		const [csenha,setCSenha] = useState("");
		const [lingua,setLingua] = useState("");
		const [animacao,setAnimacao] = useState();
		const [som,setSom] = useState();
		const [valores,setValores] = useState("");

		const [mudanca, setMudanca] = useState(false);

	useEffect(() => {
		JogadorService.getJogadores().then((res) => {
            res.data.forEach((jgr) => {
                //if (jgr.id == 115) {
					setJogador(jgr);
					setId(jgr.id);
					setNome(jgr.nome);
					setEmail(jgr.email);
					setSenha(jgr.senha);
					setImagem(jgr.imagem);
					setLingua(jgr.lingua);
					setAnimacao(jgr.animacao);
					setValores(jgr.valores);
					setSom(jgr.som);
					image = require('../../Art/Cool Background.png');			
                //};
            });
        });
    }, []);

		const [cor1, setCor1] = useState("yellow");	
		const [cor2, setCor2] = useState("purple");	

		const upNome = (e) => {
			setNome(e.target.value);
			setMudanca(true);
		}
		
		const upEmail = (e) => {
			setEmail(e.target.value);
			setMudanca(true);
		}

		const upSenha = (e) => {
			setSenha(e.target.value);
			setMudanca(true);
		}

		const upCSenha = (e) => {
			setCSenha(e.target.value);
		}

		const upLingua = (e) => {
			setLingua(e.target.value);
		}

		const upAnimacao = (e) => {
			setAnimacao(e.target.value);
		}

		const upSom = (e) => {
			setSom(e.target.value);
		}

		function salvar() {
			if (csenha != senha) {
				alert("Senha errada");
				return "No soccess";
			}	
			let jogador = {id: id, nome: nome, email: email, senha: senha, saldo: 0, imagem: imagem, lingua: lingua, animacao: animacao, som: som, valores: valores};
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
						<Canvas />
						<div>
							<h1 id="titulo">Perfil</h1>
							<div id="foto">
								<img src={image} />
								<button>Editar</button>
							</div>
							<div id="detalhes">
								<div className="labels">
									<label id="lnome">Nome de Jogador</label>
				                    <input className="campos" type="text" value={nome} onChange={upNome} />
								</div>
			                    <div className="labels">
									<label id="lemail">E-Mail</label>
									<input className="campos" type="text" value={email} onChange={upEmail} />
								</div>		                 
								<div className="labels">
									<label id="lsenha">Senha</label>
									<input className="campos" type="password" value={senha} onChange={upSenha} />
								</div>
							{/*	<div className="labels">
									<label id="lcsenha">Confirmar Senha</label>
									<input className="campos" type="password" value={csenha} onChange={upCSenha} />
								</div> */}
							</div>

							<div id="configuracoes">
								<div className="labels" id="animacao">
									<label style={{"display": "inline-block"}} id="lanimacao">Animações</label>
									<button id="on" value="on">ON</button>
									<button id="off" value="off">OFF</button>
								</div>			
								<br />
			                    <div className="labels">
									<label id="lsom">Som</label>
									<input type="number" onChange={upSom} />
								</div>		                 
								<div id="lingua">
									<div>
										<button className="linguas" id="lingua-1">Português</button>
										<button className="linguas" id="lingua-2">Inglês</button>
										<button className="linguas" id="lingua-3">Xanghana</button>
									</div>
									<div id="bola">Língua</div>
								</div>
							</div>
							<button id="voltar" onClick={voltar}>Voltar</button>
							<div id="confirmacao" style={{"display": mudanca? "block" : "none"}}>
								<button id="salvar" onClick={salvar}>Salvar</button>
								<input id="iconfirmacao" type="password" onChange={upCSenha} placeholder="Senha, boss"/>
							</div>
						</div>
				</div>
			</div>
		)		
	}

	return (
		<div>
			<title>Tela do Perfil</title>
			<Menu />
			<div>
                <div id="cortina-l"></div>
                <div id="cortina-r"></div>
            </div>
		</div>
	)

}

export default Perfil;
