import './styles.css';
import { useEffect, useState } from 'react';
import { createGlobalState } from 'react-hooks-global-state';
import Casino from '../Casino/index.jsx';
import JogadorService from '../Backend/services/JogadorService.js';

function Login() {
	
	var time = 5500;
	const [display, setDisplay] = useState("block");
	const [conteudo, setConteudo] = useState("");
	const [jogador, setJogador] = useState();
	const [nome, setNome] = useState("");
	const [email, setEmail] = useState("");
	const [date, setDate] = useState("");
	const [imagem, setImagem] = useState("../Art/Cool Background");
	const [senha, setSenha] = useState("");
	const [csenha, setCSenha] = useState("");
	const [logado, setLogado] = useState(2);

	var flashar, zoom, zooom, toggle = false;
	
	const imagens = [
	    require("../Art/Tela Inicio/Tela Inicio.png"),
	    require("../Art/Tela Inicio/Insira moeda.png"),
	    require("../Art/Tela Inicio/Moeda rejeitada.png"),
	    require("../Art/Tela Inicio/Welcome.png"),
	    require("../Art/Tela Inicio/Tela 1.png"),
	    require("../Art/Tela Inicio/Tela 2.png"),
	];

	const upNome = (e) => {
		setNome(e.target.value);
	}	

	const upEmail = (e) => {
		setEmail(e.target.value);
	}	

	const upDate = (e) => {
		setDate(e.target.value);
	}	

	const upSenha = (e) => {
		setSenha(e.target.value);
	}	

	const upCSenha = (e) => {
		setCSenha(e.target.value);
	}	

	const [algo, setAlgo] = useState("");
	const change = (e) => {
		setAlgo(e.target.value);
	}

	function entrar() {
		//alert("Hello");
		window.location = "/Casino";
		/*setDisplay("none");
		setConteudo(<Casino />);*/
	}

	function ArcadeMaquininha() {

		const [displayL, setDisplayL] = useState("block");
		const [conteudoL, setConteudoL] = useState("");
		const [imagem, setImagem] = useState(<img id="insira-mo" src={imagens[1]} />);
		const [zoomer, setZoomer] = useState(
            {x: 0, y: 0, width: 1900, height: 1000},
		);
	
		const [alerta, setAlerta] = useState(
            {x: 850, y: 410, width: 120, height: 80},
		);

		function zoomar() {
			if (logado != "true")
				return "";
			setZoomer(
				{x: zoomer.x-1.9, y: zoomer.y-1.4, width: zoomer.width+4.7, height: zoomer.height+3.8},
			);
			setAlerta(
				{x: alerta.x+0.05, y: alerta.y+0, width: alerta.width+0.6, height: alerta.height+0.14},
			);
		}

		useEffect(() => {
            zoom = setInterval(zoomar, 6);
            return () => clearInterval(zoom);
        }, [zoomer]);

		setTimeout(() => {
			setDisplayL("none");
			if (logado != "true")
				setConteudoL(<Maquininha />);
			 else {
				if (logado == "true") {
					setTimeout(() => {
						entrar();
					},5000);
				}
			 }
		}, time)

		useEffect(() => {
            flashar = setInterval(flash, 500);
            return () => clearInterval(flashar);
        }, [toggle]);


		function flash() {
			toggle = !toggle;
			if (toggle) {
				if (logado == "true") {
					setImagem(<img id="insira-mo" src={imagens[3]} ref={el => {
	                if (el) {
	                  el.style.setProperty('top', (alerta.y+"px"), 'important');
	                  el.style.setProperty('left', (alerta.x+"px"), 'important');
	                  el.style.setProperty('width', (alerta.width+"px"), 'important');
	                  el.style.setProperty('height', (alerta.height+"px"), 'important');
                	}}} />);

				}
				 else
				   if (logado == "false")
					setImagem(<img id="insira-mo" src={imagens[2]} />);
				 else
				  setImagem(<img id="insira-mo" src={imagens[1]} />);
			}
			else
			  setImagem("");
		}

		return (
			<div>
				<div style={{"display": displayL }}>
					<img id="arcade-maq" src={imagens[0]} ref={el => {
	                if (el) {
	                  el.style.setProperty('top', (zoomer.y+"px"), 'important');
	                  el.style.setProperty('left', (zoomer.x+"px"), 'important');
	                  el.style.setProperty('width', (zoomer.width+"px"), 'important');
	                  el.style.setProperty('height', (zoomer.height+"px"), 'important');
                	}}} />
					{imagem}
				</div>
				{conteudoL}
			</div>
			
		)
	}

	function Maquininha() {
		
		const [displayL, setDisplayL] = useState("block");
		const [conteudoL, setConteudoL] = useState("");

		const [zoomer, setZoomer] = useState(
            {x: 0, y: 0, width: 1900, height: 1000},
		);

		const [alerta, setAlerta] = useState(
            {x: 840, y: 385, width: 150, height: 80},
		);
		
		function zoomar() {
			setZoomer(
				{x: zoomer.x-2.37, y: zoomer.y-1, width: zoomer.width+2.9, height: zoomer.height+2},
			);
			setAlerta(
				{x: alerta.x-1.3, y: alerta.y-0.23, width: alerta.width+0.4, height: alerta.height+0.08},
			);
		}

		useEffect(() => {
            zoom = setInterval(zoomar, 6);
            return () => clearInterval(zoom);
        }, [zoomer]);

		setTimeout(() => {
			setDisplayL("none");
			setConteudoL(<TelaLogin />);
		}, time)
		
		return (
			<div>
				<img style={{"display": displayL}} id="zoomer" src={imagens[0]} ref={el => {
	                if (el) {
	                  el.style.setProperty('top', (zoomer.y+"px"), 'important');
	                  el.style.setProperty('left', (zoomer.x+"px"), 'important');
	                  el.style.setProperty('width', (zoomer.width+"px"), 'important');
	                  el.style.setProperty('height', (zoomer.height+"px"), 'important');
                }}} />
                <img style={{"display": displayL}} id="zoomer" src={imagens[logado == 2? 1 : 2]} ref={el => {
	                if (el) {
	                  el.style.setProperty('top', (alerta.y+"px"), 'important');
	                  el.style.setProperty('left', (alerta.x+"px"), 'important');
	                  el.style.setProperty('width', (alerta.width+"px"), 'important');
	                  el.style.setProperty('height', (alerta.height+"px"), 'important');
                }}} />
				{conteudoL}
			</div>
		)
	}

	function TelaLogin() {

		const [nome,setNome] = useState("Algoo");
		const [conteudoL,setConteudoL] = useState("");
		const [displayL,setDisplayL] = useState("block");
		const [senha,setSenha] = useState("Algoo");

		const upNome = (e) => {
			setNome(e.target.value);
		}
	
		const upSenha = (e) => {
			setSenha(e.target.value);
		}

		function cadastrar() {
			setDisplayL("none");
			setConteudoL(<TelaCadastro />);
		}

		function logar() {
			JogadorService.getJogadores().then((res) => {
				console.log(res.data);
				setLogado("false");   
	         	res.data.forEach((jgr) => {
	                if (nome == jgr.nome && senha == jgr.senha) {
						setLogado("true");
						setJogador(jgr);
				};
	            });
        	});
/*			setDisplayL("none");
			setConteudoL(<Tokenizador />);*/
		}

		return (
			<div>
				<div style={{"display": displayL}}>
					<h1>Tela de Login</h1>
					
					<label>Nome do Jogador</label>
					<input type="text" onChange={upNome} />
					<label>Senha</label>
					<input type="password" onChange={upSenha} />
					<br />
					<button onClick={cadastrar}>Cadastrar-me</button>
					<button onClick={logar}>Login</button>
				</div>
				{conteudoL}
			</div>
		)		
	}

	function TelaCadastro() {
		
		const [nome,setNome] = useState("");
		const [email,setEmail] = useState("");
		const [date,setDate] = useState("");
		const [senha,setSenha] = useState("");
		const [csenha,setCSenha] = useState("");
		const [conteudoL,setConteudoL] = useState("");
		const [displayL,setDisplayL] = useState("block");

		const upNome = (e) => {
			setNome(e.target.value);
		}
	
		const upEmail = (e) => {
			setEmail(e.target.value);
		}

		const upDate = (e) => {
			setDate(e.target.value);
		}

		const upSenha = (e) => {
			setSenha(e.target.value);
		}

		const upCSenha = (e) => {
			setCSenha(e.target.value);
		}

		function voltar() {
			setDisplayL("none");
			setConteudoL(<TelaLogin />);
		}
		
		function cadastrar() {
			let jogador = {nome: nome, email: email, senha: senha, saldo: 0, imagem: imagem, lingua: "pt", animacao: true, som: 100, valores: [[0,0],[0,0],[0,0]]};
				console.log("jogador => "+JSON.stringify(jogador));
				JogadorService.adicionarJogador(jogador).then(res => {
					alert("Cadastrado com sucesso");
				});

			setDisplayL("none");
			setConteudoL(<Tokenizador />);
		}

		return (
			<div>
				<div style={{"display": displayL}}>
					<h1>Tela de Cadastro</h1>
					<label>Nome de Jogador</label>
					<input type="text" onChange={upNome} />
					<label>E-Mail</label>
					<input type="text" onChange={upEmail} />
					<label>Data de Nascimento</label>
					<input type="date" onChange={upDate} />
					<label>Senha</label>
					<input type="password" onChange={upSenha} />
					<label>Confirmar Senha</label>
					<input type="password" onChange={upCSenha} />
					<br />
					<button onClick={voltar}>Voltar</button>
					<button onClick={cadastrar}>Cadastrar-me</button>
				</div>
				{conteudoL}
			</div>
		)
	}

	function Tokenizador() {
		const [conteudoL,setConteudoL] = useState("");
		const [displayL,setDisplayL] = useState("block");

		setTimeout(() => {
			setDisplayL("none");
			setConteudoL(<ArcadeMaquininha />);
			setLogado("true");
		}, time)

		return (
			<div>
				<div style={{"display": displayL}}>
					<h1>Tokenizador</h1>
				</div>
				{conteudoL}
			</div>
		)
	}
	
	return (
		<div>
			<title>Tela de Login</title>
			<div style={{"display": display}}>
				<ArcadeMaquininha />
			</div>
			{conteudo}
		</div>
	)
}

export default Login;
