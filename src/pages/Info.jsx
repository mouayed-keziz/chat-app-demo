import { auth } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Info() {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (user == null) {
            navigate("/login");
        }
    }, [navigate, user]);
    if (user) return (
        <div className="login">
            <h3>{user.uid}</h3>
            <h3>{user.displayName}</h3>
            <h3>{user.email}</h3>
        </div>
    );
}