import axios from 'axios';

const JOGADOR_API_BASE_URL = "http://localhost:8080/demo";
//const JOGO_API_BASE_URL = "http://localhost:8081/demo";

class JogadorService {

	getJogadores() {
		return axios.get(JOGADOR_API_BASE_URL+"/findAll");
	}
	
	adicionarJogador(jogador) {
		return axios.post(JOGADOR_API_BASE_URL+"/add", jogador);
	}
}

export default new JogadorService();
