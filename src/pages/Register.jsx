import { useState } from "react";
import { RegisterWithFirebase } from "../actions/user_action";
import { RegisterWithGoogle } from "../actions/user_action";

export default function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerHandler = (e) => {
        e.preventDefault();
        RegisterWithFirebase(email, password, username);
    }

    return (
        <div className="login">
            <div className="login">
                <h3>Register</h3>
                <form className="loginForm" onSubmit={registerHandler}>
                    <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="username" />
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="email" />
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="password" />
                    <button type="submit">Register</button>
                    <button onClick={RegisterWithGoogle}>Register with google</button>
                </form>

            </div>
        </div>
    );
}