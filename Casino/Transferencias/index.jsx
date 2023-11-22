import "./styles.css";
import Canvas from "./script.js";
import { useState, useEffect, React } from "react";
import Casino from "../index.jsx";

function Transferencias() {

	const [display,setDisplay] = useState("block");

	let trigged = false, pivo, prev, clog = true, operacao;
	var plataforma, biscoito, batata, trigo;
	let offset = -1, plata_permissao = true, bata_permissao = true;

	var error, erro = false, letras = "", letra = 0;

	let valorMax, valor, codigo, seguranca, validade, pin;	

	var intervalo = {
		caixa: 8, plataforma: 12
	};

	const voltar = (e) => {
		window.location= "/Casino";
	}

	const imagens = [
        require("../../Art/Armazem/Armazem Estatico.png"),
        require("../../Art/Armazem/Caixa.png"),
        require("../../Art/Armazem/Trabalhador.png"),
        require("../../Art/Armazem/Handrail.png"),
        require("../../Art/Armazem/Plataforma Base.png"),
        require("../../Art/Armazem/Plataforma Poste.png"),
        require("../../Art/Armazem/Lampada.png"),
        require("../../Art/Black.png"),
    ];

	function Menu() {


		const [cor1, setCor1] = useState("yellow");	
		const [cor2, setCor2] = useState("purple");	
		const [opacidade, setOpacidade] = useState(0.7);	

		const [caixa, setCaixa] = useState(
           {x: -210, y: 202}
        );

		const [trabalhador, setTrabalhador] = useState(
            {x: -355, y: 218}
        );

		const [poste, setPoste] = useState(
            {x: 690, y: 790, height: 10}//380
        );

		const [base, setBase] = useState(
            {x: 550, y: 719}//315
        );

		const animacaoBoard = (e) => {
			setCor1(cor1 == "yellow"? "purple" : "yellow");		
			setCor2(cor2 == "yellow"? "purple" : "yellow");		
		}

		const empurrarCaixa = (e) => {
			if (!bata_permissao || clog)
				return "";
			if (caixa.x == 602) {
				bata_permissao = false;
				plata_permissao = true;
				//clearInterval(batata);
				//plataforma = setInterval(moverPlataforma, intervalo.plataforma);
			}
			setCaixa({x: caixa.x+1, y: caixa.y});
			setTrabalhador({x: trabalhador.x+1, y: trabalhador.y});
			if (trabalhador.x == 1200) {
				clog = true;
				erro = true;
				error = "Operação concluída com sucesso. Tenha um bom dia.";
				trigo = setInterval(trig,50);
				setConteudo();	
			}
		}

		const moverPlataforma = (e) => {
			if (!plata_permissao || clog)
				return "";
			if (base.y == 720) {
				setTrabalhador({x: trabalhador.x, y: caixa.y});
				plata_permissao = false;
				bata_permissao = true;
//				clearInterval(plataforma);
//				batata = setInterval(empurrarCaixa, intervalo.caixa);
			}
			if (base.y == 312) {
				offset *= -1;	
				plata_permissao = false;
//				clearInterval(plataforma);				
			}			
			setPoste({x: poste.x, y: poste.y+offset, height: poste.height+(-offset)});
			setBase({x: base.x, y: base.y+offset});
			if (caixa.x == 603 && plata_permissao)
				setCaixa({x: 603, y: caixa.y+1});

		}

		useEffect(() => {
			valorMax = 500;
		}, []);

		useEffect(() => {
			plataforma = setInterval(moverPlataforma, intervalo.plataforma);
			return () => clearInterval(plataforma);
		}, [poste, base]);

		useEffect(() => {
			batata = setInterval(empurrarCaixa, intervalo.caixa);
			return () => clearInterval(batata);
		}, [trabalhador, caixa]);

		useEffect(() => {
			biscoito = setInterval(animacaoBoard, 60);
			return () => clearInterval(biscoito);
		}, [cor1, cor2]);

	const handleOperacao = (e) => {
		operacao = e.target.value;
		let placeholder = "Max: "+valorMax;
		if (operacao == "Depositar")
			placeholder = "";

setConteudo(
<div>
<h2>Insira o valor</h2>
<input type="number" placeholder={placeholder} value={valor} onChange={handleValor} />
<br />
<button onClick={handleCancelar}>Cancelar</button>
<button onClick={handleConfirmar}>Confirmar</button>
</div>
);
	}

	const handleCancelar = (e) => {
		valor = null;
setConteudo(
<div>
<h2>Selecione uma das opções:</h2>
<button onClick={handleOperacao} value="Depositar">Depositar</button>
<button onClick={handleOperacao} value="Levantar">Levantar</button>
</div>);
}

const handleConfirmar = (e) => {
if (valor == null) {
	error = "Opah, insira um valor.";
	erro = true;
	trigo = setInterval(trig,50);
	return "";
}
if (valor > valorMax && operacao == "Levantar") {
	error = "Levantamento impossível. Kampar comeu o seu dinheiro.";
	erro = true;
	trigo = setInterval(trig,50);
	setTimeout(() => {
		error = "Brincadeira. O seu saldo é menor que a quantia.";
		erro = true;
		trigo = setInterval(trig,50);
	},10000);
	valor = null;
	return "";
}

setConteudo(
<div>
<h2 id="titulo-2">Insira os detalhes do seu cartão</h2>
<div id="esquerdinha">
<label>Código do Cartão
<input type="number" placeholder="4321 1234 5678 9012" value={codigo} onChange={handleCodigo} />
</label>
<label>Número de Segurança
<input type="number" placeholder="123" value={seguranca} onChange={handleSeguranca} />
</label>
</div>
<div id="direitinha">
<label>Validade
<br />
<input type="date" placeholder="DD/MM/YYYY" value={validade} onChange={handleValidade} />
</label>
<label>PIN
<br />
<input type="number" placeholder="1234" value={pin} onChange={handlePIN} />
</label>
</div>
<div id="butoes">
<button onClick={handleCancelar}>Cancelar</button>
<button onClick={handleGo}>{operacao}</button>
</div>
</div>);
}

	const handleValor = (e) => {
		valor = e.target.value;
	}

	const handleCodigo = (e) => {
		codigo = e.target.value;
	}

	const handleSeguranca = (e) => {
		seguranca = e.target.value;
	}

	const handleValidade = (e) => {
		validade = e.target.value;
	}

	const handlePIN = (e) => {
		pin = e.target.value;
	}

	const handleGo = (e) => {
		if (codigo == null || seguranca == null || pin == null) {
			error = "Hmmmmmmm mmmmmmmm mmmm, chefia... Esses dados são quais?";
			erro = true;
			trigo = setInterval(trig,50);
			return "";
		}
		setOpacidade(0);
		clog = false;
	}

	const trig = (e) => {
		letras += error[letra++];
		if (letra == error.length) {
			clearInterval(trigo);
			setTimeout(() => {
				erro = false;
				letras = "";
				letra = 0;
			},3000);
		}
	}

const [conteudo, setConteudo] = useState(
<div>
<h2>Selecione uma das opções:</h2>
<button onClick={handleOperacao} value="Depositar">Depositar</button>
<button onClick={handleOperacao} value="Levantar">Levantar</button>

</div>

);	

		return (
			<div id="tela-borda" ref={el => {
		            if (el) {
					  let pattern = "repeating-linear-gradient(-45deg, "+cor1+" 5px, "+cor1+", "+cor2+" 10px, "+cor2+", "+cor1+" 15px)";
		              el.style.setProperty("background", pattern, 'important'); }}}>
				<div id="tela">
					
					<img className="imagens" id="background" src={imagens[0]} />
					<img className="imagens" id="poste" src={imagens[5]} ref={el => {
	                    if (el) {
	                      el.style.setProperty('top', (poste.y+"px"), 'important');
	                      el.style.setProperty('left', (poste.x+"px"), 'important');
	                      el.style.setProperty('height', (poste.height+"px"), 'important');
                    }}} />
					<img className="imagens" id="base" src={imagens[4]} ref={el => {
	                    if (el) {
	                      el.style.setProperty('top', (base.y+"px"), 'important');
	                      el.style.setProperty('left', (base.x+"px"), 'important');
                    }}} />
					<img className="imagens" id="trabalhador" src={imagens[2]} ref={el => {
	                    if (el) {
	                      el.style.setProperty('top', (trabalhador.y+"px"), 'important');
	                      el.style.setProperty('left', (trabalhador.x+"px"), 'important');
                    }}} />
					<img className="imagens" id="caixa" src={imagens[1]} ref={el => {
	                    if (el) {
	                      el.style.setProperty('top', (caixa.y+"px"), 'important');
	                      el.style.setProperty('left', (caixa.x+"px"), 'important');
                    }}} />

					<img className="imagens" id="handrail" src={imagens[3]} />
					<img className="imagens" id="black" src={imagens[7]} ref={el => {
	                    if (el) {
	                      el.style.setProperty('opacity', opacidade, 'important');
                    }}} />

						<h1 id="ttitulo">Transferências</h1>

				<div id="transferencias" style={{"display" : clog? "block" : "none"}}>
					<div style={{"display" : erro? "none" : "block"}}>
						<Canvas />
					</div>
					<div id="resto" style={{"display": clog? "block" : "none"}}>
						<div style={{"display" : erro? "none" : "block"}}>
							{conteudo}
						</div>
						<span id="aviso">
						{letras}
						</span>
					</div>
				</div>
					<button id="voltar" onClick={voltar}>Voltar</button>
				</div>
			</div>
		)		
	}

	return (
		<div>
			<title>Tela das Tranferencias</title>
			<Menu />
			<div>
                <div id="cortina-l"></div>
                <div id="cortina-r"></div>
            </div>
		</div>
	)

}

export default Transferencias;
