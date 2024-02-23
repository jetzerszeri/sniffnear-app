import { useEffect, useState } from 'react';
import { NavBar, PetProfile } from '../components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFetchSniffNearApi } from '../../hooks';
import { Loader } from '../../ui';

export const PetsProfilePage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, error, getData } = useFetchSniffNearApi();
    const [ pet, setPet ] = useState({});



    useEffect(() => {
        getData(`pets/${id}`);
    }, [ ])

    useEffect(() => {
        if ( data ) {
            setPet(data.pet);
        } else if ( error ) {
            navigate(-1, { replace: true });
        }
    }, [ data, error ])
    
    


    return (
        <>
        <NavBar title={ pet.name } />

        {
            pet.name && <PetProfile pet={ pet } />
        }

        {
            isLoading && <Loader />
        }
        
        
        </>
    )
}
