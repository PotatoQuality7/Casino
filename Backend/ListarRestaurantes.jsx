import React, { Component, useState, useEffect } from 'react';
import Usuarioservice from '../services/Usuarioservice.js';
import App from '../App.js';

function ListarUsuarios() {
	const [Usuarios, setUsuarios] = useState(
		[4,5,6],
	);
	const [clientes, setClientes] = useState();

	const menu = [
		"Queijo com Fiambre",
		"Palony com Pao",
		"Pao com Pao",
		"Ovo estrelado",
		"Pizza verde",
		"Algodao doce",
		"Peixe-boi",
		"Cabrito empanado",
		"Rodelas de tomate",
	];

	const [display, setDisplay] = useState("block");		
	const [displayD, setDisplayD] = useState("none");		
	const [selecionado, setSelecionado] = useState("");		
	const [permissao, setPermissao] = useState("false");		
	const [nome, setNome] = useState();
    const [localizacao, setLocalizacao] = useState();
	const [tipo, setTipo] = useState();
    const [idade, setIdade] = useState();
	const [avaliacao, setAvaliacao] = useState("block");		
	const [detalhes, setDetalhes] = useState("block");		
	const [precoMin, setPrecoMin] = useState("block");		
	const [precoMax, setPrecoMax] = useState("block");		
	const [estrelas, setEstrelas] = useState();		

	var biscoito;

	const imagens = [
		require("../Imagens/foto-1.jpg"),
		require("../Imagens/foto-2.jpg"),
		require("../Imagens/foto-3.jpg"),
		require("../Imagens/foto-4.jpg"),
		require("../Imagens/foto-1.jpg"),
		require("../Imagens/foto-2.jpg"),
		require("../Imagens/foto-3.jpg"),
		require("../Imagens/foto-4.jpg"),
	];

	const check = (e) => {
		clearInterval(biscoito);
		setPermissao("true");
		console.log("aqui");
	}

	useEffect(() => {
		biscoito = setInterval(check, 1000);
		return () => clearInterval(biscoito);
	}, [Usuarios]);

	useEffect(() => {
		Usuarioservice.getUsuarios().then((res) => {
			setUsuarios(res.data);
			/*res.data.forEach((item) => {
				alert(item.localizacao);
			});*/
		});;
	}, []);
		
	const detalharRestaurante = (e) => {
		setSelecionado(e.target.value);
		setDisplay("none");
		var temp = [...Usuarios];
        setNome(temp[e.target.value-1].nome);
        setTipo(temp[e.target.value-1].tipo);
        setLocalizacao(temp[e.target.value-1].localizacao);
        setDetalhes(temp[e.target.value-1].detalhes);
        setEstrelas(temp[e.target.value-1].estrelas);
        setPrecoMin(temp[e.target.value-1].preco_minimo);
        setPrecoMax(temp[e.target.value-1].preco_max);
        setAvaliacao(temp[e.target.value-1].avaliacao);
	}

	const avaliar = (e) => {
		setAvaliacao("none");
	}

	const voltarDetalhes = (e) => {
		setSelecionado("");
		setDisplay("block");
	}

	const campoAvaliacao = (e) => {
		setDisplayD("block");
	}

	const handleNome = (e) => {
        setNome(e.target.value);
    }

    const handleTipo = (e) => {
        setTipo(e.target.value);
    }

	const handleDetalhes = (e) => {
        setDetalhes(e.target.value);
    }

    const handleLocalizacao = (e) => {
        setLocalizacao(e.target.value);
    }

    const handlePrecoMin = (e) => {
        setPrecoMin(e.target.value);
    }

    const handlePrecoMax = (e) => {
        setPrecoMax(e.target.value);
    }

    const handleEstrelas = (e) => {
        setEstrelas(e.target.value);
    }

    const handleAvaliacao = (e) => {
        setAvaliacao(e.target.value);
    }

	const salvar = (e) => {
        alert("Salvo");
        let temp = [...Usuarios];
        temp[selecionado-1].nome = nome;
        temp[selecionado-1].tipo = tipo;
        temp[selecionado-1].localizacao = localizacao;
        temp[selecionado-1].preco_minimo = precoMin;
        temp[selecionado-1].preco_maximo = precoMax;
        temp[selecionado-1].detalhes = detalhes;
        temp[selecionado-1].avaliacao = avaliacao;
        temp[selecionado-1].estrelas = estrelas;
        setUsuarios(temp);
        setDisplay("block");
    }
	

	return (
			<div>
				<div style={{"display": display}}>
					<div style={{"display": permissao == "true"? "block" : "none"}}>
								<h2>Lista de Usuarios</h2>
								<table>
									<thead>
										<tr>
											<th>ID</th>
											<th>Nome</th>
											<th>Tipo</th>
											<th>Localizacao</th>
											<th>Preco Minimo</th>
											<th>Preco Maximo</th>
											<th>Foto</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
									{
										Usuarios.map(
											restaurante =>
											<tr key = {restaurante.id}>
												<td> {restaurante.id} </td>
												<td> {restaurante.nome} </td>
												<td> {restaurante.tipo} </td>
												<td> {restaurante.localizacao} </td>
												<td> {restaurante.precoMin} </td>
												<td> {restaurante.precoMax} </td>
												<td> <img src={imagens[restaurante.id]} style={{"width": "40px"}} /> </td>
												<button value={restaurante.id} onClick={detalharRestaurante}>Ver</button>
											</tr>
										)
									}
									</tbody>
								</table>
						</div>
				</div>

				<div style={{"display": display == "block"? "none" : "block"}}>
					<br/>
					{
						Usuarios.map(
							restaurante =>
							<div key = {restaurante.id} style={{"display": restaurante.id == selecionado? "block" : "none"}}>
								<img src={imagens[restaurante.id]} style={{"width": "400px"}} />
								<p> Nome: {nome} </p>
								<input type="text" value={nome} onChange={handleNome} />
								<p> Tipo: {tipo} </p>
								<input type="text" value={tipo} onChange={handleTipo} />
								<p> Localizacao: {localizacao} </p>
								<input type="text" value={localizacao} onChange={handleLocalizacao} />
								<p> Detalhes: {detalhes} </p>
								<input type="text" value={detalhes} onChange={handleDetalhes} />
								<p> Preco Minimo: {precoMin} </p>
								<input type="number" value={precoMin} onChange={handlePrecoMin} />
								<p> Preco Maximo: {precoMax}] </p>
								<input type="number" value={precoMax} onChange={handlePrecoMax} />
								<div id="avaliacao">
									<label>Estrelas
										<input type="number" onChange={handleEstrelas} value={estrelas} />
									</label>
									<br/>
									<textarea placeholder="O que achou sobre esse restaurante?" onChange={handleAvaliacao} >{avaliacao}
									</textarea>
								</div>
								<button onClick={salvar}>Salvar</button>
								<button  onClick={voltarDetalhes}>Voltar</button>
							</div>
						)
					}
				</div>
			</div>
		)
}

export default ListarUsuarios;
