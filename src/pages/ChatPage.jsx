import { auth } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllUsers } from "../actions/user_action";

export default function ChatPage() {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (user == null) {
            navigate("/login");
        }
    }, [navigate, user]);


    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        getAllUsers().then(res => {
            setContacts(res);
        });
    }, []);


    return (
        <div className="">
            {contacts.length > 0 ?
                <ul>
                    {contacts.map(element => {
                        return (
                            <li key={element.uid}>
                                <a href={"/chat/" + element.uid}>{element.name}</a>
                            </li>
                        );
                    })}
                </ul> : (<div>loading...</div>)}

        </div>
    );
}