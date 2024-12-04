import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthUser"

const PrivateRoute = ({children}) => {
  const {currentUser,Loading} = useAuth()
  const location = useLocation()
  if(Loading ==null) return<div>Loading ...</div>
  return !currentUser ?<Navigate to={'/login'} state={{from:location}}/>:children
}

export default PrivateRoute