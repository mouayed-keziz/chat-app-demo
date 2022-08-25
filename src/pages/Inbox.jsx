
import { useState, useEffect, useContext } from "react";
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";



const GetAllUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    let users = [];
    querySnapshot.forEach((doc) => {
        users.push(doc.data());
    });
    return users;
}

export default function Inbox() {

    const { currentUser } = useContext(AuthContext);

    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        GetAllUsers().then(res => {
            const contactsWithoutMe = res.filter(contact => contact.uid !== currentUser.uid);
            setContacts(contactsWithoutMe);
        });
    }, [currentUser.uid]);
    return (
        <ul>
            {contacts.map((contact) => (
                <li key={contact.uid}><Link to={"/chat/" + contact.uid}>{contact.displayName}</Link></li>
            ))}

        </ul>
    );
}


