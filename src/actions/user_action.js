//this module contains all the functions that are used to interact with the firebase database
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../firebase';
import { setDoc, doc, collection, getDocs } from 'firebase/firestore';

const putUserIntoInDb = async (user, username) => {
    await setDoc(doc(db, "users", user.uid), {
        name: username,
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL,
    });
    console.log("db done");
};

const loginWithFirebase = (email, password, setError) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            setError(false);
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            setError(true);
        });
}

const registerWithFirebase = (email, password, username) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            putUserIntoInDb(user, username);
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
        });
}


const RegisterWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)  // signInWithRedirect(provider)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            putUserIntoInDb(user, user.displayName);
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        }
        );
}

const getAllUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    let users = [];
    querySnapshot.forEach((doc) => {
        users.push(doc.data());
    });
    //console.log(users);
    return users;
}


export { loginWithFirebase, registerWithFirebase, RegisterWithGoogle, getAllUsers };