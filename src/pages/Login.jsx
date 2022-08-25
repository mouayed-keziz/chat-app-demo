import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase"
import { AuthContext } from "../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const loginHandler = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                getDoc(doc(db, "users", user.uid)).then((docSnap) => {
                    if (docSnap.exists()) {
                        //console.log("Document data:", docSnap.data());
                        user.displayName = docSnap.data().displayName;
                        user.photoURL = docSnap.data().photoURL;
                        dispatch({ type: "LOGIN", payload: user });
                        navigate("/");
                    } else {
                        console.log("No such document!");
                        setError(true);
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                    setError(true);
                });
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                setError(true);
            });
    }

    return (
        <div className="login">
            <h3>Login</h3>
            <form onSubmit={loginHandler}>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="email" />
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="password" />
                <button type="submit">Login</button>
                {error && <span className="error">Something went wrong!</span>}
            </form>
        </div>
    );
}