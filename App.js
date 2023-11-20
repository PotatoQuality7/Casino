import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import logo from './logo.svg';

import Login from './Login/index.jsx';
import Casino from './Casino/index.jsx';

import Perfil from "./Casino/Perfil/index.jsx";
import Estatisticas from "./Casino/Estatisticas/index.jsx";
import Historico from "./Casino/Historico/index.jsx";
import Transferencias from "./Casino/Transferencias/index.jsx";
import Documentacao from "./Casino/Documentacao/index.js";

import TorreBlocos from "./Casino/Jogos/TorreBlocos/index.js";
import Bounce from "./Casino/Jogos/Bounce/index.js";
import Cobrinha from "./Casino/Jogos/Cobrinha/index.js";
import DungeonShip from "./Casino/Jogos/DungeonShip/index.js";
import F1Race from "./Casino/Jogos/F1Race/index.js";
import SkatePong from "./Casino/Jogos/SkatePong/index.js";
import Tetris from "./Casino/Jogos/Tetris/index.js";

function App() {

  return (
    <div className="App">
		<Router>
     		 <header className="App-header">
				<Routes> localhost:3000/
					<Route path = "/" element={<Login/>} />
					<Route path = "/Casino" element={<Casino/>} />
                    <Route path = "/Casino/Perfil" element={<Perfil />} />
                    <Route path = "/Casino/Estatisticas" element={<Estatisticas />} />
                    <Route path = "/Casino/Historico" element={<Historico />} />
                    <Route path = "/Casino/Transferencias" element={<Transferencias />} />
                    <Route path = "/Casino/Documentacao" element={<Documentacao />} />
                    <Route path = "/Casino/Jogos/TorreBlocos" element={<TorreBlocos />} />
				</Routes>
				<div>
                    <div id="cortina-l"></div>
                    <div id="cortina-r"></div>
                </div>
     		 </header>
		</Router>
    </div>
  );
}

export default App;
