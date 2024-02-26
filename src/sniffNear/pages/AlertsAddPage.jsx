import React from 'react';
import { AlertTypeSelector, NavBar } from '../components';
import { Link } from 'react-router-dom';
import { AlertIcon, FoundIcon } from '../../ui';

export const AlertsAddPage = () => {
    return (
        <>
            <NavBar title={ 'Crear alerta' }  />

            <main className='fullHeight alerts'>
                
                <AlertTypeSelector />

            </main>


        </>
    )
}
