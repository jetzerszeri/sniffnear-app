import { Route, Routes } from 'react-router-dom';
import { PetsAddPage, PetsEditPage, PetsPage, PetsProfilePage } from '../pages';
import { PrivateRoutes } from '../../router/PrivateRoutes';

export const PetsRoutes = () => {
  return (
    <PrivateRoutes>
        <Routes>
            <Route path="/" element={ <PetsPage /> } />
            <Route path="/:id/edit" element={ <PetsEditPage /> } />
            <Route path="/*" element={ <PetsPage /> } />
        </Routes>
    </PrivateRoutes>
  )
}
