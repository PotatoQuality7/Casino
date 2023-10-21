import './styles.css';
import { useState } from 'react';
import Casino from '../Casino/index.js';

function Login() {
	
	var time = 100;
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

	function ArcadeMaquininha() {

		const [display, setDisplay] = useState("block");
		const [conteudo, setConteudo] = useState("");

		setTimeout(() => {
			setDisplay("none");
			if (logado != "true")
				setConteudo(<Maquininha />);
			 else
				setConteudo(<Casino />);
		}, time)

		return (
			<div>
				<div style={{"display": display }}>
				<h1>Arcade e Maquininha Laser</h1>
				<h2 style={{"display": logado == "true"? "block" : "none"}}>Autenticado com sucesso</h2>
				<h2 style={{"display": logado == "false"? "block" : "none"}}>Falha na autenticacao</h2>
				</div>
				{conteudo}
			</div>
			
		)
	}

	function Maquininha() {
		
		const [display, setDisplay] = useState("block");
		const [conteudo, setConteudo] = useState("");

		setTimeout(() => {
			setDisplay("none");
			setConteudo(<TelaLogin />);
		}, time)
		
		return (
			<div>
				<h1 style={{"display": display}}>Maquininha Laser</h1>
				{conteudo}
			</div>
		)
	}

	function TelaLogin() {

		const [nome,setNome] = useState("Algoo");
		const [conteudo,setConteudo] = useState("");
		const [display,setDisplay] = useState("block");
		const [senha,setSenha] = useState("Algoo");

		const upNome = (e) => {
			setNome(e.target.value);
		}
	
		const upSenha = (e) => {
			setSenha(e.target.value);
		}

		function cadastrar() {
			setDisplay("none");
			setConteudo(<TelaCadastro />);
		}

		function logar() {
			setDisplay("none");
			setConteudo(<Tokenizador />);
		}

		return (
			<div>
				<div style={{"display": display}}>
					<h1>Tela de Login</h1>
					
					<label>Nome do Jogador</label>
					<input type="text" onChange={upNome} />
					<label>Senha</label>
					<input type="password" onChange={upSenha} />
					<br />
					<button onClick={cadastrar}>Cadastrar-me</button>
					<button onClick={logar}>Login</button>
				</div>
				{conteudo}
			</div>
		)		
	}

	function TelaCadastro() {
		
		const [nome,setNome] = useState("");
		const [email,setEmail] = useState("");
		const [date,setDate] = useState("");
		const [senha,setSenha] = useState("");
		const [csenha,setCSenha] = useState("");
		const [conteudo,setConteudo] = useState("");
		const [display,setDisplay] = useState("block");

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
			setDisplay("none");
			setConteudo(<TelaLogin />);
		}
		
		function cadastrar() {
			setDisplay("none");
			setConteudo(<Tokenizador />);
		}

		return (
			<div>
				<div style={{"display": display}}>
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
				{conteudo}
			</div>
		)
	}

	function Tokenizador() {
		const [conteudo,setConteudo] = useState("");
		const [display,setDisplay] = useState("block");

		setTimeout(() => {
			setDisplay("none");
			setConteudo(<ArcadeMaquininha />);
			setLogado("true");
		}, time)

		return (
			<div>
				<div style={{"display": display}}>
					<h1>Tokenizador</h1>
				</div>
				{conteudo}
			</div>
		)
	}
	
	return (
		<div>
			<title>Tela de Login</title>
			<ArcadeMaquininha />
		</div>
	)
}

export default Login;
