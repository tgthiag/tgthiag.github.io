import logo from './logo.svg';
import './App.css';
import Perfil from './pages/main';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Perfil/>
      </header>
    </div>
  );
}

export default App;
