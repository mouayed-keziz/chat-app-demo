import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"
import { AuthContext } from "../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const loginHandler = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch({ type: "LOGIN", payload: user });
                navigate("/");
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    return (
        <div className="login">
            <h3>Login</h3>
            <form onSubmit={loginHandler}>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="email" />
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}