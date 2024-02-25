import { useContext, useEffect, useState } from 'react';
import { getUserLocation } from '../helpers';
import { AuthContext } from '../auth/context/AuthContext';

export const useUserLocation = ( saveCoords = false ) => {

    const { setUserCoords } = useContext( AuthContext );
    const [ coords , setCoords] = useState( {} );
    const [ error , setError] = useState( null );


    useEffect(() => {
        getUserLocation(setCoords, setError);
    }, []);

    useEffect(() => {
        if (coords.lat && coords.lang) {
            setError(null);
            // console.log( coords);

            if (saveCoords) {
                setUserCoords(coords);
                console.log('coordenadas guardadas');

            }
        }
    }, [ coords, setUserCoords, saveCoords ]);




    return { 
        coords, 
        error, 
    };

}
