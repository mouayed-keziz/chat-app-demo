import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { db, storage } from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";


export default function UpdateProfile() {

    const { currentUser } = useContext(AuthContext);

    const [displayName, setDisplayName] = useState(currentUser.displayName);
    const [email] = useState(currentUser.email);
    const [uid] = useState(currentUser.uid);

    const [file, setFile] = useState(null);
    const [photoURL, setPhotoURL] = useState(currentUser.photoURL);
    const [progress, setProgress] = useState(-1);
    const [finished, setFinished] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const uploadFile = async () => {
            const storageRef = ref(storage, 'users/' + uid + file.name.split('.').pop());
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progress);
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    setError(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setPhotoURL(downloadURL);
                        setFinished(true);
                    });
                }
            );
        }
        file && uploadFile();
    }, [file]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (finished) {
            const user = {
                displayName,
                photoURL
            }
            await updateDoc(doc(db, "users", uid), user)
        }
    }

    return (
        <div className="login">
            <h3>Update Profile</h3>
            <form onSubmit={submitHandler}>

                <label htmlFor="photoURL">uid</label>
                <input type="text" value={uid} disabled />

                <label htmlFor="displayName">Display Name</label>
                <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />

                <label htmlFor="photoURL">Email</label>
                <input type="text" value={email} disabled />


                <label htmlFor="photoURL">Photo URL</label>
                {photoURL && <img style={{ width: "100px", height: "100px" }} src={photoURL} alt="profile" />}
                <input type="file" onChange={(e) => {
                    setFile(e.target.files[0]);
                    setPhotoURL(URL.createObjectURL(e.target.files[0]));
                }} />
                {/*progress with no digits after comma and*/}
                {progress > 0 && <progress value={progress} max="100" />}
                {error && <span className="error">Something went wrong!</span>}
                {finished && <span className="success">Upload finished!</span>}
                <button type="submit">Update</button>
            </form>
        </div>
    );
}