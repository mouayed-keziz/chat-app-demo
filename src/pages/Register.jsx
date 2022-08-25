import { useContext, useState } from "react";
import { auth, db } from "../firebase";
import { setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const registerHandler = async (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setDoc(doc(db, "users", user.uid), {
                    displayName: username,
                    uid: user.uid,
                    email: user.email,
                    photoURL: user.photoURL,
                });
                user.displayName = username;
                console.log(user);
                dispatch({ type: "LOGIN", payload: user });
                navigate("/");
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }

    const GoogleHandeler = async (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)  // signInWithRedirect(provider)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setDoc(doc(db, "users", user.uid), {
                    displayName: user.displayName,
                    uid: user.uid,
                    email: user.email,
                    photoURL: user.photoURL,
                });
                dispatch({ type: "LOGIN", payload: user });
                navigate("/");
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            }
            );
    }

    return (
        <div className="login card">
            <div className="login">
                <h3>Register</h3>
                <form className="loginForm" onSubmit={registerHandler}>
                    <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="username" />
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="email" />
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="password" />
                    <button type="submit">Register</button>
                    <button onClick={GoogleHandeler}>Register with google</button>
                </form>
            </div>
        </div>
    );
}