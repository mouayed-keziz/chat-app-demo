import { db } from '../firebase';
import { setDoc, doc, collection } from 'firebase/firestore';

const addMessage = (message, senderId, receiverId) => {
    const senderIsBigger = senderId.localeCompare(receiverId);
    if (senderIsBigger === -1) {
        const temp = senderId;
        senderId = receiverId;
        receiverId = temp;
    }

    //now we are sure that the sender id is bigger than the receiver id

    const id = senderId + receiverId;
    await setDoc(doc(db, "conversations", id), {
        user1: senderId,
        user2: receiverId,
    });
    console.log("db done");
}



const getMessages = (senderId, receiverId) => {
}