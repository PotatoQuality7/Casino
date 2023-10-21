import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

var user = {
	name: "Alfrederico",
	idade: 21
}
var coisa = "";
var conteudo = "";

if (user.name == "Santino")
	coisa = <Tela1 />;
 else
	coisa = <Tela2 />;

function Tela1() {
	return (
		<div>
			<h1>Eu sou a Tela 1</h1>
			<h3>Bem-vindo, {user.name}!</h3>
		</div>
	)
}

function Tela2() {
	return (
		<div>
			<h1>Eu sou a Tela 2</h1>
			<h3>Como esta, {user.name}?</h3>
		</div>
	)
}

function Ola() {
	return (
		<div>
			<button className="bitao">
				Ola, sou um botao
			</button>
			{coisa}			
		</div>
	);
}


function Agua() {
	return (
		<div>
			<h4>Seu copo de refresco</h4>
		</div>
	)
}

function Refresco() {
	return (
		<div>
			<h4>Seu copo de refresco</h4>
		</div>
	)
}
var algo = "false";

const handleClick = (e) => {
	algo = "true";
	return algo;
}

function Ajuda() {
	return (
		<div>
			<br />
			<h2>Como podemos ajuda-lo?</h2>
			<button className="ajuda" onClick={Agua}>Agua</button>
			<button className="ajuda" onclick={Refresco}>Refresco</button>
			<br />
		</div>
	)
}


function App() {
	const [count,setCount] = useState(0);

	function Board() {
		return (
			<div>
				<button>1</button>
				<button>2</button>
				<button>3</button>
				<button>4</button>
				<button>5</button>
				<button>6</button>
				<button>7</button>
				<button>8</button>
				<button>9</button>
			</div>
		)
	}

	function incCount() {
		setCount(count + 1);
		return (
			<div>Hello</div>
		)
	}

	function decCount() {
		setCount(count - 1);
	}

	function Count() {
		return (
			<div>
				<button onClick={incCount}>Incrementar</button>
				<button onClick={decCount}>Decrementar</button>
			</div>
		)
	}

  return (
    <div className="App">
      <header className="App-header">
   {/*     <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
	<Ola />
	<Ajuda />
	<h3>Numero atual: {count}</h3>
	<Count />
	
	<Board />
      </header>
    </div>
  );
}

export default App;
