import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { Login, Register, Info, Debugging, UpdateProfile } from "./pages/_index";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

export default function App() {

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return (currentUser ? children : <Navigate to={"/login"} />);
  }

  const RequireNoAuth = ({ children }) => {
    return (currentUser ? <Navigate to={"/"} /> : children);
  }


  return (
    <Router>
      <Navigation />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<RequireNoAuth><Login /></RequireNoAuth>} />
          <Route path="/register" element={<RequireNoAuth><Register /></RequireNoAuth>} />
          <Route path="/info" element={<RequireAuth><Info /></RequireAuth>} />
          <Route path="/edit" element={<RequireAuth><UpdateProfile /></RequireAuth>} />
          <Route path="/debugging" element={<Debugging />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </Router>
  );
}


function Navigation() {
  const { currentUser, dispatch } = useContext(AuthContext);
  return (
    <nav className="nav">
      <li><Link to={"/"}>Home</Link></li>
      {!currentUser && <li><Link to="/login">Login</Link></li>}
      {!currentUser && <li><Link to="/register">Register</Link></li>}

      {currentUser && <li><Link to="/chat">Chat</Link></li>}
      {currentUser && <li><Link to={"/info"} >Info</Link></li>}
      <li><Link to={"/debugging"}>Debugging</Link></li>
      {currentUser && <li><Link to={"/edit"}>Edit Account</Link></li>}
      {currentUser && <li><Link to={"/login"} onClick={() => dispatch({ type: "LOGOUT" })}>Logout</Link></li>}
    </nav>
  );
}



function Error404() {
  return (
    <div className="error404">
      <h1>404</h1>
      <h2>Page not found</h2>
      <Link to={"/"}>Go To Home</Link>
    </div>
  );
}


function Home() {
  return (
    <div className="home">
      <h1>Home</h1>
    </div>
  );
}