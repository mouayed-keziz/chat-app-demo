import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { Login, Register, Info, Debugging } from "./pages/_index";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
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

  console.log("currentuserr : " + currentUser);

  return (
    <Router>
      <Navigation />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<RequireNoAuth><Login /></RequireNoAuth>} />
          <Route path="/register" element={<RequireNoAuth><Register /></RequireNoAuth>} />
          <Route path="/info" element={<RequireAuth><Info /></RequireAuth>} />
          <Route path="/debugging" element={<Debugging />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </Router>
  );
}


function Navigation() {
  const [user] = useAuthState(auth);
  return (
    <nav className="nav">
      <li><Link to={"/"}>Home</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/chat">Chat</Link></li>
      <li><Link to={"/info"} >Info</Link></li>
      <li><Link to={"/debugging"}>Debugging</Link></li>
      {user ? <Link to="/login" style={{ cursor: "pointer" }} onClick={() => auth.signOut()}>Logout</Link> : null}
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