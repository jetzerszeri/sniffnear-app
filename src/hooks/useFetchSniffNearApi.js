import { useState } from 'react';
import { fetchSniffNearApi } from '../helpers';

export const useFetchSniffNearApi =  ( endpint, method, data ) => {

    const [ state, setState ] = useState({
        data: null,
        isLoading: false,
        error: null
    });

    const update = async ( collection, id, data ) => {
        await fetchSniffNearApi(`${collection}/${id}`, 'PUT', data, setState);
    };

    const createUser = async ( data ) => {
        await fetchSniffNearApi('users', 'POST', data, setState);
    }


    return {
        data: state.data,
        isLoading: state.isLoading,
        error: state.error,

        update,
        createUser,
    }


}
