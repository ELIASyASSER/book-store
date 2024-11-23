import { useEffect } from "react"
import { Navigate, useNavigate,Outlet } from "react-router-dom"

const DashBoardProtection = ({children}) => {

    const navigate = useNavigate()
    
    useEffect(()=>{
        
        const expiration = localStorage.getItem("expiredToken")
        const token = localStorage.getItem("token")

        if(expiration && token && new Date().getTime() > expiration)
            {
                localStorage.removeItem("token")
                localStorage.removeItem("expiredToken")

                alert("Your Session has been expired please log in as admin again  press ok to redirect you")
                navigate("/admin")
            }

    },[navigate])

    const token = localStorage.getItem("token")

    return token?children:<Navigate to={'/admin'}/>

}

export default DashBoardProtection