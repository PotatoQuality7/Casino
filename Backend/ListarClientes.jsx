import React, { Component, useState, useEffect } from 'react';
import clienteservice from '../services/RestauranteService.js';
import App from '../App.js';

function ListarClientes() {

	const [display, setDisplay] = useState("block");
	const [selecionado, setSelecionado] = useState();
	const [permissao, setPermissao] = useState("false");
	const [nome, setNome] = useState();
	const [idade, setIdade] = useState();
	const [clientes, setClientes] = useState(
		[4,5,6],
	);
	
	var biscoito;
	const check = (e) => {
		clearInterval(biscoito);
		setPermissao("true");
	}

	useEffect(() => {
		biscoito = setInterval(check, 1000);
		return () => clearInterval(biscoito);
	}, [clientes]);

	useEffect(() => {
		clienteservice.getClientes().then((res) => {
			setClientes(res.data);
		});
	}, []);


	const voltarDetalhes = (e) => {
		setDisplay("block");
	}

	const detalharCliente = (e) => {
		setSelecionado(e.target.value);
		setDisplay("none");
		var temp = [...clientes];
		console.log("aqui");
		setNome(temp[e.target.value-1].nome);
		setIdade(temp[e.target.value-1].idade);
	}
		
	const handleNome = (e) => {
		setNome(e.target.value);
	}

	const handleIdade = (e) => {
		setIdade(e.target.value);
	}

	const salvar = (e) => {
		alert("Salvo");
		let temp = [...clientes];
		temp[selecionado-1].nome = nome; 
		temp[selecionado-1].idade = idade;
		setClientes(temp); 
		setDisplay("block");
	}
	
	return (
			<div>
				<div style={{"display": display}}>
					<div style={{"display": permissao == "true"? "block" : "none"}}>
								<h2>Lista de Clientes</h2>
								<table>
									<thead>
										<tr>
											<th>ID</th>
											<th>Nome</th>
										</tr>
									</thead>
									<tbody>
									{
										clientes.map(
											cliente =>
											<tr key = {cliente.id}>
												<td> {cliente.id} </td>
												<td> {cliente.nome} </td>
												<button value={cliente.id} onClick={detalharCliente}>Logar</button>
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
						clientes.map(
							cliente =>
							<div key = {cliente.id} style={{"display": cliente.id == selecionado? "block" : "none"}}>
								<p> ID: {cliente.id} </p>
								<p> Nome: {nome} </p>
								<input type="text" value={nome} onChange={handleNome} />
								<p> Idade: {idade} </p>
								<input type="number" value={idade} onChange={handleIdade} />
								<p> Avaliacoes: {cliente.avaliacao} </p>
								<p> Solicitacao: {cliente.solicitacao} </p>
								<button onClick={salvar}>Salvar</button>
								<button  onClick={voltarDetalhes}>Voltar</button>
							</div>
						)
					}
				</div>
			</div>
		)
}

export default ListarClientes;
