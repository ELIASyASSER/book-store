import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthUser"

const PrivateRoute = ({children}) => {
  const {currentUser,loading} = useAuth()
  const location = useLocation()
  if(loading ==true) return<div>Loading ...</div>
  return !currentUser ?<Navigate to={'/login'} state={{from:location}}/>:children
}

export default PrivateRoute