import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { AuthContext } from '../context/AuthContext'
import { addMessage } from "../actions/messages_action";

export default function ChatPage() {
    const bottomOfTheConversation = useRef();

    const { currentUser } = useContext(AuthContext);
    const { id } = useParams();

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const docSnap = await getDoc(doc(db, "users", id));
            if (docSnap.exists()) {
                setUser(docSnap.data());
            } else {
                navigate("/inbox");
            }
        }
        getUser();
    }, [id, navigate]);

    useEffect(() => {
        const getMessages = async () => {
            if (currentUser && user) {
                const senderIsBigger = currentUser.uid.localeCompare(user.uid);
                let convId = "";
                if (senderIsBigger === -1) {
                    convId = currentUser.uid + user.uid;
                }
                else {
                    convId = user.uid + currentUser.uid;
                }
                const unsub = onSnapshot(doc(db, "conversations", convId), (doc) => {
                    console.log("Current data: ", doc.data());
                    setMessages(doc.data().messages);
                    bottomOfTheConversation.current.scrollIntoView({ behavior: "smooth" });
                });
            }
        }
        getMessages();
    }, [currentUser, user]);

    const submitHandeler = (e) => {
        e.preventDefault();
        if (message !== "") {
            addMessage(message, currentUser.uid, user.uid);
            setMessage("");
            bottomOfTheConversation.current.scrollIntoView({ behavior: "smooth" });
        }
    }


    return (
        <div>
            {user ? (
                <div className="chatpage">
                    <div className="chatHeader">
                        <img src={user.photoURL} alt={user.displayName} />
                        <h3>{user.displayName}</h3>{user.uid}
                    </div>
                    <div className="messagesSection">
                        {messages ? (
                            messages.map((message, index) => {
                                if (message.senderId === currentUser.uid) {
                                    return (
                                        <li className="message send" key={index}>{message.message}</li>
                                    )
                                } else {
                                    return (
                                        <li className="message received" key={index}>{message.message}</li>
                                    )
                                }
                            })) : (<li className="message send">No messages</li>)}
                        <span ref={bottomOfTheConversation}></span>
                        <br /><br />
                    </div>
                    <form onSubmit={submitHandeler} className="messageInputSection">
                        <input value={message} type="text" placeholder="Type a message..." onChange={(e) => setMessage(e.target.value)} />
                        <button type="submit">Send</button>
                    </form>
                </div>
            ) : <p>loading...</p>}
        </div>
    );
}