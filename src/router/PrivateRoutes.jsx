import { useContext } from "react"
import { AuthContext } from "../auth/context/AuthContext"
import { Navigate } from "react-router-dom";


export const PrivateRoutes = ( { children } ) => {

  const { isLogged } = useContext( AuthContext );

  return ( isLogged )
  ? children
  : <Navigate to='/auth' />
  
}
