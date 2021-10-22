import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';

import './app.css';

// Obtengo el code de la URL
const code = new URLSearchParams(window.location.search).get('code');

const App = () => {
  return code ? <Dashboard code={code} /> : <Login/>
}

export default App;
