import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthUser"

const PrivateRoute = ({children}) => {
  const {currentUser} = useAuth()
  const location = useLocation()
    
    
  return !currentUser?<Navigate to={'/login'} state={{from:location}}/>:children
}

export default PrivateRoute