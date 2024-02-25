import { useCallback, useReducer } from "react";
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

    const login = ( id, name, email, profileImg ) => {

        const user = { id, name, email, profileImg }

        const action = {
            type: types.login,
            payload: user
        }

        localStorage.setItem('user', JSON.stringify(user) ); // Aunque podemos hacer un efecto que esté pendiente del estado del use Reducer.

        authDispatch( action );
    };

    const logout = () => {

        localStorage.removeItem('user');
        const action = { type: types.logout }

        authDispatch( action );

    }

    const singup = ( id, name, email, profileImg  ) => {

        const user = { id, name, email, profileImg }

        const action = {
            type: types.singup,
            payload: user
        }

        // localStorage.setItem('user', JSON.stringify(user) ); // Aunque podemos hacer un efecto que esté pendiente del estado del use Reducer.
        authDispatch( action );
    };

    const editPet = ( pet ) => {
        const action = {
            type: types.editPet,
            payload: pet
        }
        authDispatch( action );
    }


    const setUserCoords = useCallback(( coords ) => {
        const action = {
            type: types.setCoords,
            payload: coords
        }
        authDispatch( action );
    }, []);

    const setUserAddress = useCallback(( address ) => {
        const action = {
            type: types.setAddress,
            payload: address
        }
        authDispatch( action );
    }, []);



    return (
        <AuthContext.Provider value={{
            ...authState,
            login,
            logout,
            singup,
            editPet,
            setUserCoords,
            setUserAddress,
        }}>
            { children }
        </AuthContext.Provider>
    );
}
