import { useEffect, useState } from 'react';
import { getUserLocation } from '../helpers';

export const useUserLocation = () => {

    const [ coords , setCoords] = useState( {} );
    const [ error , setError] = useState( null );

    useEffect(() => {
        getUserLocation(setCoords, setError);
    }, []);

    useEffect(() => {
        if (coords.lat && coords.lang) {
            setError(null);
            console.log('coords', coords);
        }
    }, [coords]);


    return { 
        coords, 
        error, 
    };

}
