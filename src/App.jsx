import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login, Register, Info, Debugging, UpdateProfile, Inbox, ChatPage } from "./pages/_index";
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
          <Route path="/inbox" element={<RequireAuth><Inbox /></RequireAuth>} />
          <Route element={<RequireAuth><ChatPage /></RequireAuth>} path="/chat/:id" />
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
      <li><a href={"/"}>Home</a></li>
      {<li><a href={"/debugging"}>Debugging</a></li>}
      {!currentUser && <li><a href="/login">Login</a></li>}
      {!currentUser && <li><a href="/register">Register</a></li>}
      {currentUser && <li><a href="/inbox">Inbox</a></li>}
      {currentUser && <li><a href={"/info"} >Info</a></li>}
      {currentUser && <li><a href={"/edit"}>Edit Account</a></li>}
      {currentUser && <li><a href={"/login"} onClick={() => dispatch({ type: "LOGOUT" })}>Logout</a></li>}
    </nav>
  );
}



function Error404() {
  return (
    <div className="error404">
      <h1>404</h1>
      <h2>Page not found</h2>
      <a href={"/"}>Go To Home</a>
    </div>
  );
}


function Home() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="home" style={{ textAlign: "center" }}>
      {currentUser ? <h2>Welcome {currentUser.displayName}</h2> : <h1>Hello</h1>}
    </div>
  );
}