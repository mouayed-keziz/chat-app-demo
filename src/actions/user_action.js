
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';



const GetAllUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    let users = [];
    querySnapshot.forEach((doc) => {
        users.push(doc.data());
    });
    //console.log(users);
    return users;
}


export { GetAllUsers };