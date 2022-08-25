import { auth } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetAllUsers } from "../actions/user_action";

export default function ChatPage() {



    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        GetAllUsers().then(res => {
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
                                <a href={"/chatroom/" + element.name}> {element.name}</a>
                            </li>
                        );
                    })}
                </ul> : (<div>loading...</div>)
            }
        </div >
    );
}


export function ChatRoom(props) {
    const [user] = useAuthState(auth);
    const params = useParams();
    const navigate = useNavigate();
    const roomId = params.id;
    const [person, setPerson] = useState([]);
    const [messages, setMessages] = useState([]);
    setMessages("")
    useEffect(() => {
        GetAllUsers().then(res => {
            const result = res.find(element => element.name === roomId);
            if (result) {
                setPerson(result);
                //setMessages((getMessages(user.uid, result.uid)));
            }
            else {
                navigate("/chat");
            }
        });
    }, [navigate, roomId, user.uid]);

    return (
        <div>
            <h3>ChatRoom</h3>
            <p>{roomId}</p>
            {person ? <div> {person.uid} </div> : null}
            <div style={{ height: "300px", overflow: "scroll" }}>
                {messages.length > 0 ?
                    <ul>
                        {messages.map(element => {
                            return (
                                <li key={element.id}>
                                    <div>{element.message}</div>
                                    <div>{element.timestamp}</div>
                                </li>
                            );
                        })}
                    </ul> : (<div>loading...</div>)
                }

            </div>
            <form>
                <input type="text" />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}