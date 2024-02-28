import { AlertLostForm, AlertTypeSelector, NavBar } from '../components';
import queryString from 'query-string';
import { Link, useLocation } from 'react-router-dom';
import { AlertIcon, FoundIcon } from '../../ui';

export const AlertsAddPage = () => {

    const location = useLocation();

    const { type = '' } = queryString.parse( location.search );
    // console.log(type);


    return (
        <>
            <NavBar title={ 'Crear alerta' }  />

            <main className='fullHeight alerts'>
                
                { 
                    type !== 'lost' && type !== 'found' &&
                    <AlertTypeSelector />
                }
                {
                    type === 'lost' 
                    && <AlertLostForm />
                }
                

            </main>


        </>
    )
}
