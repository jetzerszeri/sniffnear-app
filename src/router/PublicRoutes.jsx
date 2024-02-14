import { useContext } from "react"
import { AuthContext } from "../auth/context/AuthContext"
import { Navigate } from "react-router-dom";

export const PublicRoutes = ( { children } ) => {
  
    const { isLogged } = useContext( AuthContext );
  
    return (isLogged)
    ? <Navigate to='/' />
    : children
}
