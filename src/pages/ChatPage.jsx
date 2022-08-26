import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

export default function ChatPage() {

    const { id } = useParams();

    const [user, setUser] = useState(null);
    useEffect(() => {
        const getUser = async () => {
            const querySnapshot = await getDocs(collection(db, "users"), id);
            setUser(querySnapshot.docs[0].data());
        }
        getUser();
    }, [id]);



    return (
        <div>
            {user ? (
                <div className="chatpage">
                    <div className="chatHeader">
                        <img src={user.photoURL} alt={user.displayName} />
                        <h3>{user.displayName}</h3>
                    </div>
                    <div className="messagesSection">
                        <li className="message send">qq</li>
                        <li className="message received">qq</li>
                    </div>
                    <form className="messageInputSection">
                        <input type="text" placeholder="Type a message..." />
                        <button>Send</button>
                    </form>
                </div>
            ) : <p>loading...</p>}
        </div>
    );
}