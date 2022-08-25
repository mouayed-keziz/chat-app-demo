
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export default function Debugging() {
    const { currentUser, dispatch } = useContext(AuthContext);

    return (
        <div className="login">
            <button onClick={() => console.log(currentUser)}>Log The User</button>
            <button>Logout</button>
            <button onClick={() => dispatch({ type: "LOGOUT" })}>Logout</button>
            <button onClick={() => dispatch({ type: "UPDATE_USER", payload: { displayName: "7emo" } })}>update user</button>
        </div >
    );
}