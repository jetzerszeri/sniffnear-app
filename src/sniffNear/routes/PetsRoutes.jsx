import { Route, Routes } from 'react-router-dom';
import { PetsAddPage, PetsPage, PetsProfilePage } from '../pages';
import { PrivateRoutes } from '../../router/PrivateRoutes';

export const PetsRoutes = () => {
  return (
    <PrivateRoutes>
        <Routes>
            <Route path="/" element={ <PetsPage /> } />
            <Route path="/add" element={ <PetsAddPage /> } />
            <Route path="/*" element={ <PetsPage /> } />
            <Route path="/:id" element={ <PetsProfilePage /> } />
        </Routes>
    </PrivateRoutes>
  )
}
