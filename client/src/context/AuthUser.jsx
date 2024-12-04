import { createContext,useContext,useEffect,useState} from 'react'
import {  createUserWithEmailAndPassword,signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged} from "firebase/auth";
import { auth } from '../firebase/main.config';
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios"
import Loading from '../components/loading';
const SERVER_URL = import.meta.env.VITE_SERVER_URL
const AuthContext = createContext()
const provider = new GoogleAuthProvider();
export const AuthProvider = ({children})=>{
    const [loading,setLoading] = useState(true)
    const [isSubscribe,setIsSubscribe] = useState(true)
    const[currentUser,setCurrentUser] = useState(null)
    const [profileImg,setProfileImg] = useState(null)

    const registerUser = async(email,password)=>{
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = async(email,password)=>{

        return await signInWithEmailAndPassword(auth, email, password)
        
    }
    const signInWithGoogle = async()=>{
        return await signInWithPopup(auth, provider)
    }
    const signOutUser = async ()=>{
        try {
            await signOut(auth);
            alert("You Sign Out Successfully");
        } catch (error) {
            console.log(error);
            alert("failed to sign out the user");
        }
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        });
        return ()=>unsubscribe()
    },[])



    const userDetails = ()=>{

        const user = auth.currentUser;
        if (user !== null) {
            // The user object has basic properties such as display name, email, etc.
            // const displayName = user.displayName;

            const email = user.email;
            const photoURL = user.photoURL;

            // const emailVerified = user.emailVerified;
            // const uid = user.uid;
            // console.log(displayName)

            return {email,photoURL}
        }
    }
    const urlImg = currentUser?.photoURL
    const uploadImg = async () => {
        // Check if the URL is present before uploading

        if (!urlImg) {
            alert("No image URL found.")
            return;
        }

        try {

            const resp = await axios.post("http://localhost:4000/uploadImg", { urlImg }, {

                headers: {
                    "Content-Type": "application/json", // Corrected header content type
                },
                timeout:5000
            });

            setProfileImg(`${SERVER_URL}${resp?.data?.url}`)
        }

        catch (error) {
            console.log(error)
            alert("Something went wrong while uploading the image");
        }

};

    // Trigger the upload only if `urlImg` exists


    useEffect(() => {

        if (currentUser?.photoURL) {
            uploadImg();
        }

    }, [currentUser]);


    const value = {
        currentUser,
        registerUser,
        loginUser,
        signInWithGoogle,
        signOutUser,
        userDetails,
        isSubscribe,
        setIsSubscribe,
        profileImg,
        loading
    }
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}
export const useAuth = ()=>{
    return useContext(AuthContext)
}