import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ChatPage, LoginForm, RegisterForm, Info, Debugging, ChatRoom } from "./pages/pages";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login/:id" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/chatRoom/:id" element={<ChatRoom />} />
        <Route path="/info" element={<Info />} />
        <Route path="/debugging" element={<Debugging />} />

        <Route path="*" element={<div>page not found (404)</div>} />
      </Routes>
    </Router>
  );
}


function Navigation() {
  const navstyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "10vh",
  };
  const [user] = useAuthState(auth);
  return (
    <nav style={navstyle}>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/chat">Chat</Link>
      <Link to={"/info"} >Info</Link>
      <Link to={"/debugging"}>Debugging</Link>
      {user ? <Link to="/login" style={{ cursor: "pointer" }} onClick={() => auth.signOut()}>Logout</Link> : null}
    </nav>
  );
}



