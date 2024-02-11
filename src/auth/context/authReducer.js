import { types } from "../types/types";


export const authReducer = (state = {}, action ) => {

    switch (action.type) {
        case types.login:
            return {
                ...state, //si tenemos otras propiedades en el state, las mantenemos y solo modificamos la que nos interesa.
                logged: true,
                name: action.payload
            };

        case types.logout:
            return {
                ...state,
                logged: false,
            };

        default:
            return state;
    }
}
