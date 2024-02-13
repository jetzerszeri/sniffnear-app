import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { types } from "../types/types";


const init = () => {
    const user = JSON.parse( localStorage.getItem('user') );

    return {
        isLogged: !!user, //si user es null, logged es false, si user tiene algo, logged es true.
        user
    }
}


export const AuthProvider = ( { children } ) => {

    const [ authState, authDispatch ] = useReducer(authReducer, {}, init);

    const login = ( id, name, email ) => {

        const user = { id, name, email }

        const action = {
            type: types.login,
            payload: user
        }

        localStorage.setItem('user', JSON.stringify(user) ); // Aunque podemos hacer un efecto que esté pendiente del estado del use Reducer.

        authDispatch( action );
    }


    return (
        <AuthContext.Provider value={{
            ...authState,
            login,
        }}>
            { children }
        </AuthContext.Provider>
    );
}
