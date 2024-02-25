import { useContext, useEffect, useState } from 'react';
import { formatAddress, getUserLocation } from '../helpers';
import { AuthContext } from '../auth/context/AuthContext';

export const useUserLocation = ( saveCoords = false ) => {

    const { setUserCoords, setUserAddress } = useContext( AuthContext );
    const [ coords , setCoords ] = useState( {} );
    const [ error , setError ] = useState( null );
    const [ address, setAddress ] = useState( null );


    useEffect(() => {
        getUserLocation(setCoords, setError);
    }, []);


    useEffect(() => {
        if (coords.lat && coords.lng) {
            formatAddress( coords.lat, coords.lng, setAddress);
            setError(null);
            saveCoords && setUserCoords( coords );
        }
    }, [ coords, setUserCoords, saveCoords ]);


    useEffect(() => {
        address && setUserAddress( address );
    }, [ address, setUserAddress ]);
    


    return { 
        coords, 
        error, 
        address,
    };

}
