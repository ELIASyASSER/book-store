import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthUser"
import Loading from "../components/loading"

const PrivateRoute = ({children}) => {
  const {currentUser,loading} = useAuth()

if(loading ==true) return<div className="flex h-screen justify-center items-center"><Loading/></div>
  return !currentUser ?<Navigate to={'/login'} />:children
}

export default PrivateRoute