import './styles.css';
import { useState } from 'react';
import Casino from '../Casino/index.jsx';

function Login() {
	
	var time = 2000;
	const [display, setDisplay] = useState("block");
	const [conteudo, setConteudo] = useState("");
/*	const [nome, setNome] = useState("");
	const [email, setEmail] = useState("");
	const [date, setDate] = useState("");
	const [senha, setSenha] = useState("");
	const [csenha, setCSenha] = useState("");
	*/const [logado, setLogado] = useState("");/*

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
	}*/

	function entrar() {
		//alert("Hello");
		setDisplay("none");
		setConteudo(<Casino />);		
	}

	function ArcadeMaquininha() {

		const [displayL, setDisplayL] = useState("block");
		const [conteudoL, setConteudoL] = useState("");

		setTimeout(() => {
			setDisplayL("none");
			if (logado != "true")
				setConteudoL(<Maquininha />);
			 else
				entrar();
		}, time)

		return (
			<div>
				<div style={{"display": displayL }}>
				<h1>Arcade e Maquininha Laser</h1>
				<h2 style={{"display": logado == "true"? "block" : "none"}}>Autenticado com sucesso</h2>
				<h2 style={{"display": logado == "false"? "block" : "none"}}>Falha na autenticacao</h2>
				</div>
				{conteudoL}
			</div>
			
		)
	}

	function Maquininha() {
		
		const [displayL, setDisplayL] = useState("block");
		const [conteudoL, setConteudoL] = useState("");

		setTimeout(() => {
			setDisplayL("none");
			setConteudoL(<TelaLogin />);
		}, time)
		
		return (
			<div>
				<h1 style={{"display": displayL}}>Maquininha Laser</h1>
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
			setDisplayL("none");
			setConteudoL(<Tokenizador />);
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
