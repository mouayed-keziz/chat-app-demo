import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Info() {

    const { currentUser } = useContext(AuthContext);


    return (
        <div>
            <div className="login">
                <h1>Info</h1>
                <h2>Current User</h2>
                <p><strong>username:</strong>{currentUser.displayName}</p>
                <p><strong>email:</strong>{currentUser.email}</p>
                <p><strong>uid:</strong>{currentUser.uid}</p>
                <br />
                {currentUser.photoURL && <img style={{ width: "200px", height: "200px" }} src={currentUser.photoURL} alt="profile" />}
                <button>
                    <Link style={{ textDecoration: "none", color: "white" }} to={"/edit"}>Edit Account Infos</Link>
                </button>
            </div>

        </div>
    );
}