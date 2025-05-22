import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getTokenId } from "../firebase/getauth";
import Swal from "sweetalert2";
import Loading from "../components/loading";


const SERVER_URL = import.meta.env.VITE_SERVER_URL 
const CheckSubscription = ({children}) => {
    
    const [allowed,setAllowed] = useState(null)
    const navigate = useNavigate()
    
    
    useEffect(()=>{
        
        const checkAccess = async()=>{

            try {
                const token = await getTokenId()

                if(!token){
                    setTimeout(() => {
                            checkAccess()
                    }, 1000);
                    return;
                }

            const resp = await fetch(`${SERVER_URL}/checkSubscription/dashboard-data`,{
                headers:{
                    Authorization:`Bearer ${token}` 
                }
            })
            const body = await resp.json()
            if(resp.status == 200){
                setAllowed(true);
            }else if (resp.status == 403){
                Swal.fire({
                    position: "center-center",
                    icon: "error",
                    title: "please subscribe first to sell and manage your books",
                    showConfirmButton: false,
                    timer: 5500
                     });

                     navigate("/pricing")

            }else{

                setAllowed(false)
                navigate("/login")
            }
            } catch (error) {
                console.log(error)
                setAllowed(false)
                navigate("/login")
                
            }

            
        }
        checkAccess()


    },[navigate])

    if(allowed== null){
        return <div className="h-screen flex justify-center items-center"><Loading/></div>    
    }
    
    return allowed?children:null;
}

export default CheckSubscription