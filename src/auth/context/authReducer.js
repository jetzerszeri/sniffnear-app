import { types } from "../types/types";


export const authReducer = (state = {}, action ) => {

    switch (action.type) {
        case types.login:
            return {
                ...state, //si tenemos otras propiedades en el state, las mantenemos y solo modificamos la que nos interesa.
                isLogged: true,
                user: action.payload,
            };

        case types.logout:
            return {
                ...state,
                user: null,
                isLogged: false,
            };
            
        case types.singup:
            return {
                ...state,
                isLogged: false,
                user: action.payload,
            };
        
        default:
            return state;
    }
}
