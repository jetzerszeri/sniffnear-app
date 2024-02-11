import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { types } from "../types/types";

const initialState = {
    logged: false,
}

export const AuthProvider = ( { children } ) => {

    const [ authState, authDispatch ] = useReducer(authReducer, initialState);

    const login = ( userId = '' ) => {

        const action = {
            type: types.login,
            payload: {
                id: userId,
                name: 'JakeNameTest'
            }
        }

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
