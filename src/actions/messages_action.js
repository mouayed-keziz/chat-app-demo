import { db } from '../firebase';
import { setDoc, getDoc, updateDoc, doc, onSnapshot } from 'firebase/firestore';

const addMessage = async (message, senderId, receiverId) => {
    const senderIsBigger = senderId.localeCompare(receiverId);
    if (senderIsBigger === -1) {
        const temp = senderId;
        senderId = receiverId;
        receiverId = temp;
    }


    const id = senderId + receiverId;//now we are sure that the sender id is bigger than the receiver id

    const docRef = doc(db, "conversations", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const messages = docSnap.data().messages;
        messages.push({
            message: message,
            time: new Date().getDay() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes()
        });
        await updateDoc(docRef, {
            messages: messages
        });
    } else {
        console.log("No such document!");
        await setDoc(doc(db, "conversations", id), {
            user1: senderId,
            user2: receiverId,
            messages: [{
                message: message,
                time: new Date().getDay() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes()
            }]
        });
    }
}


const getMessages = async (senderId, receiverId) => {
    const senderIsBigger = senderId.localeCompare(receiverId);
    if (senderIsBigger === -1) {
        const temp = senderId;
        senderId = receiverId;
        receiverId = temp;
    }
    const id = senderId + receiverId;//now we are sure that the sender id is bigger than the receiver id

    onSnapshot(doc(db, "conversations", id), (doc) => {
        return doc.data().messages;
    });
}


export { addMessage, getMessages };