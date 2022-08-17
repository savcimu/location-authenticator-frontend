import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './Home';

const Header=()=>{
  
  const [user, setUser] = useState('');
  useEffect(()=>{
    var userName = localStorage.getItem('userName');
    setUser(userName);
  },
  [])

  const Logout = () => {
    localStorage.clear();
  }

    return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
     
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to='/' className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to='/login' className="nav-link active">Login</Link>
          </li>
          <li className="nav-item">
          <Link to='/register' className="nav-link active">Register</Link>
          </li>
        </ul>
        <span className="navbar-text">
        {user ? " Welcome:" : ""} {user} {user ? <Link to='/Login' onClick={Logout}>Logout</Link> : ""} 
          
        </span>
      </div>
    </div>
  </nav>
  )
}

export default Header;