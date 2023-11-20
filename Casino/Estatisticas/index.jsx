import "./styles.css";
import JogadorService from '../../Backend/services/JogadorService.js';
import Canvas from "./script.js";
import Grafico from "./grafico.js";
import { useState, useEffect, React } from "react";

function Estatisticas() {

	var biscoito, id = [];

	let valores = [], colunas = 12;
	let unir = false;

	const voltar = (e) => { 
		window.location = "/Casino";
	}

	function Menu() {
		const [conteudo, setConteudo] = useState();
		const [valor, setValor] = useState();
		const [jogos, setJogos] = useState(
			[4,5,6],
		);
		const [csenha, setCSenha] = useState("");
		const [senha, setSenha] = useState("");
		const [multiplicador, setMultiplicador] = useState(0);

		useEffect(() => {
			JogadorService.getJogos().then((res) => {
				setJogos(res.data);
				gerarValores(res.data.length);
	        });
	    }, []);

		const [cor1, setCor1] = useState("yellow");	
		const [cor2, setCor2] = useState("purple");	

	    function gerarValores(tamanho) {
			let val = 10000;
	        let temp;
	    	for (let i = 0; i < tamanho; i++) {
				temp = [];
		        for (let j = 0; j < colunas; j++) {
		            temp.push({y: Math.trunc(Math.random()*(val*2))-val, x: j});
		        }
		        valores.push(JSON.parse(JSON.stringify(temp)));
			}
			valores.push(JSON.parse(JSON.stringify(temp)));
	    }

		function salvar() {
			if (csenha != senha) {
				alert("Senha errada");
				return "No soccess";
			}	
			//let jogos = {id: id, nome: nome, email: email, senha: senha, saldo: 0, imagem: imagem, lingua: lingua, animacao: animacao, som: som, valores: valores};
            console.log("jogos => "+JSON.stringify(jogos));
            /*JogadorService.adicionarJogos(jogos).then(res => {
                alert("Ye boi");
            });*/
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

		const handleChange = (e) => {
			unir = e.target.value == "unir"? !unir : unir;
			if (e.target.value != "unir") {
				let opah = false;
				let temp = [];
				for (let i = 0; i < id.length; i++) {
					if (id[i] != e.target.value)
						temp.push(id[i]);
					else
						opah = true;
				}		
				if (!opah)
					temp.push(e.target.value);
				id = temp;
			}
			setConteudo(<Grafico idd={id} valores={valores} colunas={colunas} unir={unir} />);	
		};
		
		return (
			<div id="tela-borda" ref={el => {
		            if (el) {
					  let pattern = "repeating-linear-gradient(-45deg, "+cor1+" 5px, "+cor1+", "+cor2+" 10px, "+cor2+", "+cor1+" 15px)";
		              el.style.setProperty("background", pattern, 'important'); }}}>
				<div id="tela">
						<Canvas />
						<div>
							<h1 id="etitulo">Estatísticas</h1>
<div id="econtainer">
<div id="break-even"></div>
{conteudo}
{valor}
</div>
	<div id="chave">
		{
		    jogos.map(
		        jogo =>
		        <section key = {jogo.id}>
					<input type="checkbox" name="jogo" value={jogo.id} onChange={handleChange} />
		            <label style={{"display": "inline-block"}}> {jogo.nome} </label>
					<div style={{"display": "inline-block"}} className="ecor" id={"ecor-"+jogo.id}></div>
					<br />
		        </section>
		    )
		}
		<input type="checkbox" name="unir" value="unir" onChange={handleChange} />
	   	<label style={{"display": "inline-block"}}>Unir</label>
		<div style={{"display": "inline-block"}} className="ecor" id="ecor-7"></div>
	</div>

							<button id="voltar" onClick={voltar}>Voltar</button>
						</div>
				</div>
			</div>
		)		
	}

	return (
		<div>
			<title>Tela do Estatisticas</title>
			<Menu />
		</div>
	)

}

export default Estatisticas;
