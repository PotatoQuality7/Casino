import logo from './logo.svg';
import './App.css';
import Login from './Login/index.jsx';
import Casino from './Casino/index.jsx';

function App() {

  return (
    <div className="App">
      <header className="App-header">
			<Casino />
				<div>
                    <div id="cortina-l"></div>
                    <div id="cortina-r"></div>
                </div>
      </header>
    </div>
  );
}

export default App;
