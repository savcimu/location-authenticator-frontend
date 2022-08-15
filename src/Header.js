import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
const Header=()=>{
    return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <Link to='/' className="navbar-brand">App</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
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
          Welcome
        </span>
      </div>
    </div>
  </nav>
  )
}

export default Header;