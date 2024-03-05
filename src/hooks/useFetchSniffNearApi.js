import { useCallback, useState } from 'react';
import { fetchSniffNearApi } from '../helpers';

export const useFetchSniffNearApi =  ( endpint, method, data ) => {

    const [ state, setState ] = useState({
        data: null,
        isLoading: false,
        error: null
    });

    const [ state2, setState2 ] = useState({
        data: null,
        isLoading: false,
        error: null
    });

    const update = useCallback(async ( collection, id, data ) => {
        await fetchSniffNearApi(`${collection}/${id}`, 'PUT', data, setState);
    }, []);

    const createUser = useCallback(async ( data ) => {
        await fetchSniffNearApi('users', 'POST', data, setState);
    }, []);

    const create = useCallback(async ( collection, data ) => {
        await fetchSniffNearApi(collection, 'POST', data, setState);
    }, []);

    const loginUser = useCallback( async ( data ) => {
        await fetchSniffNearApi('users/auth', 'POST', data, setState);
    }, []);

    const getData = useCallback( async (endpint, data = {}) => {
        await fetchSniffNearApi(endpint, 'GET', data, setState);
    }, []);

    const get2Datas = useCallback( async (endpint1, endpint2, data = {}) => {
        await fetchSniffNearApi(endpint1, 'GET', data, setState);
        await fetchSniffNearApi(endpint2, 'GET', data, setState2);
    }, []);

    const deleteDocument = useCallback(async ( collection, id, data ) => {
        await fetchSniffNearApi(`${collection}/${id}`, 'DELETE', data, setState);
    }, []);

    const connectServer = useCallback(async () => {
        await fetchSniffNearApi('connect', 'GET', {}, setState);
        return true;
    }, []);

    const onResetFetchState = useCallback(() => {
        setState({
            data: null,
            isLoading: false,
            error: null
        });
    }, []);

    return {
        data: state.data,
        isLoading: state.isLoading,
        error: state.error,
        state,
        state2,

        update,
        createUser,
        loginUser,
        getData,
        create,
        deleteDocument,
        onResetFetchState,
        connectServer,
        get2Datas,
    }


}
