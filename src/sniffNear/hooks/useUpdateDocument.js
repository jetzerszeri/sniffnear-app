import { useState } from 'react';
import { updateDocument } from '../helpers';


export const useUpdateDocument = () => {

    const [state, setState] = useState({
        data: null,
        isLoading: false,
        error: null
    })

    const update = async (collection, id, data) => {
        setState({ ...state, isLoading: true });

        const result = await updateDocument(collection, id, data);

        if (result.error) {
            setState({ data: null, isLoading: false, error: result.error });
            return result;
        } else {
            setState({ data: result, isLoading: false, error: null });
            return result;
        }

    };

    return{
        data: state.data,
        isLoading: state.isLoading,
        error: state.error,
        update
    }
}
