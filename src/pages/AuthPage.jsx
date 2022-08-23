import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth"
import { loginWithFirebase, registerWithFirebase } from "../actions/user_action";
import { useNavigate } from "react-router-dom"
import { RegisterWithGoogle } from "../actions/user_action";

export function RegisterForm(props) {
    const [user] = useAuthState(auth);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerHandler = (e) => {
        e.preventDefault();
        registerWithFirebase(email, password, username);
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate("/chat");
        }
    }, [navigate, user]);

    return (
        <div className="login">
            <div className="login">
                <h3>Register</h3>
                <form className="loginForm" onSubmit={registerHandler}>
                    <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="username" />
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="email" />
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="password" />
                    <button type="submit">Register</button>
                </form>
            </div>

            <button onClick={RegisterWithGoogle}>Register with google</button>
        </div>
    );
}

export function LoginForm() {
    const [user] = useAuthState(auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const loginHandler = (e) => {
        e.preventDefault();
        loginWithFirebase(email, password, setError);
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            navigate("/chat/");
        }
    }, [navigate, user]);

    return (
        <div className="login">
            <h3>Login</h3>
            <form className="loginForm" onSubmit={loginHandler}>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="email" />
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="password" />
                <button type="submit">Login</button>
                {error ? <p style={{ color: "red" }}>Invalid email or password</p> : null}
            </form>
        </div>
    );
}

