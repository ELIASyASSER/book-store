import { createContext,useContext,useEffect,useState} from 'react'
import {  createUserWithEmailAndPassword,signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged} from "firebase/auth";
import { auth } from '../firebase/main.config';
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios"
import Swal from 'sweetalert2';
import {useLocation, useNavigate} from "react-router-dom"
axios.defaults.withCredentials = true;

const SERVER_URL = import.meta.env.VITE_SERVER_URL
const AuthContext = createContext()
const provider = new GoogleAuthProvider();
export const AuthProvider = ({children})=>{

    const [loading,setLoading] = useState(true)
    const [isSubscribe,setIsSubscribe] = useState(true)
    const[currentUser,setCurrentUser] = useState(null)
    const [profileImg,setProfileImg] = useState(null)
    const [isAdmin,setIsAdmin] = useState(false)
    const navigate = useNavigate()
    const currentPath = useLocation()
   
    
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
            Swal.fire({
                        position: "center-center",
                        icon: "success",
                        title: "Logged Out Successfully ",
                        showConfirmButton: false,
                        timer: 2000
                        });
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

            const resp = await axios.post(`${SERVER_URL}/uploadImg`, { urlImg }, {

                headers: {
                    "Content-Type": "application/json", // Corrected header content type
                },
                
            });
            if(resp.data.success){
                setProfileImg(`${SERVER_URL}/${resp?.data?.url}`)
            }
        }

        catch (error) {
            console.log(error)
            setProfileImg(null)
        }finally{
            setLoading(false)
        }

};


    useEffect(() => {
        if (currentUser) {
            uploadImg();
        }

    }, [currentUser]);



useEffect(()=>{
       
        const adminStatus = async()=>{
               try {
                const response = await fetch(`${SERVER_URL}/admin/is-auth`,{
                    credentials:"include"
                   })
                   const data = await response.json()
                   setIsAdmin(data.success)
                   if(!data.success){
                    Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: data.message || `Please login as admin`,
                        });
                        navigate("/admin")
                   }

               } catch (error) {
                console.log(error)
                   Swal.fire({
                         icon: "error",
                         title: "Oops...",
                         text: error.message || `Something went wrong. Try again.`,
                       }); 
                       navigate("/admin")
                   
               }
             }
                if(currentPath.pathname.includes("admin")){
                    adminStatus();
                }
       
       },[navigate])



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
        loading,
        setLoading,
        isAdmin,
        setIsAdmin,
        axios

    }
    
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}
export const useAuth = ()=>{
    return useContext(AuthContext)
}