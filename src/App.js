import './App.css';
import Header from './Header';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
  <Router>
    <div class='container'>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}  />
        <Route path="/login" element={<Login/>}  />
        <Route path="/register" element={<Register/>}  />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
