import { Route, Routes } from 'react-router-dom';
import { AdoptionEditPage, AdoptionNewPage, AdoptionsDetailPage, AdoptionsPage } from '../pages';
import { PrivateRoutes } from '../../router/PrivateRoutes';

export const AdoptionsRoutes = () => {
    return (
        <>
        <Routes>
            <Route path="/" element={ <AdoptionsPage /> } />
            <Route path="/new" element={ <AdoptionNewPage />} />
            <Route path="/*" element={ <AdoptionsPage /> } />
            <Route path="/:id" element={ <AdoptionsDetailPage /> } />
            <Route path="/:id/edit" element={ 
                <PrivateRoutes>
                    <AdoptionEditPage /> 
                </PrivateRoutes>
            } />
        </Routes>
        </>
    )
}
