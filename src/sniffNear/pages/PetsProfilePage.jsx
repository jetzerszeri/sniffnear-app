import React, { useEffect, useState } from 'react';
import { NavBar, PetProfile } from '../components';
import { Link, useParams } from 'react-router-dom';
import { useFetchSniffNearApi } from '../../hooks';
import { Loader } from '../../ui';

export const PetsProfilePage = () => {

    const img = '/img/noImgPlaceholder.svg'
    
    // 'https://firebasestorage.googleapis.com/v0/b/sniffnear.appspot.com/o/pets%2Favatars%2Fundefined-NuevaTest1.webp?alt=media&token=95d82fd5-083e-4f7a-96c7-c94d45d97c53'
    const { id } = useParams();
    // console.log(id);

    const { data, isLoading, getData } = useFetchSniffNearApi();
    const [ pet, setPet ] = useState({})

    // const rightIcon = {display: true, icon: "bi-person-fill", link: "/account"};


    useEffect(() => {
        getData(`pets/${id}`);
    }, [ ])

    useEffect(() => {
        if ( data ) {
            console.log(data);
            setPet(data.pet);
        }
    }, [ data ])
    
    


    return (
        <>
        <NavBar title={ pet.name } />

        {
            pet && <PetProfile pet={ pet } />
        }

        {
            isLoading && <Loader />
        }
        
        
        </>
    )
}
