import { useEffect } from "react"
import { Navigate, useNavigate,Outlet } from "react-router-dom"

const DashBoardProtection = ({children}) => {

    const navigate = useNavigate()
    
    useEffect(()=>{
        
        const token = localStorage.getItem("ThE_SeCrEt_ToKeN")
        const expiration = localStorage.getItem("expiredToken")

        if(expiration && token && new Date().getTime() > expiration)
            {
                localStorage.removeItem("ThE_SeCrEt_ToKeN")
                localStorage.removeItem("expiredToken")

                alert("Your Session has been expired please log in as admin again  press ok to redirect you")
                navigate("/admin")
            }

    },[navigate])

    // const token = localStorage.getItem("token")
    const token = localStorage.getItem("ThE_SeCrEt_ToKeN")

    return token?children:<Navigate to={'/admin'}/>

}

export default DashBoardProtection